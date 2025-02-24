import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import CalendarWidget from './CalendarWidget'; // adjust the import path as needed
import { useSearchFilter } from '../../hooks/useSearchFilter';

const UsersLists = () => {
    const { accounts } = useAuth();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsCalendarOpen(false);
        console.log("Selected Date:", date);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsCalendarOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredByDate = selectedDate
        ? accounts.filter((acc) => {
            const boardDate =
            acc.createdAt && acc.createdAt.toDate
                ? acc.createdAt.toDate()
                : new Date(acc.createdAt);
            return boardDate.toLocaleDateString() === selectedDate.toLocaleDateString();
        })
        : accounts;

    const finalFilteredAccounts = useSearchFilter(filteredByDate, searchTerm, [
        'username',
        'email',
    ]);

    const sortedAccounts = finalFilteredAccounts.slice().sort((a, b) => {
        const dateA =
        a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB =
        b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
    });

    return (
        <div className="acc-user-comp">
            <div className="bg-overlay"></div>
            <h4 className="title text-xl">Users Account Data</h4>
            <div className="opt-searching flex items-center justify-between">
                <input
                    type="text"
                    className="search_main"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="sub_opt flex items-center justify-between gap-2">
                    <div className="dropdown-container" ref={dropdownRef} style={{ position: 'relative' }}>
                        <button onClick={toggleCalendar} className="date-range-btn">
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                        </button>
                        {isCalendarOpen && (
                        <div
                            className="dropdown-calendar"
                            style={{
                            position: 'absolute',
                            top: 'calc(100% + 4px)',
                            left: 0,
                            zIndex: 100,
                            background: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            borderRadius: '4px',
                            }}
                        >
                            <CalendarWidget onDateSelect={handleDateSelect} />
                        </div>
                        )}
                    </div>
                    <div className="del flex items-center justify-between gap-2">
                        <h5>Delete</h5>
                        <svg
                        width="14"
                        height="17"
                        viewBox="0 0 14 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.61601 16.5923C2.17134 16.5923 1.79101 16.4339 1.47501 16.1173C1.15901 15.8006 1.00067 15.4209 1.00001 14.9783V2.59227H0.500007C0.358007 2.59227 0.23934 2.54427 0.144007 2.44827C0.0486736 2.35227 0.000673516 2.23327 6.84931e-06 2.09127C-0.000659817 1.94927 0.0473402 1.8306 0.144007 1.73527C0.240674 1.63993 0.35934 1.59227 0.500007 1.59227H4.00001C4.00001 1.3856 4.07667 1.2056 4.23001 1.05227C4.38334 0.898932 4.56334 0.822266 4.77001 0.822266H9.23001C9.43667 0.822266 9.61667 0.898932 9.77001 1.05227C9.92334 1.2056 10 1.3856 10 1.59227H13.5C13.642 1.59227 13.7607 1.64027 13.856 1.73627C13.9513 1.83227 13.9993 1.95127 14 2.09327C14.0007 2.23527 13.9527 2.35393 13.856 2.44927C13.7593 2.5446 13.6407 2.59227 13.5 2.59227H13V14.9773C13 15.4213 12.8417 15.8013 12.525 16.1173C12.2083 16.4333 11.8283 16.5916 11.385 16.5923H2.61601ZM12 2.59227H2.00001V14.9773C2.00001 15.1566 2.05767 15.3039 2.17301 15.4193C2.28834 15.5346 2.43601 15.5923 2.61601 15.5923H11.385C11.5643 15.5923 11.7117 15.5346 11.827 15.4193C11.9423 15.3039 12 15.1566 12 14.9773V2.59227ZM5.30801 13.5923C5.45001 13.5923 5.56901 13.5443 5.66501 13.4483C5.76101 13.3523 5.80867 13.2336 5.80801 13.0923V5.09227C5.80801 4.95027 5.76001 4.8316 5.66401 4.73627C5.56801 4.64093 5.44901 4.59293 5.30701 4.59227C5.16501 4.5916 5.04634 4.6396 4.95101 4.73627C4.85567 4.83293 4.80801 4.9516 4.80801 5.09227V13.0923C4.80801 13.2343 4.85601 13.3529 4.95201 13.4483C5.04801 13.5443 5.16667 13.5923 5.30801 13.5923ZM8.69301 13.5923C8.83501 13.5923 8.95367 13.5443 9.04901 13.4483C9.14434 13.3523 9.19201 13.2336 9.19201 13.0923V5.09227C9.19201 4.95027 9.14401 4.8316 9.04801 4.73627C8.95201 4.64027 8.83334 4.59227 8.69201 4.59227C8.55001 4.59227 8.43101 4.64027 8.33501 4.73627C8.23901 4.83227 8.19134 4.95093 8.19201 5.09227V13.0923C8.19201 13.2343 8.24001 13.3529 8.33601 13.4483C8.43201 13.5436 8.55101 13.5916 8.69301 13.5923Z" fill="black"/>
                        </svg>
                    </div>
                    <div className="edit flex items-center justify-between gap-2">
                        <h5>Edit</h5>
                        <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0.548828 18.5298H17.4488C17.5814 18.5298 17.7086 18.4771 17.8024 18.3833C17.8961 18.2896 17.9488 18.1624 17.9488 18.0298C17.9488 17.8972 17.8961 17.77 17.8024 17.6762C17.7086 17.5825 17.5814 17.5298 17.4488 17.5298H0.548828C0.41622 17.5298 0.289043 17.5825 0.195275 17.6762C0.101506 17.77 0.0488281 17.8972 0.0488281 18.0298C0.0488281 18.1624 0.101506 18.2896 0.195275 18.3833C0.289043 18.4771 0.41622 18.5298 0.548828 18.5298ZM6.71083 14.7718C7.13301 14.653 7.51829 14.4294 7.83083 14.1218L17.3708 4.58179C17.6975 4.2538 17.881 3.80972 17.881 3.34679C17.881 2.88385 17.6975 2.43977 17.3708 2.11179L16.4308 1.18179C16.0979 0.864496 15.6557 0.6875 15.1958 0.6875C14.736 0.6875 14.2937 0.864496 13.9608 1.18179L4.42083 10.7118C4.11319 11.0227 3.89251 11.4089 3.78083 11.8318L3.04083 14.5918C3.00604 14.7179 3.00529 14.8509 3.03867 14.9774C3.07204 15.1039 3.13835 15.2193 3.23083 15.3118C3.37255 15.4507 3.56241 15.5295 3.76083 15.5318L6.71083 14.7718ZM7.12083 13.4118C6.93641 13.5994 6.70503 13.7341 6.45083 13.8018L5.48083 14.0618L4.48083 13.0618L4.74083 12.0918C4.80987 11.8381 4.94436 11.6071 5.13083 11.4218L5.51083 11.0518L7.50083 13.0418L7.12083 13.4118ZM8.21083 12.3318L6.22083 10.3418L12.9508 3.61179L14.9408 5.60179L8.21083 12.3318ZM16.6608 3.88179L15.6508 4.89179L13.6608 2.90179L14.6708 1.88179C14.8115 1.74134 15.0021 1.66245 15.2008 1.66245C15.3996 1.66245 15.5902 1.74134 15.7308 1.88179L16.6608 2.82179C16.8003 2.96292 16.8785 3.15336 16.8785 3.35179C16.8785 3.55022 16.8003 3.74065 16.6608 3.88179Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="acc-user-lists">
                <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Created At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedAccounts.map((acc) => {
                        const boardDate =
                        acc.createdAt && acc.createdAt.toDate
                            ? acc.createdAt.toDate()
                            : new Date(acc.createdAt);
                        return (
                        <tr key={acc.id}>
                            <td>{acc.username || acc.email || '-'}</td>
                            <td>{acc.email || '-'}</td>
                            <td>{boardDate.toLocaleString()}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default UsersLists;
