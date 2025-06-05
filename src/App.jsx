import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/home'
import Users from './pages/Users'

import UserDetail from './pages/UserDetail'
import Loading from './components/Loading'
import  Login  from './pages/login'
import ReqAuth from './components/Req'
import Signup from './pages/signup'
import Statements from './pages/Statements'
//import './App.css'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "users",
      element:(<ReqAuth> <Users/></ReqAuth>)
    },
    {
      path: "users/:id",
      element: <UserDetail/>
    },
    {
      path: "login",
      element: <Login/>
    },
    {
      path: "signup",
      element: <Signup/>
    },
    {
      path: "statements",
      element: <ReqAuth> <Statements/></ReqAuth>
    },
    {
      path: "/",
      element: <Home />,
      
    },
  ])

  return (
    
      <RouterProvider router={router} />
   
  )
}

export default App
