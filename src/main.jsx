import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Data from './Pages/Data.jsx'
import Profile from './Pages/profile.jsx'
import Header from './Components/Header.jsx'
import Register from './Pages/Register.jsx'



const Layout = () => {
  return (
    <div>
      {//This is where you will add layout features to the whole app. This can include a header or footer, maybe more. }
      //These features will need to be made in the components folder and imported here.
      }
      <Header/>
      <Outlet/>
    </div>
  )
}

const router = createBrowserRouter([{
  path:'/',
  element:<Layout/>,
  children:[
    {
      path: '/',
      element: <App/>
    },
    {
      path:'/data',
      element: <Data/>
    },
    {
      path:'/profile',
      element: <Profile/>
    },
    {
      path:'/register',
      element:<Register/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router}/>
)
