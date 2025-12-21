"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      // Always keep visible, just control based on scroll direction
      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(scrollYProgress.get() < 0.05); // Show at top, hide when scrolling down
      }
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.link.substring(1)); // Remove # from link
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      const offset = 80; // Offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-4 items-center justify-center space-x-8",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = activeSection === navItem.link;
          
          return (
            <a
              key={`link=${idx}`}
              href={navItem.link}
              onClick={(e) => handleClick(e, navItem.link)}
              className={cn(
                "relative items-center flex space-x-1 transition-colors duration-200",
                isActive
                  ? "dark:text-white text-black font-semibold"
                  : "dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
              {isActive && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
