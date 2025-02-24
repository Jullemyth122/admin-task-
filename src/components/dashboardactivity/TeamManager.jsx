import React from 'react'
import { useAuth } from '../../context/useAuth';
import { db } from '../../utility/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import CustomCheckbox from './CustomCheckBox';
const TeamManager = () => {

    const { managers, fetchedManagers } = useAuth()
    // const { }
 
    const sortedManagers = managers.slice().sort((a, b) => {
        const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
    });

    const handleCCM = async (accId, field, currentValue) => {
        try {
            const newValue = !currentValue;
            const accDocRef = doc(db, "manager", accId);
            const checking = await updateDoc(accDocRef, { [field]: newValue });
            console.log({[field]: newValue})
            console.log(accDocRef)
            console.log(checking)
            // Refresh the accounts list after updating the document.
            if (fetchedManagers) fetchedManagers();
        } catch (error) {
            console.error("Error updating account field:", error);
        }
    };


    return (
        <>
        <div className="recent-list">
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Username / Email </th>
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
                            <td>
                                {manager.username || '-'}
                                <br/>
                                {manager.email || '-'}
                            </td>
                            <td>{managerDate.toLocaleString()}</td>
                            <td>
                                <CustomCheckbox
                                    id={`tagging-${manager.id}`}
                                    checked={manager.approval}
                                    onChange={() => handleCCM(manager.id, 'approval', manager.approval)}
                                />
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