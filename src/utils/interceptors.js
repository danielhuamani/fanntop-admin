import Vue from 'vue'
import { getToken, setTokenData } from './auth'

Vue.axios.interceptors.push((request, next) => {
    /**
     * Here we will fecth the token from local storage and
     * attach it (if exists) to the Authorization header on EVERY request.
     */
    let token = getToken()

    if (token) {
        request.headers = request.headers || {}
        request.headers.Authorization = `Bearer ${token}`
    }

    /**
     * Here is where we can refresh the token.
     */
    next((response) => {
        /**
         * If we get a 401 response from the API means that we are Unauthorized to
         * access the requested end point.
         * This means that probably our token has expired and we need to get a new one.
         */
        if (response.status === 401) {
            return Vue.axios.post('/security/token-refresh/', {'token': token}).then((result) => {
                // Save the new token on local storage
                setTokenData(result.data.token)

                // Resend the failed request whatever it was (GET, POST, PATCH) and return its resposne
                return Vue.axios(request).then((response) => {
                    return response
                })
            })
            .catch(() => {
                /**
                 * We weren't able to refresh the token so the best thing to do is
                 * logout the user (removing any user information from storage)
                 * and redirecting to login page
                 */
                return router.go({name: 'login'})
            })
        }
    })
})