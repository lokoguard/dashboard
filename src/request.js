const getHttpBaseUrl = () => {
    if (import.meta.env.VITE_HTTP_BASE_URL) {
        return import.meta.env.VITE_HTTP_BASE_URL
    }
    return window.location.origin
}

const sendRequest = async (url, options) => {
    const response = await fetch(getHttpBaseUrl() + url, options)
    if (!response.ok) {
        // try to fetch response.body.json() to get the error message
        // if it fails, throw a generic error message
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

const post = async (route, body) => {
    return sendRequest(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

const put = async (route, body) => {
    return sendRequest(route, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export {get, post, put}