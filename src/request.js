const getHttpBaseUrl = () => {
    if (import.meta.env.VITE_HTTP_BASE_URL) {
        return import.meta.env.VITE_HTTP_BASE_URL
    }
    return window.location.origin
}

const sendRequest = async (url, options) => {
    // insert auth token
    if (!options) {
        options = {}
    }
    if (!options.headers) {
        options.headers = {}
    }
    if (localStorage.getItem('token')) {
        options.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    }
    const response = await fetch(getHttpBaseUrl() + url, options)
    if (!response.ok) {
        try {
            const error = await response.json()
            throw new Error(error.error)
        } catch (e) {
            throw new Error(e || response.statusText)
        }
    }
    return response.json()
}

const get = async (route, queryParams) => {
    let url = route
    if (queryParams) {
        url += '?' + new URLSearchParams(queryParams).toString()
    }
    return sendRequest(url)
}

const post = async (route, queryParams, body) => {
    let url = route
    if (queryParams) {
        url += '?' + new URLSearchParams(queryParams).toString()
    }
    return sendRequest(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

const put = async (route, queryParams, body) => {
    let url = route
    if (queryParams) {
        url += '?' + new URLSearchParams(queryParams).toString()
    }
    return sendRequest(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export {get, post, put}