import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  Component,
  createMemo,
  createResource,
  createSignal,
  lazy,
} from "solid-js";
import { Navigate, Route, Routes, useLocation } from "@solidjs/router";
import { fetchUserDashboard } from "../utils/firestore-utils";

import Footer from "./Footer";
import Navbar from "./Navbar";

import styles from "./App.module.css";

const Hero = lazy(() => import("./Hero"));
const Dashboard = lazy(() => import("./Dashboard"));
const Progress = lazy(() => import("./Progress"));
const Charts = lazy(() => import("./Charts"));

const HeroData = () => {
  // const [hero] = createResource(() => import("../assets/hero.png"));
  // return hero;
};

const DashboardData = (user: User | null) => {
  const [dashboardData] = createResource(
    () => user?.getIdToken(),
    fetchUserDashboard
  );
  return dashboardData;
};

const ProgressData = (user: User | null) => {
  // const [hero] = createResource(() => import("../assets/hero.png"));
  // return hero;
};

const ChartsData = (user: User | null) => {
  // const [hero] = createResource(() => import("../assets/hero.png"));
  // return hero;
};

const firebaseConfig = {
  apiKey: "AIzaSyDyZy2Duyj8yNxAusRvy9fYbDGJ9Heg9y8",
  authDomain: "wanikani-stats-bd63d.firebaseapp.com",
  projectId: "wanikani-stats-bd63d",
  storageBucket: "wanikani-stats-bd63d.appspot.com",
  messagingSenderId: "979953928757",
  appId: "1:979953928757:web:3c4c8671ee5642cf59bf7c",
  measurementId: "G-CZBGZZRLMK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App: Component = () => {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  const [user, setUser] = createSignal<User | null>(null);
  onAuthStateChanged(auth, (u) => setUser(u));

  return (
    <div class={styles.App}>
      <Navbar auth={auth} />
      <main>
        <Routes>
          {user() ? (
            <Route path="/">
              <Navigate href="/dashboard" />
            </Route>
          ) : (
            <Route path="/">
              <Navigate href="/home" />
            </Route>
          )}
          <Route path="/">
            <Navigate href={user() ? "/dashboard" : "/home"} />
          </Route>
          <Route path="/home" component={Hero} data={HeroData} />
          <Route
            path="/dashboard"
            component={Dashboard}
            data={() => DashboardData(user())}
          />
          <Route
            path="/progress"
            component={Progress}
            data={() => ProgressData(user())}
          />
          <Route
            path="/charts"
            component={Charts}
            data={() => ChartsData(user())}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
