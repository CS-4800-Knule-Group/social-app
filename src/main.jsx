import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Data from './Pages/Data.jsx'
import Profile from './Pages/profile.jsx'
import Header from './Components/Header.jsx'
import HeaderLogo from './Components/HeaderLogo.jsx'
import HeaderProfile from './Components/HeaderProfile.jsx'
import HeaderProfileDropdown from './Components/HeaderProfileDropdown.jsx'
import Register from './Pages/Register.jsx'
import Feed from './Pages/feed.jsx'
import Private from './Pages/Private.jsx'
import MsgTemp from './Pages/MsgTemp.jsx'
import ProfileOther from './Pages/ProfileOther.jsx'
import Explore from './Pages/Explore.jsx'
import Login from './Pages/Login.jsx'
import { Amplify } from 'aws-amplify';
import { AuthProvider } from './authContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import './main.css';

const awsConfig = {
  "aws_project_region": "us-west-2",
  "aws_appsync_graphqlEndpoint": import.meta.env.VITE_APPSYNC_GRAPHQLENDPOINT,
  "aws_appsync_region": "us-west-2",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": import.meta.env.VITE_APPSYNC_APIKEY
};

Amplify.configure(awsConfig);



const Layout = () => {
  return (
    <div className='layout-container'>
      <div className='leftSide'>
        <div class="splitTLeft">
          <HeaderLogo/>
        </div>

        <div class="splitCLeft">
          <Header/>
        </div>

        <div className='profileDropdown'>
          
          <HeaderProfileDropdown/>

          <div class="splitBLeft">
            <HeaderProfile/>
          </div>
        </div>
      </div>

      <div class="splitRight">
        <Outlet/>
      </div>
      
    </div>
  )
}

const router = createBrowserRouter([{
  path:'/',
  element:<Layout/>,
  children:[
    { path: '/', element: <App/> },
    { path: '/login', element: <Login />},
    { path:'/data', element: <Data/> },
    { element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/Explore',
          element: <Explore />
        },
        {
          path: '/feed',
          element: <Feed />
        },
      ]
     },
    { path:'/profile/:id', element: <ProfileOther/> },
    { path:'/register', element:<Register/> },
    // { path:'/Explore', element:<Explore/> },
    { path:'/private', element:<Private/> },
	  // { path:'/feed', element:<Feed/> },
    { path:'/tempmsg/:id', element: <MsgTemp/> }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router = {router}/>
    </AuthProvider>
  </StrictMode>
)