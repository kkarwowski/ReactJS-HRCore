import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateEmail,
  signOut,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetUserPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }
  const [isAdmin, setIsAdmin] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      const associateCollectionRef = doc(db, "Users", user.uid);
      getDoc(associateCollectionRef).then((result) => {
        setUserData(result.data());
        setIsAdmin(result.data().Role === "Admin");
      });
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    isAdmin,
    setUserData,
    login,
    signup,
    logout,
    resetUserPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
