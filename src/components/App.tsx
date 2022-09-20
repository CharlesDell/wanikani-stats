import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Component, createMemo } from 'solid-js';

import Navbar from './Navbar';

import logo from '../assets/logo.svg';
import styles from './App.module.css';

const firebaseConfig = {
  apiKey: "AIzaSyDyZy2Duyj8yNxAusRvy9fYbDGJ9Heg9y8",
  authDomain: "wanikani-stats-bd63d.firebaseapp.com",
  projectId: "wanikani-stats-bd63d",
  storageBucket: "wanikani-stats-bd63d.appspot.com",
  messagingSenderId: "979953928757",
  appId: "1:979953928757:web:3c4c8671ee5642cf59bf7c",
  measurementId: "G-CZBGZZRLMK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


const user = createMemo(() => {
  let u: User|null = null;
  onAuthStateChanged(auth, (user) => u = user);
  return u;
});

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Navbar user={user()}/>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
