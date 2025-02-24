import React, { useState } from 'react';
import '../../scss/calendarwidget.scss'; // Ensure your updated SCSS is imported

const CalendarWidget = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Determine the first day and total days of the current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Build the calendar grid by inserting empty cells and actual day numbers
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Checks if a day corresponds to today's date
  const isToday = (day) => {
    const today = new Date();
    return (
      day &&
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const handleDayClick = (day) => {
    if (day && onDateSelect) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      onDateSelect(selectedDate);
    }
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-btn">&lt;</button>
        <span className="month-label">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={goToNextMonth} className="nav-btn">&gt;</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday, index) => (
          <div key={index} className="calendar-grid-header">
            {weekday}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-cell ${isToday(day) ? "today" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
