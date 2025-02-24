import React, { useEffect } from 'react'
import { useAuth } from '../../context/useAuth';
import { db } from '../../utility/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import CustomCheckbox from './CustomCheckBox';

const TeamAdmin = () => {
    // Pull in error message and setErrorMessage from context
    const { admins, fetchedAdmins, errorMessage, setErrorMessage } = useAuth();

    const sortedAdmins = admins.slice().sort((a, b) => {
        const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
    });

    const handleCCA = async (accId, field, currentValue) => {
            // If toggling approval off…
        if (field === 'approval' && currentValue === true) {
            // Count approved admins
            const approvedAdmins = admins.filter(admin => admin.approval === true);
            if (approvedAdmins.length === 1) {
                // Instead of alerting, update the error state for the frontend to display.
                setErrorMessage("At least one admin must remain approved.");
                return; // Do not proceed with the update.
            }
        }
        try {
            const newValue = !currentValue;
            const accDocRef = doc(db, "admin", accId);
            await updateDoc(accDocRef, { [field]: newValue });
            // Clear any error message if update is successful.
            setErrorMessage("");
            // Refresh the admins list after updating the document.
            if (fetchedAdmins) fetchedAdmins();
            } catch (error) {
            console.error("Error updating account field:", error);
            setErrorMessage("Error updating account field.");
        }
    };
    
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
            setErrorMessage("");
            }, 5000); // Clear after 3000ms (3 seconds)
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);


    return (
        <>
        {/* Display error message if exists */}
        {errorMessage && 
        <div className="error-message">
            <p className='text-red-500'>
                {errorMessage}
            </p>
        </div>
        }
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
                    {sortedAdmins.map(admin => {
                        const managerDate =
                        admin.createdAt && admin.createdAt.toDate
                            ? admin.createdAt.toDate()
                            : new Date(admin.createdAt);
                        return (
                        <tr key={admin.id}>
                            <td>
                            {admin.username || '-'}
                            <br />
                            {admin.email || '-'}
                            </td>
                            <td>{managerDate.toLocaleString()}</td>
                            <td>
                            <CustomCheckbox
                                id={`tagging-${admin.id}`}
                                checked={admin.approval}
                                onChange={() => handleCCA(admin.id, 'approval', admin.approval)}
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

export default TeamAdmin;
