import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />
    },
    {
        path: 'cadastrar',
        element: <SignUp />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)