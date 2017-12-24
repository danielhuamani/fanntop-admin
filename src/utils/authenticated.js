export default function authenticated (router) {
  router.beforeEach(({to, next, abort, redirect}) => {
    let token = localStorage.getItem('token')
    let user = JSON.parse(window.localStorage.getItem('auth-user'))

    /**
     * Checks if there's a token and the next page name is none of the following
     */
    if ((token) && (to.name === 'login' || to.name === 'register')) {
        // redirects according user role
      router.go({ /*...*/})
    }

    if (!token) {
        // Logout
    }

    next()
  })
}