import React from 'react'
import { Navigate, Outlet, useLocation, useNavigation } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import LoginAdmin from './components/LoginAdmin'
import { useAuth } from './context/useAuth'

const TaskLayout = () => {

    const { currentUser } = useAuth();
    
    const navigation = useNavigation()
    const location = useLocation()

    const isLoading = navigation.state === "loading";

    const isNavPath = location.pathname === '/'

    if (currentUser && isNavPath) {
        return <Navigate to="/dashboard" replace />;
    }


    return (
        <div>
            {isLoading ?
                <NavigationLoading/>    
            :
                <Navigation/>
            }

            <main>
                <Outlet></Outlet>
                
                {isNavPath && !currentUser && <LoginAdmin/>}
            </main>
        </div>
    )
}

export default TaskLayout

