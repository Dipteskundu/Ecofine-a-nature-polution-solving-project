import { createBrowserRouter } from 'react-router';
import MainLayout from '../MainLayout/MainLayout';
import AddIssues from '../pages/AddIssues';
import Home from '../pages/Home';
import IssueDetails from '../pages/IssueDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ProtectedRoute from '../components/ProtectedRoute';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children:[
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/addIssues',
                element: (
                    <ProtectedRoute>
                        <AddIssues />
                    </ProtectedRoute>
                )
            },
            {
                path: '/issue-details',
                element: <IssueDetails />
            }
        ]
    }
])

export default Routes;