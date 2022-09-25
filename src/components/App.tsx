import { onAuthStateChanged, User } from "firebase/auth";
import { Component, createResource, createSignal, lazy } from "solid-js";
import { Navigate, Route, Routes } from "@solidjs/router";

import Footer from "./Footer";
import Navbar from "./Navbar";

import { getAllReviewStatistics } from "../functions/client";
import { Firebase } from "../firebase/firebase";

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
    async () => await getAllReviewStatistics(app.db, user)
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

const SettingsData = (user: User | null) => {
  const [data] = createResource(
    async () => await getAllReviewStatistics(app.db, user)
  );
  return data;
};

const app = Firebase.Instance;

const App: Component = () => {
  const [user, setUser] = createSignal<User | null>(null);
  onAuthStateChanged(app.auth, (u) => setUser(u));

  return (
    <div class="flex-auto flex-col">
      <Navbar auth={app.auth} />
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
              data={SettingsData(user())}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
