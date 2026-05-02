"use client";

import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "#/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "#/components/ui/navigation-menu";
import { cn } from "#/lib/utils";
import { Menu, X } from 'lucide-react';
import Logo from "#/assets/logo/logo";
import { Button } from "#/components/ui/button";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "#/components/ThemeToggle";
import i from '#/components/logo_text.png'

export type NavigationSection = {
  title: string;
  href: string;
  isActive?: boolean;
};


const CollaborateButton = ({ className }: { className?: string }) => (
  <a href="https://github.com/vikashprgm/campuskart">
  <Button className={cn("relative text-sm font-medium rounded-full h-10 group w-fit overflow-hidden", className, "cursor-pointer")}>
      Contribute
    <ArrowUpRight size={16} />
  </Button>
  </a>
);

const navigationData: NavigationSection[] = [
    {
      title: "Home",
      href: "#",
      isActive: true,
    },
    {
      title: "Login",
      href: "/login",
    },
    {
      title: "Signup",
      href: "/signup",
    },    
    {
      title: "About us",
      href: "/about",
    },
    {
      title: "Feedback/Report",
      href: "/feedback",
    },
  ];

  
const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={cn(
        "inset-x-0 z-50 px-4 flex items-center justify-center sticky top-0 h-20",
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
          sticky
            ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
            : "bg-transparent border-transparent",
        )}
      >
        {/* Logo */}
        <div>
          <a href="/">
            <img src={i} className="h-8" />
          </a>
        </div>
        {/* Desktop Navigation */}
        <ThemeToggle/>
        <div>
          <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full">
            <NavigationMenuList className="flex gap-0">
              {navigationData.map((navItem) => (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuLink
                    href={navItem.href}
                    className={cn("px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal", navItem.isActive ? "bg-background text-foreground" : "")}
                  >
                    {navItem.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA */}
        <div className="flex gap-4">
          <CollaborateButton className="hidden lg:flex" />

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger id="mobile-menu-trigger">
                <span className="rounded-full border border-border p-2 block">
                  <Menu
                    width={20}
                    height={20}
                  />
                  <span className="sr-only">Menu</span>
                </span>
              </SheetTrigger>

              <SheetContent
                showCloseButton={false}
                side="right"
                className="w-full sm:w-96 p-0 border-l-0"
              >
                <div className="flex items-center justify-between p-6">
                  <a href="#">
                    <Logo className="gap-2" />
                  </a>
                  <SheetClose id="mobile-menu-close">
                    <span className="rounded-full border border-border p-2.5 block">
                      <X width={16} height={16} />
                    </span>
                  </SheetClose>
                </div>

                <div className="flex flex-col gap-12 px-6 pb-6 overflow-y-auto">
                  <div className="flex flex-col gap-8">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <NavigationMenu
                      orientation="vertical"
                      className="items-start flex-none"
                    >
                      <NavigationMenuList className="flex flex-col items-start gap-3">
                        {navigationData.map((item) => (
                          <NavigationMenuItem key={item.title}>
                            <NavigationMenuLink
                              href={item.href}
                              className={cn(
                                "group/nav flex items-center text-2xl font-semibold tracking-tight transition-all p-0 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent",
                                item.isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:translate-x-2",
                              )}
                            >
                              <div
                                className={cn(
                                  "h-0.5 bg-primary transition-all duration-300 overflow-hidden",
                                  item.isActive
                                    ? "w-4 mr-2 opacity-100"
                                    : "w-0 opacity-0 group-hover/nav:w-4 group-hover/nav:mr-2 group-hover/nav:opacity-100",
                                )}
                              />
                              {item.title}
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>

                    <div className="w-fit">
                      <CollaborateButton />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;