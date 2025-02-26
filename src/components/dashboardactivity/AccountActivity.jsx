import React, { useEffect, useRef, useState } from 'react';
import { useActivity } from '../../context/useActivity';
import { useSearchFilter } from '../../hooks/useSearchFilter';
import CalendarWidget from '../accountlists/CalendarWidget';

const AccountActivityTable = () => {
  const { userBoards } = useActivity();
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  // Sort boards by createdAt (newest first)
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
  
  const filteredByDate = selectedDate ? userBoards.filter((acc) => {
    const boardDate = acc.createdAt && acc.createdAt.toDate ? acc.createdAt.toDate() : new Date(acc.createdAt);

    return boardDate.toLocaleDateString() == selectedDate.toLocaleDateString();
  }) : userBoards;


  const finalFilteredBoards = useSearchFilter(filteredByDate, searchTerm, [
    'username',
    'email',
  ])


  const sortedBoards = finalFilteredBoards.slice().sort((a, b) => {
    const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
    const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
    return dateB - dateA;
  });
  

  return (
    <div className="recent-list">
      <div className="bg-overlay"></div>
      <div className="search-line w-full flex items-center justify-start gap-2.5">
        <input
            type="text"
            className="search_main"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Board Title</th>
              <th>Username / Email</th>
              <th>Visibility</th>
              <th>Template</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {sortedBoards.map(board => {
              const boardDate =
                board.createdAt && board.createdAt.toDate
                  ? board.createdAt.toDate()
                  : new Date(board.createdAt);
              return (
                <tr key={board.id}>
                  <td>{board.boardTitle || '-'}</td>
                  <td>
                    {board.username || '-'}
                    <br/>
                    {  board.email || '-'}
                  </td>
                  <td>{board.boardVisibility || '-'}</td>
                  <td>{board.boardTemplate || '-'}</td>
                  <td>{boardDate.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountActivityTable;
