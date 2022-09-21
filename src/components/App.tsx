import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Component } from 'solid-js';
import { Route, Routes, useLocation } from "@solidjs/router";

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
const auth = getAuth(app);

const App: Component = () => {
  const location = useLocation()
  return (
    <div class={styles.App}>
      <Navbar auth={auth}/>
      <Routes>
        <Route path="*" element={<div>At route {location.pathname}</div>}/>
      </Routes>
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
