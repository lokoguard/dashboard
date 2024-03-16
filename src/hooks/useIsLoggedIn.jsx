import {useEffect, useState} from "react";

function useIsLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // check for changes in local storage
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
        addEventListener('login_state', () => {
            const newValue = localStorage.getItem('token');
            if (newValue) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, [])

    return loggedIn;
}

export default useIsLoggedIn;