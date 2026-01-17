import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Loader from '../components/ui/Loader';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const AddIssues = lazy(() => import('../pages/AddIssues'));
const AllIssues = lazy(() => import('../pages/AllIssues'));
const MyIssues = lazy(() => import('../pages/MyIssues'));
const MyContribution = lazy(() => import('../pages/MyContribution'));
const IssueDetails = lazy(() => import('../pages/IssueDetails'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const AdminHub = lazy(() => import('../pages/AdminHub'));
const NotFound = lazy(() => import('../pages/NotFound'));
const About = lazy(() => import('../pages/About'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const HelpFAQ = lazy(() => import('../pages/HelpFAQ'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Services = lazy(() => import('../pages/Services'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const BlogCategory = lazy(() => import('../pages/BlogCategory'));
const ServicesReporting = lazy(() => import('../pages/ServicesReporting'));
const ServicesAnalytics = lazy(() => import('../pages/ServicesAnalytics'));
const ServicesPartnerships = lazy(() => import('../pages/ServicesPartnerships'));
const Profile = lazy(() => import('../pages/Profile'));

import AdminRoute from '../components/AdminRoute';
import ProtectedRoute from '../components/ProtectedRoute';

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
