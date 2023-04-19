import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyDzq5MuQqfqO8IxaWT4bCkKddk5RzYgBpM",

  authDomain: "user-signup-8fc30.firebaseapp.com",

  projectId: "user-signup-8fc30",

  storageBucket: "user-signup-8fc30.appspot.com",

  messagingSenderId: "710144174087",

  appId: "1:710144174087:web:0e3105caedc27b40d422a2",

  measurementId: "G-2LGKVL6YL8"

};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      setUser(firebase.auth().currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setUser(firebase.auth().currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginWithEmail = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(firebase.auth().currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <p>Hello World</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <button onClick={handleLogin}>Login with Google</button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup(e.target.email.value, e.target.password.value);
            }}
          >
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Sign Up with Email</button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginWithEmail(
                e.target.email.value,
                e.target.password.value
              );
            }}
          >
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Log In with Email</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
