import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

/**
 * Saves a customer query directly to Cloud Firestore in the 'customer_queries' collection.
 * @param {Object} queryData
 * @param {string} queryData.name
 * @param {string} queryData.contactNumber
 * @param {string} queryData.email
 * @param {string} queryData.message
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
export async function submitCustomerQuery({ name, contactNumber, email, message }) {
  try {
    const createdAt = new Date().toISOString();
    const docData = {
      name: (name || '').trim(),
      contactNumber: (contactNumber || '').trim(),
      email: (email || '').trim(),
      message: (message || '').trim(),
      createdAt
    };

    const docRef = await addDoc(collection(db, 'customer_queries'), docData);
    return { success: true, id: docRef.id, createdAt };
  } catch (error) {
    console.error('Error saving query to Firestore:', error);
    return { 
      success: false, 
      error: error?.message || 'Failed to submit query to Firebase Cloud Firestore. Please check your connection.' 
    };
  }
}

export { app };

