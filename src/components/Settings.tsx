import { useRouteData } from "@solidjs/router";
import { Component } from "solid-js";

import "./Settings.css";

type SettingsData = {
  wk_token: string;
};

const Settings: Component = () => {
  const data: SettingsData = useRouteData();
  console.log(data);

  return (
    <div class="bg-orange-500">
      <div class="max-w-2xl mx-auto">
        <aside class="w-64" aria-label="Sidebar">
          <div class="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span class="material-icons">settings</span>
                  <span class="ml-3">General</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span class="material-icons">settings</span>
                  <span class="ml-3">WaniKani</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Settings;
