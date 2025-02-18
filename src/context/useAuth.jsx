// useAuth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utility/firebase'; // Import providers
import { saveAdminData } from '../utility/admin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { fetchManagerAccs } from '../utility/activity';

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

    const [managers,setManagers] = useState([])
    const [accounts,setAccounts] = useState([])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchManagers = async() => {
            const managers = await fetchManagerAccs();
            setManagers(managers)
        }

        fetchManagers();
    },[])

    const handleLogin = async () => {
        try {
            // Sign user in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the user object from the login response
    
            // Successfully logged in
            setSuccessMessage("Successfully logged in!");  // Success message
            console.log("User signed in:", email);
    
            // Save user data to localStorage (ensure to save the correct user object)
            localStorage.setItem("admin", JSON.stringify(user));
    
            // Redirect to the dashboard page
        } catch (error) {
            setErrorMessage(error.message);  // Set error message if any
            setSuccessMessage("");  // Clear success message on error
        }
    };

    const handleRegister = async() => {
        try {
            // Create user with Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Get the user object from the signup response
    
            // Update the user's displayName with the username entered by the user
            await updateProfile(user, {
                displayName: username // This sets the displayName to the username
            });
    
            // Now that we have the user, save to Firestore
            await saveAdminData(user, username); // Pass the correct user object and username
            await auth.signOut();
    
            setUsername("")
            setPassword("")
            setEmail("")
            setSuccessMessage("Account has been created wait for pending approval...");  // Success message
            console.log("User signed up:", username, email);
            
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

        handleLogin,
        handleRegister,

        accounts, setAccounts,
        managers, setManagers
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
