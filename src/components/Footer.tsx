import { Component } from "solid-js";

import github from "../assets/github.svg";

const Footer: Component = () => {
  return (
    <footer class="relative text-center lg:text-left bg-stone-700 text-gray-300">
      <div class="text-center flex justify-center p-6">
        <span>© 2022 Copyright:</span>
        <a
          class="text-gray-200 ml-1 font-semibold"
          href="https://github.com/CharlesDell/wanikani-stats/blob/main/LICENSE"
          target="_blank"
        >
          Charles Dell'Orto
        </a>
        <span class="mx-2"> | </span>
        <a href="https://github.com/CharlesDell/wanikani-stats" target="_blank">
          <img src={github} class="h-6 w-6 text-gray-200" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
