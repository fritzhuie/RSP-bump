import { jwtDecode } from 'jwt-decode'

function getUserFromToken() {
    const token = getToken()
    console.log("TOKEN: ", token)
    // return token ? jwtDecode(token).user : null
    return token
}

function setToken(token) {
    localStorage.setItem('token', token)
}

function getToken() {
    let token = localStorage.getItem('token')
    if (token) {
        const payload = jwtDecode(token)
        if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        token = null
        }
    }
    return token
}

function removeToken() {
    localStorage.removeItem('token')
}

export { setToken, getUserFromToken, getToken, removeToken }