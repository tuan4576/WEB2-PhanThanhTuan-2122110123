import './index.css'
import App from './App.tsx'
import {createBrowserRouter,RouterProvider} from "react-router";
import ReactDOM from "react-dom/client";
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Wishlist from './pages/Wishlist.tsx';
import ShoppingCart from './pages/ShoppingCart.tsx';
import Search from './pages/Search.tsx';
import Post from './pages/Post.tsx';
import Contact from './pages/Contact.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Checkout from './pages/Checkout.tsx';
import OrderSuccess from './pages/OrderSuccess.tsx';
import OrderDetail from './pages/OrderDetail.tsx';
import OrderUser from './pages/OrderUser.tsx';
import 'nouislider/dist/nouislider.css';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        index:true,
        path:"/",
        element:<Home/>
      },
      {
        path:"/auth/login",
        element:<Login/>
      },
      {
        path:"/auth/register",
        element:<Register/>
      },
      {
        path:"/wishlish",
        element:<Wishlist/>
      },
      {
        path:"/shoppingcart",
        element:<ShoppingCart/>
      },
      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/news",
        element:<Post/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/product/:id",
        element:<ProductDetail/>
      },
      {
        path:"/checkout",
        element:<Checkout/>
      },
      {
        path:"/order-success",
        element:<OrderSuccess/>
      },
      {
        path:"orderdetail",
        element:<OrderDetail/>
      }
      ,
      {
        path:"/order/:orderId",
        element:<OrderUser/>
      }
    ]
  },
]);

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
