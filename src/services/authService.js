import { apiService } from "./apiService";

export async function register(registerData) {
    let response
    try {
        response = await apiService("POST", "register", false, registerData)
    } catch (err) {
        //error handling
        return false
    }
    localStorage.setItem('token', response.accesToken)
    localStorage.setItem('userId', response.user.id)
    return true
}

export async function login(loginData) {
    let response
    try {
        response = await apiService("POST", "login", false, loginData)
    } catch (err) {
        //error handling
        return false
    }
    localStorage.setItem('token', response.accessToken)
    localStorage.setItem('userId', response.user.id)
    return true
}

export async function requestPublisher() {
    const user = await getUser()
    console.log(user)
    const modifiedUser = {
        email: user.email,
        password:  user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        isPublisher: true,
        id: user.id
    }
    try {
        await apiService("PUT", "users/"+user.id, true, modifiedUser)
    } catch {
        //error handling
        return false
    }
    return true
}

export async function getUser() {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        throw 'No userId found!'
    }
    let response
    try {
        response = await apiService("GET", "users/"+userId, true)
    } catch (err) {
        return 
    }
    return response
}