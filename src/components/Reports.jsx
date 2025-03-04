import React, { useState, useEffect } from 'react';
import '../scss/report.scss';
import Sidebar from './Sidebar';
import { useActivity } from '../context/useActivity';
import { useAuth } from '../context/useAuth';

const Reports = () => {
  const { userBoards } = useActivity();
  const { accounts } = useAuth();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reports, setReports] = useState([]);
  const [calendarData, setCalendarData] = useState({});

  // Truncate text to a max length of 20 characters by default
  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Helper: safely convert a timestamp to a Date (using createdAt)
  const getBoardDate = (timestamp) => {
    if (!timestamp) return null;
    let dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return isNaN(dateObj.getTime()) ? null : dateObj;
  };

  // Build calendar data from boards and accounts (combining counts)
  useEffect(() => {
    const data = {};
    // Process boards
    userBoards.forEach((board) => {
      const boardDate = getBoardDate(board.createdAt);
      if (boardDate && boardDate.getFullYear() === selectedYear) {
        const dateKey = boardDate.toISOString().split('T')[0];
        data[dateKey] = (data[dateKey] || 0) + 1;
      }
    });
    // Process accounts (assuming accounts have a createdAt field)
    accounts.forEach((acc) => {
      const accDate = getBoardDate(acc.createdAt);
      if (accDate && accDate.getFullYear() === selectedYear) {
        const dateKey = accDate.toISOString().split('T')[0];
        data[dateKey] = (data[dateKey] || 0) + 1;
      }
    });
    setCalendarData(data);
  }, [userBoards, accounts, selectedYear]);

  // Filter boards by selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = userBoards.filter((board) => {
        const boardDate = getBoardDate(board.createdAt);
        if (!boardDate) return false;
        const dateKey = boardDate.toISOString().split('T')[0];
        return dateKey === selectedDate;
      });
      setReports(filtered);
    } else {
      setReports([]);
    }
  }, [selectedDate, userBoards]);

  // Also filter accounts by selected date (if needed for display)
  const filteredAccounts = selectedDate
    ? accounts.filter((acc) => {
        const accDate = getBoardDate(acc.createdAt);
        if (!accDate) return false;
        const dateKey = accDate.toISOString().split('T')[0];
        return dateKey === selectedDate;
      })
    : [];

  const handleYearChange = (direction) => {
    setSelectedYear((prevYear) => prevYear + direction);
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Color scale based on the combined count (boards + accounts)
  const getColorForCount = (count) => {
    if (count === 0) return '#4f96ff98';
    if (count <= 5) return '#f1e47b';
    if (count <= 10) return '#f6e45d';
    return '#e0c91b';
  };

  // Render the calendar as a series of month rows (7-day grid)
  const renderMonthGrids = () => {
    const monthRows = [];
    for (let month = 0; month < 12; month++) {
      const monthName = new Date(selectedYear, month, 1).toLocaleString('default', {
        month: 'long',
      });
      const startDay = new Date(selectedYear, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
      const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();
      const cells = [];

      // Offset cells for the first day
      for (let i = 0; i < startDay; i++) {
        cells.push(
          <div key={`empty-${month}-${i}`} className="day-cell empty"></div>
        );
      }
      // Create day cells with combined count
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(selectedYear, month, day);
        const dateKey = dateObj.toISOString().split('T')[0];
        const combinedCount = calendarData[dateKey] || 0;
        const color = getColorForCount(combinedCount);
        cells.push(
          <div
            key={dateKey}
            className="day-cell"
            style={{ backgroundColor: color }}
            onClick={() => handleDateClick(dateKey)}
          ></div>
        );
      }
      // Fill row so each row has exactly 7 cells
      const totalCells = startDay + daysInMonth;
      const remainder = totalCells % 7;
      if (remainder !== 0) {
        for (let i = 0; i < 7 - remainder; i++) {
          cells.push(
            <div key={`end-${month}-${i}`} className="day-cell empty"></div>
          );
        }
      }
      monthRows.push(
        <div key={month} className="month-row">
          <div className="month-label-vertical">{monthName}</div>
          <div className="month-grid">{cells}</div>
        </div>
      );
    }
    return monthRows;
  };

  return (
    <div className="reports-comp">
      <Sidebar />
      <div className="mainboard">
        <div className="reports-container">
          <div className="bg-overlay"></div>
          <div className="data-list-section">
            {/* Boards Panel */}
            <div className="boards-panel">
              <h2>Boards for {selectedDate || 'Select a Date'}</h2>
              {selectedDate ? (
                reports.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Board Title</th>
                        <th>Visibility</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report, index) => (
                        <tr key={index}>
                          <td>{truncateText(report.boardTitle)}</td>
                          <td>{report.boardVisibility}</td>
                          <td>
                            {getBoardDate(report.createdAt)
                              ? getBoardDate(report.createdAt).toLocaleString()
                              : 'Invalid Date'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No boards found for this date.</p>
                )
              ) : (
                <p>Please select a date from the calendar to view board reports.</p>
              )}
            </div>
            {/* Accounts Panel */}
            <div className="accounts-panel">
              <h2>Accounts for {selectedDate || 'Select a Date'}</h2>
              {selectedDate ? (
                filteredAccounts.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>UID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map((acc, index) => (
                        <tr key={acc.id || index}>
                          <td>{truncateText(acc.username)}</td>
                          <td>{truncateText(acc.email)}</td>
                          <td>{truncateText(acc.uid)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No accounts found for this date.</p>
                )
              ) : (
                <p>Please select a date from the calendar to view accounts.</p>
              )}
            </div>
          </div>
          {/* Right Column: Calendar */}
          <div className="calendar-section">
            <div className="year-navigation">
              <button onClick={() => handleYearChange(-1)}>Previous</button>
              <span>{selectedYear}</span>
              <button onClick={() => handleYearChange(1)}>Next</button>
            </div>
            <div className="calendar-wrapper">{renderMonthGrids()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
