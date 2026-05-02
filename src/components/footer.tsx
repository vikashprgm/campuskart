import { Dribbble, Github, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import i from './logo_text.png'
import github from '../assets/logo/github.svg'
const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between border-t px-6 py-4 gap-5 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-emerald-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-emerald-950 dark:before:via-black dark:before:to-stone-800 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
      <Link className="flex items-center gap-2" to="/">
        <img
          src={i}
          alt="logo"
          className="h-8"
          >
        </img>
      </Link>

      <p className="font-medium text-muted-foreground text-sm">
        Made with 💗 in INDIA 🇮🇳
      </p>
      <div className="flex items-center gap-4">
        <a href="https://github.com/vikashprgm/campuskart">
          <img src={github} className="h-8 bg-white"/>
        </a>  
      </div>
      <p className="font-medium text-muted-foreground text-sm">
        Last updated {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
