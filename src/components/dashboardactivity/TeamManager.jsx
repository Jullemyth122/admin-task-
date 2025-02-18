import React from 'react'
import { useAuth } from '../../context/useAuth';
const TeamManager = () => {

    const { managers } = useAuth()
    // const { }
 
    const sortedManagers = managers.slice().sort((a, b) => {
        const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
    });

    return (
        <>
        <div className="recent-list">
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Approval</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedManagers.map(manager => {
                        const managerDate =
                        manager.createdAt && manager.createdAt.toDate
                            ? manager.createdAt.toDate()
                            : new Date(manager.createdAt);
                        return (
                        <tr key={manager.id}>
                            <td>{manager.username || '-'}</td>
                            <td>{manager.email || '-'}</td>
                            <td>{managerDate.toLocaleString()}</td>
                            <td>
                                <input type="checkbox" name="" id="" checked={false} />
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default TeamManager