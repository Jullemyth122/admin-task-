// Sales.jsx
import React, { useEffect, useState } from 'react';
import '../scss/sales.scss';
import '../scss/sidebar.scss';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../utility/firebase';
import Sidebar from './Sidebar';
import { useAuth } from '../context/useAuth';

const SalesBoard = () => {
    const { accounts, fetchedUsers, currentUser } = useAuth();
    const [adminData, setAdminData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAccs, setFilteredAccs] = useState([]);
    const [editingAccount, setEditingAccount] = useState(null);
    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
        isPremiumUser: false,
        ratePremium: '',
        PremiumPrice: '',
    });

    useEffect(() => {
        fetchedUsers();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredAccs(accounts);
        } else {
            setFilteredAccs(
                accounts.filter(acc =>
                acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                acc.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, accounts]);

    useEffect(() => {
        const fetchAdminData = async () => {
            if (currentUser) {
                const adminDocRef = doc(db, "admin", currentUser.uid);
                const adminDocSnap = await getDoc(adminDocRef);
                if (adminDocSnap.exists()) {
                setAdminData(adminDocSnap.data());
                }
            }
        };
        fetchAdminData();
    }, [currentUser]);

    const premiumAccounts = accounts.filter(acc => acc.isPremiumUser);
    const averagePremiumPrice =
        premiumAccounts.length > 0
        ? (
            premiumAccounts.reduce((sum, curr) => sum + curr.PremiumPrice, 0) /
            premiumAccounts.length
            ).toFixed(2)
        : 0;

    const handleEditClick = (account) => {
        setEditingAccount(account);
        setEditForm({
            username: account.username,
            email: account.email,
            isPremiumUser: account.isPremiumUser,
            ratePremium: account.ratePremium,
            PremiumPrice: account.PremiumPrice,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditForm(prev => ({ ...prev, [name]: checked }));
    };

    useEffect(() => {
        if (editForm.isPremiumUser) {
            const rate = Number(editForm.ratePremium);
            let computedPrice = 0;
            if (rate === 1) computedPrice = 4.99;
            else if (rate === 2) computedPrice = 9.99;
            else if (rate === 3) computedPrice = 19.99;
            if (computedPrice && computedPrice !== Number(editForm.PremiumPrice)) {
                setEditForm(prev => ({ ...prev, PremiumPrice: computedPrice }));
            }
        } else {
            if (editForm.ratePremium !== 0 || editForm.PremiumPrice !== 0) {
                setEditForm(prev => ({ ...prev, ratePremium: 0, PremiumPrice: 0 }));
            }
        }
    }, [editForm.isPremiumUser, editForm.ratePremium]);

    const handleUpdate = async () => {
        if (!editingAccount) return;

        try {
            const accountRef = doc(db, 'account', editingAccount.id);
            await updateDoc(accountRef, {
                username: editForm.username,
                email: editForm.email,
                isPremiumUser: editForm.isPremiumUser,
                ratePremium: Number(editForm.ratePremium),
                PremiumPrice: Number(editForm.PremiumPrice),
                updatedAt: new Date(),
            });
            fetchedUsers();
            setEditingAccount(null);
        } catch (error) {
            console.error("Error updating account:", error);
        }
    };

    // Delete account (admin-only)
    const handleDelete = async (accountId) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            try {
                await deleteDoc(doc(db, 'account', accountId));
                fetchedUsers();
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

    const handleCancel = () => {
        setEditingAccount(null);
    };

    return (
        <div className="mainboard">
            <div className="sales-management-board">
                <div className="header">
                    <h2>Sales Management</h2>
                    <input
                        type="text"
                        placeholder="Search Sales"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overview-cards">
                    <div className="card">
                        <h3>Total Accounts</h3>
                        <p>{accounts.length}</p>
                    </div>
                    <div className="card">
                        <h3>Premium Accounts</h3>
                        <p>{premiumAccounts.length}</p>
                    </div>
                    <div className="card">
                        <h3>Avg. Premium Price</h3>
                        <p>${averagePremiumPrice}</p>
                    </div>
                    {adminData && adminData.role === "admin" && (
                        <div className="card">
                        <h3>Admin Privileges</h3>
                        <p>Full Access</p>
                        </div>
                    )}
                </div>

                <div className="sales-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Premium</th>
                                <th>Rate</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccs.map((acc, index) => (
                                <tr key={acc.id || index}>
                                <td>{acc.username}</td>
                                <td>{acc.email}</td>
                                <td>{acc.isPremiumUser ? "Yes" : "No"}</td>
                                <td>{acc.ratePremium}</td>
                                <td>${acc.PremiumPrice}</td>
                                <td>
                                    <button onClick={() => handleEditClick(acc)}>Edit</button>
                                    <button onClick={() => handleDelete(acc.id)}>Delete</button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for editing account details */}
                {editingAccount && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Account Pricing</h3>
                        <label>
                            Username:
                            <input
                            type="text"
                            name="username"
                            value={editForm.username}
                            onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Premium User:
                            <input
                            type="checkbox"
                            name="isPremiumUser"
                            checked={editForm.isPremiumUser}
                            onChange={handleCheckboxChange}
                            />
                        </label>
                        <label>
                            Rate Premium:
                            <input
                            type="number"
                            name="ratePremium"
                            value={editForm.ratePremium}
                            onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Premium Price:
                            <input
                            type="number"
                            name="PremiumPrice"
                            value={editForm.PremiumPrice}
                            onChange={handleEditChange}
                            />
                        </label>
                        <div className="modal-actions">
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

const Sales = () => {
    return (
        <div className="sales-comp">
        <Sidebar />
        <SalesBoard />
        </div>
    );
};

export default Sales;
