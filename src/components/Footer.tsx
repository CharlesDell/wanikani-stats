import { Component } from "solid-js";

import github from "../assets/github.svg";
import styles from "./Footer.module.css";

const Footer: Component = () => {
  return (
    <footer class="text-center lg:text-left drop-shadow bg-white text-gray-600">
      <div class="text-center flex justify-center p-6">
        <span>© 2022 Copyright:</span>
        <a
          class="text-gray-600 ml-1 font-semibold"
          href="https://github.com/CharlesDell/wanikani-stats/blob/main/LICENSE"
        >
          Charles Dell'Orto
        </a>
        <span class="mx-2"> | </span>
        <a href="https://github.com/CharlesDell/wanikani-stats" target="_blank">
          <img src={github} class={styles.github} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
