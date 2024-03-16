import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import "./css/index.css"

// Import the generated route tree
import {routeTree} from './routeTree.gen'
import {ChakraProvider} from '@chakra-ui/react'
import {Toaster} from "react-hot-toast";

// Create a new router instance
const router = createRouter({routeTree})


// Render the app
const rootElement = document.getElementById('app')
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<StrictMode>
        <ChakraProvider>
            <RouterProvider router={router}/>
        </ChakraProvider>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </StrictMode>,)
}