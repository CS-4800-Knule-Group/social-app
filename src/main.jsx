import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Data from './Pages/Data.jsx'
import Profile from './Pages/profile.jsx'
import Header from './Components/Header.jsx'
import Register from './Pages/Register.jsx'
import Feed from './Pages/feed.jsx'
import Private from './Pages/Private.jsx'
import MsgTemp from './Pages/MsgTemp.jsx'
import ProfileOther from './Pages/ProfileOther.jsx'
import Explore from './Pages/Explore.jsx'
import { Amplify } from 'aws-amplify';

const awsmobile = {
  "aws_project_region": "us-west-2",
  "aws_appsync_graphqlEndpoint": process.env.appsync_graphqlEndpoint,
  "aws_appsync_region": "us-west-2",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": process.env.appsync_apikey
};

Amplify.configure(awsConfig);



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
      path:'/profile/:id',
      element: <ProfileOther/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/Explore',
      element:<Explore/>
    },
    {
      path:'/private',
      element:<Private/>
    },
	  {
		path:'/feed',
		element:<Feed/>
	  },
    {
      path:'/tempmsg/:id',
      element: <MsgTemp/>
    }
    
    
  ]
}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router}/>
)
