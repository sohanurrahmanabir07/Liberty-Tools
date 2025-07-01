import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './Root/Root.jsx'
import { Home } from './Home/Home.jsx'
import { About } from './About/About.jsx'
import { Services } from './Services/Services.jsx'
import { Projects } from './Projects/Projects.jsx'
import { Blog } from './Blog/Blog.jsx'
import ContactSection from './Contact Section/ContactSection.jsx'
import { Category } from './Category/Category.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Product } from './Product/Product.jsx'
import { Dashboard } from "./Dashboard/Dashboard.jsx"
import { Queries } from './Dashboard/Queries/Queries.jsx'
import { DashboardBanner } from './Dashboard/Dashboar Banner/DashboardBanner.jsx'
import AdminDashboard from './Dashboard/Home/AdminDashboard.jsx'
import { DashboardCategories } from './Dashboard/Dashboard Categories/DashboardCategories.jsx'
import { AllProducts } from "./Product/AllProducts.jsx"
import { DashboardServices } from './Dashboard/Dashboard Services/DashboardServices.jsx'
import { Login } from "../src/Login-Register/Login.jsx"
import { DashboardBlog } from './Dashboard/Dashboard Blog/DashboardBlog.jsx'
import { ProtectedRoute } from './Protected Route/ProtectedRoute.jsx'
import { ScrollTop } from './Custom Hooks/ScrollTop.jsx'
import { DashboardCertificate } from './Dashboard/Dashboard Certificate/DashboardCertificate.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/services",
        element: <Services></Services>
      },
      {
        path: "/projects",
        element: <Projects></Projects>
      },
      {
        path: "/blog/:blogId",
        element: <Blog></Blog>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/contact",
        element: <ContactSection></ContactSection>
      },
      {
        path: "/category/:categoryName",
        element: <Category></Category>
      },
      {
        path: "/products/:model",
        element: <Product></Product>
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>,
        children: [
          {
            path: "/dashboard",
            element: <AdminDashboard></AdminDashboard>
          },
          {
            path: "/dashboard/products",
            element: <AllProducts></AllProducts>
          },


          {
            path: '/dashboard/categories',
            element: <DashboardCategories></DashboardCategories>
          },
          {
            path: '/dashboard/queries',
            element: <Queries></Queries>
          },
          {
            path: '/dashboard/banners',
            element: <DashboardBanner></DashboardBanner>
          },
          {
            path: '/dashboard/services',
            element: <DashboardServices></DashboardServices>
          },
          {
            path: '/dashboard/blog',
            element: <DashboardBlog></DashboardBlog>
          },
          {
            path: '/dashboard/certificate',
            element: <DashboardCertificate></DashboardCertificate>
          },

        ]
      }

    ],

  },
  {
    path: "/admin-login",
    element: <Login></Login>
  }
])

createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <PersistGate loading={<p>Loading From Redux.....</p>} persistor={persistor} >

      
      <RouterProvider router={router} />
      
    </PersistGate>
  </Provider>

)
