import React from 'react';
import { useActivity } from '../../context/useActivity';

const AccountActivityTable = () => {
  const { userBoards } = useActivity();

  // Sort boards by createdAt (newest first)
  const sortedBoards = userBoards.slice().sort((a, b) => {
    const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
    const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <div className="recent-list">
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
                  <td>{board.username || board.email || '-'}</td>
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
