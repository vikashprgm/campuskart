"use client";
import { Button } from "#/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import "@fontsource/instrument-serif/400-italic.css";
import { Link } from "@tanstack/react-router";
import Footer from "#/components/footer";
import { toast } from "sonner";

export type AvatarList = {
  image: string;
};

type HeroSectionProps = {
  avatarList: AvatarList[];
};

const FLOATING_ITEMS = [
  { emoji: "🎸", label: "Guitar", top: "12%", left: "6%", rotate: "-12deg", delay: 0 },
  { emoji: "💻", label: "Laptop", top: "18%", right: "7%", rotate: "8deg", delay: 0.1 },
  { emoji: "📚", label: "Books", bottom: "30%", left: "4%", rotate: "6deg", delay: 0.2 },
  { emoji: "🛵", label: "Scooty", bottom: "28%", right: "5%", rotate: "-8deg", delay: 0.15 },
];

function HeroSection() {
  return (
    <section className="overflow-hidden">
      <div className="w-full h-full relative">
        <div className="relative w-full pt-0 md:pt-16 pb-6 md:pb-12 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-emerald-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-emerald-950 dark:before:via-black dark:before:to-stone-800 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-4xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-5 gap-4">

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full"
                >
                  <span>🎓</span>
                  <span>Made for BTech students, by BTech students</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="lg:text-8xl md:text-7xl text-5xl font-medium leading-tight md:leading-20 lg:leading-24 flex flex-col"
                  >
                  <span>
                    Don't dump it,
                  </span>
                  <span
                    style={{ fontFamily: '"Instrument Serif"', fontStyle: "italic" }}
                    className="tracking-tight text-emerald-600 dark:text-emerald-400"
                  >
                    donate or sell it.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="text-base font-normal max-w-xl text-muted-foreground"
                >
                  Helping seniors clear their baggage and juniors find their essentials. Like that {' '}
                  <span className="text-foreground font-medium">
                    BS Grewal we never looked at again.
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 text-xs px-4 py-2 rounded-full"
                >
                  <span className="font-medium">
                    It takes just 2 minutes to signup and post
                  </span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center flex-col md:flex-row justify-center gap-6"
              >
                <Link to="/products">
                <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-amber-500 hover:bg-amber-400"
                  onClick={()=>{
                    toast.info('Wait, Loading' , {duration : 1000})
                  }}
                >
                  <span className="relative z-10 transition-all duration-500">
                    Get Started
                  </span>
                  <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </Button>
                </Link>

                {/* Social proof */}
                {/* <div className="flex items-center sm:gap-5 gap-3">
                  <ul className="flex flex-row items-center">
                    {avatarList.map((avatar, index) => (
                      <li key={index} className="-mr-2 z-1">
                        <img
                          src={avatar.image}
                          alt="Avatar"
                          width={36}
                          height={36}
                          className="rounded-full border-2 border-white dark:border-gray-900"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="gap-0.5 flex flex-col items-start">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} className="text-amber-400 text-sm">★</span>
                      ))}
                    </div>
                    <p className="sm:text-xs text-xs font-normal text-muted-foreground">
                      Trusted by 500+ students
                    </p>
                  </div>
                </div> */}
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex items-center justify-center gap-8 pt-2"
              >
                {[
                  { value: "₹0", label: "to list your item" },
                  { value: "2 min", label: "to post a listing" },
                  { value: "100%", label: "college-only buyers" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;