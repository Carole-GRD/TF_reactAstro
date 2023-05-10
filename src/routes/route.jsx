import App from "../App";
import HomePage from "../pages/home/home.page";
import ArticlesPage from "../pages/articles/articles.page";
import NotFoundPage from "../pages/not-found/not-found.page";


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
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]