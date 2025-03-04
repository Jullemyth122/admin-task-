// useAuth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../utility/firebase'; // Import providers
import { saveAdminData } from '../utility/admin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { fetchAdminAccs, fetchManagerAccs, fetchUserAccs } from '../utility/activity';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");  // New state for success messages

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [admins,setAdmins] = useState([])
    const [managers,setManagers] = useState([])
    const [accounts,setAccounts] = useState([])

    const [accBST, setAccBST] = useState(null); // holds current user's account document data


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
            // Fetch the admin document from Firestore
            const adminDocRef = doc(db, "admin", user.uid);
            const adminDocSnap = await getDoc(adminDocRef);

            if (adminDocSnap.exists() && adminDocSnap.data().approval) {
                // Only set currentUser if the admin is approved
                setCurrentUser(user);
            } else {
                // If not approved (or no admin record), show an error and sign out
                setErrorMessage("Your account is pending approval. Please contact the administrator.");
                // await auth.signOut();
                setCurrentUser(null);
            }
            } else {
            setCurrentUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Listen for real-time changes to the current user's account document in Firestore.
    useEffect(() => {
        if (currentUser) {
            const accountRef = doc(db, "admin", currentUser.uid);
            const unsubscribe = onSnapshot(accountRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const accountData = docSnapshot.data();
                    setAccBST(accountData);
                }
            });
            return () => unsubscribe();
        }
    }, [currentUser]);

    const fetchedManagers = async() => {
        const managers_ = await fetchManagerAccs();
        setManagers(managers_)
    }

    const fetchedAdmins = async() => {
        const admins_ = await fetchAdminAccs();
        setAdmins(admins_)
    }

    const fetchedUsers = async() => {
        const users_ = await fetchUserAccs();
        setAccounts(users_)
    }

    useEffect(() => {
        fetchedManagers();
        fetchedAdmins();
        fetchedUsers();
    },[])

    const handleLogin = async () => {
        try {
            // Sign in using Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Fetch the admin's Firestore document using the user's uid
            const adminDocRef = doc(db, "admin", user.uid);
            const adminDocSnap = await getDoc(adminDocRef);
    
            if (adminDocSnap.exists()) {
                const adminData = adminDocSnap.data();
                console.log(adminData);
                if (!adminData.approval) {
                    // Not approved: set error, sign out and return false
                    setErrorMessage("Your account is pending approval. Please contact the administrator.");
                    await auth.signOut();
                    return false;
                }
            } else {
                setErrorMessage("No admin record found for this account.");
                await auth.signOut();
                return false;
            }
            
            setUsername("")
            setPassword("")
            setEmail("")
            // If approved, continue with login
            setSuccessMessage("Successfully logged in!");
            localStorage.setItem("admin", JSON.stringify(user));
            return true;
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage("");
            return false;
        }
    };
    
    const handleRegister = async() => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; 
            await updateProfile(user, {
                displayName: username 
            });
    
            await saveAdminData(user, username); 

            
            setUsername("")
            setPassword("")
            setEmail("")
            setSuccessMessage("Account has been created wait for pending approval...");  // Success message
            console.log("User signed up:", username, email);
            
            await auth.signOut();
        } catch (error) {
            console.log(error)
            setErrorMessage(error.message);  // Set error message if any
            setSuccessMessage("");  // Clear success message on error

        }
    }


    const value = {
        email, setEmail,
        password,setPassword,
        username, setUsername,
        errorMessage, setErrorMessage,
        successMessage, setSuccessMessage,
        currentUser,setCurrentUser,
        accBST,

        handleLogin,
        handleRegister,

        accounts, setAccounts,
        managers, setManagers,

        admins, setAdmins,
        fetchedManagers,fetchedAdmins, fetchedUsers
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
