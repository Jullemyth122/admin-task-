import React from 'react'
import '../scss/accountboard.scss'
import '../scss/sidebar.scss'
import Sidebar from './Sidebar'
import UsersLists from './accountlists/UsersLists'
import ManagersLists from './accountlists/ManagersLists'
import AdminsLists from './accountlists/AdminsLists'
const Accounts = () => {
    return (
        <div className='accounts-comp'>
            <Sidebar/>
            <div className="mainboard">
                <UsersLists/>
                <ManagersLists/>
                <AdminsLists/>
            </div>
        </div>  
    )
}

export default Accounts