import { db } from './firebase'; // Ensure that db is imported
import { collection, addDoc, getDocs } from "firebase/firestore";

// Function to fetch all boards from Firestore (🟢 Now includes document ID)
const fetchUserBoards = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "boards"));
        const boards = querySnapshot.docs.map(doc => ({
            id: doc.id, // 🟢 Include Firestore document ID
            ...doc.data()
        }));
        return boards;
    } catch (error) {
        console.error("Error fetching boards: ", error);
        return [];
    }
};

const fetchUserAccs = async() => {
    try {
        const querySnapshot = await getDocs(collection(db,'account'));
        const accs =  querySnapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        }))
        return accs
    } catch (error) {
        console.error("Error fetching Accounts:", error);
    }
}

const fetchManagerAccs = async() => {
    try {
        const querySnapshot = await getDocs(collection(db,'manager'));
        const managers =  querySnapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        }))
        return managers
    } catch (error) {
        console.error("Error fetching Accounts:", error);
    }
}

const fetchAdminAccs = async() => {
    try {
        const querySnapshot = await getDocs(collection(db,'admin'));
        const admins =  querySnapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        }))
        return admins
    } catch (error) {
        console.error("Error fetching Accounts:", error);
    }
}

export { fetchUserBoards, fetchUserAccs, fetchManagerAccs, fetchAdminAccs };
