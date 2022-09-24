import {
  Accessor,
  Component,
  createMemo,
  createSignal,
  For,
  JSX,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import styles from "./Navbar.module.css";

const provider = new GoogleAuthProvider();

const pathsMap = new Map<string, string>([
  ["/", "Dashboard"],
  ["/progress", "Progress"],
  ["/charts", "Charts"],
]);

const Navbar: Component<{ auth: Auth; pathname: Accessor<string> }> = (
  props
) => {
  const [user, setUser] = createSignal<User | null>(null);
  onAuthStateChanged(props.auth, (u) => setUser(u));

  return (
    <nav class="bg-gray-800">
      <div class={styles.navbar}>
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
                class="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <For each={Array.from(pathsMap.keys())}>
                  {(path) => NavLinks(path, props.pathname())}
                </For>
              </div>
            </div>
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

const NavLinks = (path: string, currentPath: string) => {
  if (path === currentPath) {
    return (
      <a href={path} class={styles.navLinkSelected} aria-current="page">
        {pathsMap.get(path)}
      </a>
    );
  }
  return (
    <a href={path} class={styles.navLinkUnselected}>
      {pathsMap.get(path)}
    </a>
  );
};

const UserArea: Component<{ user: User; auth: Auth }> = ({ user, auth }) => {
  const [menuOpen, setMenuOpen] = createSignal<boolean>(false);

  return (
    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span class="sr-only">View notifications</span>
        <svg
          class="h-6 w-6"
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
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>

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
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              Your Profile
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
            >
              Settings
            </a>
            <a
              href="/"
              onClick={() => signOut(auth)}
              class="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginArea: Component<{ auth: Auth }> = ({ auth }) => (
  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    <button
      type="button"
      class={styles.buttonPrimary}
      onClick={async () => await signInWithPopup(auth, provider)}
    >
      Log In
    </button>
  </div>
);

const MobileNavbar: Component = () => (
  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pt-2 pb-3">
      <a href="/" class={styles.mobileNavLinkSelected} aria-current="page">
        Dashboard
      </a>
      <a href="/progress" class={styles.mobileNavLinkUnselected}>
        Progress
      </a>
      <a href="/charts" class={styles.mobileNavLinkUnselected}>
        Charts
      </a>
    </div>
  </div>
);
