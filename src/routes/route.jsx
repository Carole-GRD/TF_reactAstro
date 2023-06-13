import App from "../App";
import HomePage from "../pages/home/home.page";
import ArticlesPage from "../pages/articles/articles.page";
import NotFoundPage from "../pages/not-found/not-found.page";
import LoginPage from '../auth/pages/login/login.page';
import RegisterPage from '../auth/pages/register/register.page';
import AccountPage from "../pages/account/account.page";
import ArticleDetail from "../containers/article/article-detail/article-detail";
import ArticleForm from "../containers/article/article-form/article-form";


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
                path: 'articles',
                element: <ArticlesPage />,
            },
            {
                path: 'articleDetail/:articleId/store/:storeId',
                element: <ArticleDetail />
            },
            {
                path: 'articleForm/:articleId/store/:storeId',
                element: <ArticleForm />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'account',
                element: <AccountPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]