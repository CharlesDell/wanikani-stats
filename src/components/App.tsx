import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import {
  Component,
  createMemo,
  createResource,
  createSignal,
  lazy,
} from "solid-js";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  Location,
} from "@solidjs/router";
import { fetchUserDashboard } from "../utils/firestore-utils";

import Footer from "./Footer";
import Navbar from "./Navbar";

import styles from "./App.module.css";
import { getAllReviewStatistics } from "../functions/functions";

const Hero = lazy(() => import("./Hero"));
const Dashboard = lazy(() => import("./Dashboard"));
const Progress = lazy(() => import("./Progress"));
const Charts = lazy(() => import("./Charts"));
const Settings = lazy(() => import("./Settings"));

const HeroData = () => {
  // const [hero] = createResource(() => import("../assets/hero.png"));
  // return hero;
};

const DashboardData = (user: User | null) => {
  const [data] = createResource(
    async () => await getAllReviewStatistics(db, user)
  );
  return data;
};

const ProgressData = (user: User | null) => {
  // const [hero] = createResource(() => import("../assets/hero.png"));
  // return hero;
};

const ChartsData = (user: User | null) => {
  // const [hero] = createResource(() => import("../assets/hero.png"));
  // return hero;
};

const SettingsData = (db: Firestore, user: User | null) => {
  const [data] = createResource(
    async () => await getAllReviewStatistics(db, user)
  );
  return data;
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
const db = getFirestore(app);

const App: Component = () => {
  const [user, setUser] = createSignal<User | null>(null);
  onAuthStateChanged(auth, (u) => setUser(u));

  return (
    <div class="flex-auto flex-col">
      <Navbar auth={auth} />
      <main class="grow">
        <div class="md:w-4/5 sm:w-full mx-auto">
          <Routes>
            {user() ? (
              <Route path="/">
                <Navigate href="/dashboard" />
              </Route>
            ) : (
              <Route path="*">
                <Navigate href="/" />
              </Route>
            )}
            <Route path="/" component={Hero} data={HeroData} />
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
            <Route
              path="/users/:id/settings"
              component={Settings}
              data={SettingsData(db, user())}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
