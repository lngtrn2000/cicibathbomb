import ContactPage from '../pages/ContactPage/Contact'
import HomePage from '../pages/HomePage/Home'
import NewsPage from '../pages/NewsPage/News'
import ProductPage from '../pages/ProductPage/Product'
import NewsDetailPage from '../pages/NewsDetailPage/NewsDetail'
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetail'
import SignInPage from '../pages/SignInPage/SignInPage'
import CartPage from '../pages/CartPage/CartPage'
import SearchPage from '../pages/SearchPage/SearchPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import UpdateNewsPage from '../pages/UpdateNewsPage/UpdateNewsPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import AddressPage from '../pages/AddressPage/AddressPage'
import OrderedPage from '../pages/OrderedPage/OrderedPage'
import AdminOrderedPage from '../pages/OrderedPage/AdminOrderedPage'

export const routes = [
    {
        path : '/',
        page : HomePage
    },
    {
        path : '/product',
        page : ProductPage
    },
    {
        path : '/news',
        page : NewsPage
    },
    {
        path : '/contact',
        page : ContactPage
    },
    {
        path : 'product/:productId',
        page : ProductDetailPage
    },
    {
        path : 'news/:newsId',
        page : NewsDetailPage
    },
    {
        path : '/sign-in',
        page : SignInPage
    },
    {
        path : '/cart',
        page : CartPage
    },
    {
        path : '/search/:productName',
        page : SearchPage
    },
    {
        path : '/search',
        page : SearchPage
    },
    {
        path : '/admin',
        page : AdminPage
    },
    {
        path : '/update-news/:id',
        page : UpdateNewsPage
    },
    {
        path : 'sign-up',
        page : SignUpPage
    },
    {
        path : 'cart/address',
        page : AddressPage
    },
    {
        path : 'ordered',
        page : OrderedPage
    },
    {
        path : 'admin-ordered',
        page : AdminOrderedPage
    }
]