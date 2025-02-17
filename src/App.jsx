import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskLayout from './TaskLayout'
import Error from './error/Error'
import Dashboard from './components/Dashboard'
import './scss/navigation.scss'
import LoginAdmin from './components/LoginAdmin'
import RegisterAdmin from './components/RegisterAdmin'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

const router = createBrowserRouter([
  {
    path:'/',
    element:(
      <TaskLayout/>
    ),
    errorElement: <Error/>,
    children:[{
      path:'/dashboard',
      element: (
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      ),
      errorElement:<Error/>  
    },{
      path:'/loginadmin',
      element:(
          <PublicRoute>
            <LoginAdmin/>
          </PublicRoute>
      ),
      errorElement: <Error/>
    },{
      path:'/registeradmin',
      element:(
        <PublicRoute>
          <RegisterAdmin/>
        </PublicRoute>
      ),
      errorElement: <Error/>
    }]
  }
])

function App() {

  return ( <RouterProvider router={router}/> )
}

export default App
