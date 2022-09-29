import { Component, createSignal } from "solid-js";
import { Link, NavLink } from "@solidjs/router";
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import "./Navbar.css";
import logo from "../assets/logo.svg";

const provider = new GoogleAuthProvider();

const Navbar: Component<{ auth: Auth }> = (props) => {
  const [user, setUser] = createSignal<User | null>(null);
  onAuthStateChanged(props.auth, (u) => setUser(u));

  return (
    <nav class="bg-white drop-shadow">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img
                class="block h-8 w-8 lg:hidden border"
                src={logo}
                alt="Your Company"
              />
              <img
                class="hidden h-8 w-8 lg:block border"
                src={logo}
                alt="Your Company"
              />
            </div>
            {user() && (
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <NavLink href="/dashboard" class="active">
                    Dashboard
                  </NavLink>
                  <NavLink href="/progress" class="inactive">
                    Progress
                  </NavLink>
                  <NavLink href="/charts" class="inactive">
                    Charts
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          {user() ? (
            <UserArea user={user()!} auth={props.auth} />
          ) : (
            <LoginArea auth={props.auth} />
          )}
        </div>
      </div>
      <MobileNavbar />
    </nav>
  );
};

export default Navbar;

const UserArea: Component<{ user: User; auth: Auth }> = ({ user, auth }) => {
  const [menuOpen, setMenuOpen] = createSignal<boolean>(false);

  return (
    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div class="relative ml-3">
        <div>
          <button
            type="button"
            class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            onClick={() => setMenuOpen(!menuOpen())}
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="h-8 w-8 rounded-full"
              src={
                user.photoURL ??
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt={user.displayName ?? ""}
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
        {menuOpen() && (
          <div
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <Link
              href={`/users/${user.uid}/settings`}
              onClick={() => setMenuOpen(false)}
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 transition-all duration-150"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
            >
              Settings
            </Link>
            <Link
              href="/"
              onClick={() => signOut(auth)}
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 transition-all duration-150"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              Sign out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginArea: Component<{ auth: Auth }> = ({ auth }) => (
  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    <button
      class="bg-blue-500 hover:bg-blue-600 text-gray-900 font-bold py-2 px-4 rounded"
      onClick={async () => await signInWithPopup(auth, provider).then()}
    >
      Log In
    </button>
  </div>
);

const MobileNavbar: Component = () => (
  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pt-2 pb-3">
      <NavLink href="/dashboard" class="active">
        Dashboard
      </NavLink>
      <NavLink href="/progress" class="inactive">
        Progress
      </NavLink>
      <NavLink href="/charts" class="inactive">
        Charts
      </NavLink>
    </div>
  </div>
);
