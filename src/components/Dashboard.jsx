import React from 'react'
import '../scss/dashboard.scss'
import '../scss/sidebar.scss'
import '../scss/mainboard.scss'
import { Link } from 'react-router-dom'
import DashboardChart from './chart/DashboardChart'
import EngagementChart from './chart/EngagementChart'
import ModernPieChart from './chart/ModernPieChart'
import AccountActivity from './dashboardactivity/AccountActivity'

const Sidebar = () => {
    
    
    return (
        <>
        <div className="sidebar">
            <div className="side-comp">

                <div className="nav-side">
                    <h3 className='txt1'> T 4 S K </h3>
                    <h3 className='absolute txt2'> T 4 S K </h3>
                </div>

                <ul className='grid gap-6'>
                    <div className='w-full flex items-center justify-center'>
                        <h1 className='admin-txt'>
                            A D M I N
                        </h1>
                    </div>
                    <li>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.875 6.25V0H20V6.25H11.875ZM0 10V0H8.125V10H0ZM11.875 20V10H20V20H11.875ZM0 20V13.75H8.125V20H0ZM1.25 8.75H6.875V1.25H1.25V8.75ZM13.125 18.75H18.75V11.25H13.125V18.75ZM13.125 5H18.75V1.25H13.125V5ZM1.25 18.75H6.875V15H1.25V18.75Z" fill="black"/>
                        </svg>
                        <Link to={'/dashboard'}> 
                            Dashboard 
                        </Link>
                    </li>
                    <li>
                        <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 0.25C13.8397 0.25 12.7269 0.710936 11.9064 1.53141C11.0859 2.35188 10.625 3.46468 10.625 4.625C10.625 5.78532 11.0859 6.89812 11.9064 7.71859C12.7269 8.53906 13.8397 9 15 9C16.1603 9 17.2731 8.53906 18.0936 7.71859C18.9141 6.89812 19.375 5.78532 19.375 4.625C19.375 3.46468 18.9141 2.35188 18.0936 1.53141C17.2731 0.710936 16.1603 0.25 15 0.25ZM15 2.75C15.4973 2.75 15.9742 2.94754 16.3258 3.29917C16.6775 3.65081 16.875 4.12772 16.875 4.625C16.875 5.12228 16.6775 5.59919 16.3258 5.95083C15.9742 6.30246 15.4973 6.5 15 6.5C14.5027 6.5 14.0258 6.30246 13.6742 5.95083C13.3225 5.59919 13.125 5.12228 13.125 4.625C13.125 4.12772 13.3225 3.65081 13.6742 3.29917C14.0258 2.94754 14.5027 2.75 15 2.75ZM6.875 4C6.0462 4 5.25134 4.32924 4.66529 4.91529C4.07924 5.50134 3.75 6.2962 3.75 7.125C3.75 8.3 4.4125 9.3125 5.3625 9.85C5.8125 10.1 6.325 10.25 6.875 10.25C7.425 10.25 7.9375 10.1 8.3875 9.85C8.85 9.5875 9.2375 9.2125 9.525 8.7625C8.61435 7.57571 8.12209 6.1209 8.125 4.625V4.275C7.75 4.1 7.325 4 6.875 4ZM23.125 4C22.675 4 22.25 4.1 21.875 4.275V4.625C21.875 6.125 21.3875 7.575 20.475 8.7625C20.625 9 20.7875 9.1875 20.975 9.375C21.5513 9.9341 22.3221 10.2478 23.125 10.25C23.675 10.25 24.1875 10.1 24.6375 9.85C25.5875 9.3125 26.25 8.3 26.25 7.125C26.25 6.2962 25.9208 5.50134 25.3347 4.91529C24.7487 4.32924 23.9538 4 23.125 4ZM15 11.5C12.075 11.5 6.25 12.9625 6.25 15.875V17.75H23.75V15.875C23.75 12.9625 17.925 11.5 15 11.5ZM5.8875 12.1875C3.475 12.475 0 13.7 0 15.875V17.75H3.75V15.3375C3.75 14.075 4.6125 13.025 5.8875 12.1875ZM24.1125 12.1875C25.3875 13.025 26.25 14.075 26.25 15.3375V17.75H30V15.875C30 13.7 26.525 12.475 24.1125 12.1875ZM15 14C16.9125 14 19.05 14.625 20.2875 15.25H9.7125C10.95 14.625 13.0875 14 15 14Z" fill="black"/>
                        </svg>
                        <Link to={'/dashboard'}> 
                            Accounts 
                        </Link>
                    </li>
                    <li>
                        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.875 5.75C4.875 4.9212 5.20424 4.12634 5.79029 3.54029C6.37634 2.95424 7.1712 2.625 8 2.625C8.8288 2.625 9.62366 2.95424 10.2097 3.54029C10.7958 4.12634 11.125 4.9212 11.125 5.75C11.125 6.5788 10.7958 7.37366 10.2097 7.95971C9.62366 8.54576 8.8288 8.875 8 8.875C7.1712 8.875 6.37634 8.54576 5.79029 7.95971C5.20424 7.37366 4.875 6.5788 4.875 5.75ZM8 0.75C6.67392 0.75 5.40215 1.27678 4.46447 2.21447C3.52678 3.15215 3 4.42392 3 5.75C3 7.07608 3.52678 8.34785 4.46447 9.28553C5.40215 10.2232 6.67392 10.75 8 10.75C9.32608 10.75 10.5979 10.2232 11.5355 9.28553C12.4732 8.34785 13 7.07608 13 5.75C13 4.42392 12.4732 3.15215 11.5355 2.21447C10.5979 1.27678 9.32608 0.75 8 0.75ZM17.375 7C17.375 6.50272 17.5725 6.02581 17.9242 5.67417C18.2758 5.32254 18.7527 5.125 19.25 5.125C19.7473 5.125 20.2242 5.32254 20.5758 5.67417C20.9275 6.02581 21.125 6.50272 21.125 7C21.125 7.49728 20.9275 7.97419 20.5758 8.32583C20.2242 8.67746 19.7473 8.875 19.25 8.875C18.7527 8.875 18.2758 8.67746 17.9242 8.32583C17.5725 7.97419 17.375 7.49728 17.375 7ZM19.25 3.25C18.2554 3.25 17.3016 3.64509 16.5983 4.34835C15.8951 5.05161 15.5 6.00544 15.5 7C15.5 7.99456 15.8951 8.94839 16.5983 9.65165C17.3016 10.3549 18.2554 10.75 19.25 10.75C20.2446 10.75 21.1984 10.3549 21.9017 9.65165C22.6049 8.94839 23 7.99456 23 7C23 6.00544 22.6049 5.05161 21.9017 4.34835C21.1984 3.64509 20.2446 3.25 19.25 3.25ZM12.6875 13.25C13.0637 13.25 13.4225 13.325 13.7512 13.4575C13.3651 13.6063 13.0123 13.8303 12.7133 14.1166C12.4144 14.4028 12.1754 14.7456 12.01 15.125H3.3125C3.06386 15.125 2.8254 15.2238 2.64959 15.3996C2.47377 15.5754 2.375 15.8139 2.375 16.0625V16.3837L2.38375 16.4837C2.3925 16.5762 2.4125 16.7188 2.4525 16.895C2.535 17.2463 2.7 17.715 3.02625 18.1812C3.6425 19.0625 4.9725 20.125 8 20.125C9.75875 20.125 10.9438 19.7662 11.75 19.2937V21.37C10.7613 21.76 9.52875 22 8 22C4.465 22 2.5125 20.7188 1.49 19.2563C0.955657 18.4881 0.621398 17.5987 0.5175 16.6687C0.508714 16.5831 0.502877 16.4973 0.5 16.4113V16.0638C0.499836 15.6943 0.572462 15.3284 0.71373 14.9871C0.854998 14.6457 1.06214 14.3355 1.32332 14.0742C1.5845 13.8129 1.8946 13.6056 2.23591 13.4642C2.57722 13.3228 2.94305 13.25 3.3125 13.25H12.6875ZM13 16.375C13 15.8777 13.1975 15.4008 13.5492 15.0492C13.9008 14.6975 14.3777 14.5 14.875 14.5H24.875C25.3723 14.5 25.8492 14.6975 26.2008 15.0492C26.5525 15.4008 26.75 15.8777 26.75 16.375V21.375C26.75 21.8723 26.5525 22.3492 26.2008 22.7008C25.8492 23.0525 25.3723 23.25 24.875 23.25H14.875C14.3777 23.25 13.9008 23.0525 13.5492 22.7008C13.1975 22.3492 13 21.8723 13 21.375V16.375ZM14.25 17V18.25C14.913 18.25 15.5489 17.9866 16.0178 17.5178C16.4866 17.0489 16.75 16.413 16.75 15.75H15.5C15.5 16.0815 15.3683 16.3995 15.1339 16.6339C14.8995 16.8683 14.5815 17 14.25 17ZM25.5 18.25V17C25.1685 17 24.8505 16.8683 24.6161 16.6339C24.3817 16.3995 24.25 16.0815 24.25 15.75H23C23 16.413 23.2634 17.0489 23.7322 17.5178C24.2011 17.9866 24.837 18.25 25.5 18.25ZM23 22H24.25C24.25 21.6685 24.3817 21.3505 24.6161 21.1161C24.8505 20.8817 25.1685 20.75 25.5 20.75V19.5C24.837 19.5 24.2011 19.7634 23.7322 20.2322C23.2634 20.7011 23 21.337 23 22ZM14.25 19.5V20.75C14.5815 20.75 14.8995 20.8817 15.1339 21.1161C15.3683 21.3505 15.5 21.6685 15.5 22H16.75C16.75 21.337 16.4866 20.7011 16.0178 20.2322C15.5489 19.7634 14.913 19.5 14.25 19.5ZM19.875 21.0625C20.4552 21.0625 21.0116 20.832 21.4218 20.4218C21.832 20.0116 22.0625 19.4552 22.0625 18.875C22.0625 18.2948 21.832 17.7384 21.4218 17.3282C21.0116 16.918 20.4552 16.6875 19.875 16.6875C19.2948 16.6875 18.7384 16.918 18.3282 17.3282C17.918 17.7384 17.6875 18.2948 17.6875 18.875C17.6875 19.4552 17.918 20.0116 18.3282 20.4218C18.7384 20.832 19.2948 21.0625 19.875 21.0625Z" fill="black"/>
                        </svg>
                        <Link to={'/dashboard'}> 
                            Sales 
                        </Link>
                    </li>
                    <li>
                        <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.02513 4.27513C1.6815 3.61875 2.57174 3.25 3.5 3.25H6C6.55228 3.25 7 3.69772 7 4.25C7 4.80228 6.55228 5.25 6 5.25H3.5C3.10217 5.25 2.72064 5.40804 2.43934 5.68934C2.15804 5.97064 2 6.35217 2 6.75V21.75C2 22.1478 2.15803 22.5294 2.43934 22.8107C2.72064 23.092 3.10218 23.25 3.5 23.25H10.6212C11.1735 23.25 11.6212 23.6977 11.6212 24.25C11.6212 24.8023 11.1735 25.25 10.6212 25.25H3.5C2.57174 25.25 1.6815 24.8813 1.02513 24.2249C0.368749 23.5685 0 22.6783 0 21.75V6.75C0 5.82174 0.368749 4.9315 1.02513 4.27513ZM12.5 4.25C12.5 3.69772 12.9477 3.25 13.5 3.25H16C16.9283 3.25 17.8185 3.61875 18.4749 4.27513C19.1313 4.9315 19.5 5.82174 19.5 6.75V11.75C19.5 12.3023 19.0523 12.75 18.5 12.75C17.9477 12.75 17.5 12.3023 17.5 11.75V6.75C17.5 6.35218 17.342 5.97064 17.0607 5.68934C16.7794 5.40803 16.3978 5.25 16 5.25H13.5C12.9477 5.25 12.5 4.80228 12.5 4.25ZM18.5 14.5C19.0523 14.5 19.5 14.9477 19.5 15.5V19.5H23.5C24.0523 19.5 24.5 19.9477 24.5 20.5C24.5 21.0523 24.0523 21.5 23.5 21.5H18.5C17.9477 21.5 17.5 21.0523 17.5 20.5V15.5C17.5 14.9477 17.9477 14.5 18.5 14.5Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.5 2.75C8.10218 2.75 7.72064 2.90803 7.43934 3.18934C7.15804 3.47064 7 3.85218 7 4.25C7 4.64782 7.15804 5.02936 7.43934 5.31066C7.72064 5.59196 8.10218 5.75 8.5 5.75H11C11.3978 5.75 11.7794 5.59196 12.0607 5.31066C12.342 5.02936 12.5 4.64782 12.5 4.25C12.5 3.85218 12.342 3.47064 12.0607 3.18934C11.7794 2.90803 11.3978 2.75 11 2.75H8.5ZM6.02513 1.77513C6.6815 1.11875 7.57174 0.75 8.5 0.75H11C11.9283 0.75 12.8185 1.11875 13.4749 1.77513C14.1312 2.4315 14.5 3.32174 14.5 4.25C14.5 5.17826 14.1312 6.0685 13.4749 6.72487C12.8185 7.38125 11.9283 7.75 11 7.75H8.5C7.57174 7.75 6.6815 7.38125 6.02513 6.72487C5.36875 6.0685 5 5.17826 5 4.25C5 3.32174 5.36875 2.4315 6.02513 1.77513ZM5 11.75C5 11.1977 5.44772 10.75 6 10.75H11C11.5523 10.75 12 11.1977 12 11.75C12 12.3023 11.5523 12.75 11 12.75H6C5.44772 12.75 5 12.3023 5 11.75ZM14.2574 16.2574C15.3826 15.1321 16.9087 14.5 18.5 14.5C20.0913 14.5 21.6174 15.1321 22.7426 16.2574C23.8679 17.3826 24.5 18.9087 24.5 20.5C24.5 22.0913 23.8679 23.6174 22.7426 24.7426C21.6174 25.8679 20.0913 26.5 18.5 26.5C16.9087 26.5 15.3826 25.8679 14.2574 24.7426C13.1321 23.6174 12.5 22.0913 12.5 20.5C12.5 18.9087 13.1321 17.3826 14.2574 16.2574ZM18.5 16.5C17.4391 16.5 16.4217 16.9214 15.6716 17.6716C14.9214 18.4217 14.5 19.4391 14.5 20.5C14.5 21.5609 14.9214 22.5783 15.6716 23.3284C16.4217 24.0786 17.4391 24.5 18.5 24.5C19.5609 24.5 20.5783 24.0786 21.3284 23.3284C22.0786 22.5783 22.5 21.5609 22.5 20.5C22.5 19.4391 22.0786 18.4217 21.3284 17.6716C20.5783 16.9214 19.5609 16.5 18.5 16.5ZM5 16.75C5 16.1977 5.44772 15.75 6 15.75H9.75C10.3023 15.75 10.75 16.1977 10.75 16.75C10.75 17.3023 10.3023 17.75 9.75 17.75H6C5.44772 17.75 5 17.3023 5 16.75Z" fill="black"/>
                        </svg>
                        <Link to={'/dashboard'}> 
                            Reports 
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

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