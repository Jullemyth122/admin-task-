import React from 'react'
import '../scss/dashboard.scss'
import '../scss/sidebar.scss'
import '../scss/mainboard.scss'
import { Link } from 'react-router-dom'
import DashboardChart from './chart/DashboardChart'
import EngagementChart from './chart/EngagementChart'
import ModernPieChart from './chart/ModernPieChart'
import AccountActivity from './dashboardactivity/AccountActivity'
import TeamManager from './dashboardactivity/TeamManager'
import TeamAdmin from './dashboardactivity/TeamAdmin'
import Sidebar from './Sidebar'

const MainDash = () => {

    return (<>
        <div className="mainboard">
            <div className="sdash-1">
                <h1 className='text-2xl'> Dashboard </h1>
                <div className="data-1 flex items-center justify-start gap-3 flex-wrap">
                    <div className="overview-content">
                        <h1> Overview </h1>

                        <div className="act-data-1">
                            <ModernPieChart/>
                        </div>

                    </div>
                    <div className="dataglobal-content">
                        <h1>
                            Data Activity
                        </h1>
                        <div className="act-data-1">
                            <DashboardChart/>
                        </div>
                        <div className="act-data-1">
                            <EngagementChart/>
                        </div>
                    </div>

                    <div className="employee-content bg-amber-200">
                        <h1> Team Manager </h1>
                            
                        <div className="list-team">
                            <TeamManager/>
                        </div>
                        
                    </div>

                    <div className="employee-content bg-amber-200">
                        <h1> Team Admin </h1>
                            
                        <div className="list-team">
                            <TeamAdmin/>
                        </div>
                        
                    </div>
                </div>
                <div className="data-2">
                    <h1> Users Recent Activity </h1>
                    <AccountActivity/>
                </div>

            </div>
        </div>
    </>)
}

const Dashboard = () => {
    return (
        <div className='dashboard-comp'>
            <Sidebar/>
            <MainDash/>
        </div>
    )
}

export default Dashboard