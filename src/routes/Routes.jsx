import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import AddIssues from '../pages/AddIssues';
import AllIssues from '../pages/AllIssues';
import MyIssues from '../pages/MyIssues';
import MyContribution from '../pages/MyContribution';
import Home from '../pages/Home';
import IssueDetails from '../pages/IssueDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import AdminHub from '../pages/AdminHub';
import AdminRoute from '../components/AdminRoute';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import HelpFAQ from '../pages/HelpFAQ';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Services from '../pages/Services';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import BlogCategory from '../pages/BlogCategory';
import ServicesReporting from '../pages/ServicesReporting';
import ServicesAnalytics from '../pages/ServicesAnalytics';
import ServicesPartnerships from '../pages/ServicesPartnerships';
import Profile from '../pages/Profile';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
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
                path: '/all-issues',
                element: <AllIssues />
            },
            {
                path: '/about',
                element: <About />
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
                path: '/my-issues',
                element: (
                    <ProtectedRoute>
                        <MyIssues />
                    </ProtectedRoute>
                )
            },
            {
                path: '/my-contribution',
                element: (
                    <ProtectedRoute>
                        <MyContribution />
                    </ProtectedRoute>
                )
            },
            {
                path: '/issue-details/:id',
                element: <IssueDetails />
            },
            {
                path: '/admin-hub',
                element: (
                    <AdminRoute>
                        <AdminHub />
                    </AdminRoute>
                )
            },
            {
                path: '/contact',
                element: <ContactUs />
            },
            {
                path: '/faq',
                element: <HelpFAQ />
            },
            {
                path: '/privacy',
                element: <PrivacyPolicy />
            },
            {
                path: '/services',
                element: <Services />
            },
            {
                path: '/services/reporting',
                element: <ServicesReporting />
            },
            {
                path: '/services/analytics',
                element: <ServicesAnalytics />
            },
            {
                path: '/services/partnerships',
                element: <ServicesPartnerships />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/blog/category/:slug',
                element: <BlogCategory />
            },
            {
                path: '/blog/:id',
                element: <BlogPost />
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);

export default Routes;
