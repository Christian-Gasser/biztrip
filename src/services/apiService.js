const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function apiService(method, url, auth, data) {
    if (method !== 'POST' && method !== 'PUT' && method !== 'GET' && method !== 'DELETE') {
        throw 'method not valid'
    }
    let requestOptions
    let header
    let token
    if (auth) {
        token = localStorage.getItem('token')
        header = {
            'Authorization': `Bearer ${token}` 
        }
    } else {
        header = {}
    }

    if (!!data) {
        header = {
            ...header,
            'Content-Type': 'application/json'
        }
        requestOptions = {
            method: method,
            headers: header,
            body: JSON.stringify(data)
        }
    } else {
        requestOptions = {
            method: method,
            headers: header
        }
    }
    const response = await fetch(baseUrl + url, requestOptions);
    if (response.ok === true) {
        const body = response.json()
        return body;
    };
    //error handling
    throw response
}