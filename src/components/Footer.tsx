import { Component } from "solid-js";

import github from "../assets/github.svg";
import styles from "./Footer.module.css";

const Footer: Component = () => {
  return (
    <footer class="text-center lg:text-left bg-gray-100 text-gray-600">
      <div class="text-center p-6 bg-gray-200">
        <span>© 2021 Copyright:</span>
        <a
          class="text-gray-600 font-semibold"
          href="https://tailwind-elements.com/"
        >
          Tailwind Elements
        </a>
        <a href="https://github.com/CharlesDell/wanikani-stats" target="_blank">
          <img src={github} class={styles.github} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
