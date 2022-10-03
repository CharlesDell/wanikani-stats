import { Component, createSignal, lazy } from "solid-js";
import { Firebase } from "../firebase/firebase";
import { Navigate, Route, Routes } from "@solidjs/router";
import { onAuthStateChanged, User } from "firebase/auth";

import Footer from "./Footer";
import Navbar from "./Navbar";

import { ChartsData } from "../utils/data/chartsData";
import { dashboardData } from "../utils/data/dashboardData";
import { HeroData } from "../utils/data/heroData";
import { ProgressData } from "../utils/data/progressData";
import { SettingsData } from "../utils/data/settingsData";

const Charts = lazy(() => import("./Charts"));
const Dashboard = lazy(() => import("./Dashboard"));
const Hero = lazy(() => import("./Hero"));
const Progress = lazy(() => import("./Progress"));
const Settings = lazy(() => import("./Settings"));

const app = Firebase.Instance;

const App: Component = () => {
  const [user, setUser] = createSignal<User | null>(null);
  onAuthStateChanged(app.auth, (u) => setUser(u));

  return (
    <div class="flex-auto flex-col">
      <Navbar auth={app.auth} />
      <main class="md:w-4/5 sm:w-full h-auto mx-auto bg-white">
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
          <Route path="/dashboard" component={Dashboard} data={dashboardData} />
          <Route path="/progress" component={Progress} data={ProgressData} />
          <Route path="/charts" component={Charts} data={ChartsData} />
          <Route path="/settings" component={Settings} data={SettingsData} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
