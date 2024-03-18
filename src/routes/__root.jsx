import {createRootRoute, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import Navbar from "../components/navbar";
import useIsLoggedIn from "../hooks/useIsLoggedIn.jsx";
import LoginPage from "../pages/login.jsx";

export const Route = createRootRoute({
    component: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const loggedIn = useIsLoggedIn();
        return (
            loggedIn ? (<>
                <Navbar/>
                <Outlet/>
                <TanStackRouterDevtools/>
            </>) : (<>
                <LoginPage/>
            </>)

        )
    },
});
