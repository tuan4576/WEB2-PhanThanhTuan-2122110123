import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router";
// import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx';
import UserManagement from './pages/UserManagement.tsx';
import ProductManagement from './pages/ProductManagement.tsx';
import CategoryList from './pages/CategoryManagement.tsx';
import Login from './pages/Login.tsx';
import { Navigate } from "react-router-dom";
import OrderManagement from './pages/OrderManagement.tsx';
import PostManagement from './pages/PostManagement.tsx';
import ContactManagement from './pages/ContactManagement.tsx';
import ReviewManagement from './pages/ReviewManagement.tsx';
import AddUser from './Add/AddUser.tsx';
import AddProduct from './Add/AddProduct.tsx';
import AddCategory from './Add/AddCategory.tsx';
import EditCategory from './Edit/EditCategory.tsx';
import EditProduct from './Edit/EditProduct.tsx';
import DetailOrder from './Detail/DetailOrder.tsx';
import BrandManagement from './pages/BrandManagement.tsx';
import AddBrand from './Add/AddBrand.tsx';
import EditBrand from './Edit/EditBrand.tsx';
import EditUser from './Edit/EditUser.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path:"/auth/login",
    element:<Login/>
  },
  {
    // path: "/",
    element:<App/>,
    children:[
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {

        path:"/usermanagement",
        element:<UserManagement/>
      },
      {
        path:"/productmanagement",
        element:<ProductManagement/>
      },
      {
        path:"/categorymanagement",
        element:<CategoryList/>
      },
      {
        path:"/ordermanagement",
        element:<OrderManagement/>
      },
      {
        path:"/postmanagement",
        element:<PostManagement/>
      },
      {
        path:"/contactmanagement",
        element:<ContactManagement/>
      },
      {
        path:"/reviewmanagement",
        element:<ReviewManagement/>
      },
      {
        path:"/adduser",
        element:<AddUser/>
      },
      {
        path:"/addproduct",
        element:<AddProduct/>
      },
      {
        path:"/addcategory",
        element:<AddCategory/>
      },
      {
        path:"/editcategory/:id",
        element:<EditCategory/>
      },
      {
        path:"/editproduct/:id",
        element:<EditProduct/>
      },
      {
        path:"/orders/:id",
        element:<DetailOrder/>
      },
      {
        path:"/brandmanagement",
        element:<BrandManagement/>
      },
      {
        path:"/addbrand",
        element:<AddBrand/>
      },
      {
        path:"/editbrand/:id",
        element:<EditBrand/>
      },
      {
        path:"/edituser/:id",
        element:<EditUser/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
