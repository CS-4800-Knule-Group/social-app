import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Profile from './Pages/profile.jsx'



const Layout = () => {
  return (
    <div>
      {//This is where you will add layout features to the whole app. This can include a header or footer, maybe more. }
      //These features will need to be made in the components folder and imported here.
      }
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
      path:'/profile',
      element: <Profile/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router}/>
)
