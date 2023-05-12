import App from "../App";
import HomePage from "../pages/home/home.page";
import ArticlesPage from "../pages/articles/articles.page";
import NotFoundPage from "../pages/not-found/not-found.page";
import LoginPage from '../auth/pages/login/login.page';
import RegisterPage from '../auth/pages/register/register.page';
import AccountPage from "../pages/account/account.page";

export const route = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/articles',
                element: <ArticlesPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/account',
                element: <AccountPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]