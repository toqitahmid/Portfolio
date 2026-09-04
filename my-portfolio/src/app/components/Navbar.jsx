"use client";

import { useEffect, useState } from "react";
import { Button, Drawer, Avatar } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import NavStar from "./NavStar";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const NavLink = ({ item, mobile = false, index = 0 }) => {
    const isActive = activeSection === item.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.03 }}
        className="relative"
      >
        <button
          onClick={() => scrollToSection(item.id)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors cursor-pointer ${
            mobile ? "w-full justify-start" : ""
          } ${
            isActive
              ? "font-semibold text-primary"
              : "text-foreground hover:bg-default"
          }`}
        >
          {item.label}
        </button>

        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId={mobile ? "mobile-nav" : "desktop-nav"}
              className="absolute left-0 bottom-0 h-[2px] w-full bg-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="sticky top-0 z-50 lg:w-8/12 md:w-11/12 w-11/12 mx-auto rounded-3xl m-2 border-b border-separator backdrop-blur-md">
      <NavStar />

      <header className="mx-auto flex h-16 w-full items-center justify-between px-3 sm:px-6 md:w-11/12 lg:w-9/12">
        <div className="flex items-center gap-4">
          <Drawer>
            <Button className="md:hidden" variant="secondary">
              <Menu />
            </Button>

            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />

                  <Drawer.Header>
                    <Drawer.Heading>Navigation</Drawer.Heading>
                  </Drawer.Header>

                  <Drawer.Body>
                    <LayoutGroup id="mobile-navigation">
                      <nav className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                          <NavLink
                            key={item.id}
                            item={item}
                            mobile
                            index={index}
                          />
                        ))}
                      </nav>
                    </LayoutGroup>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>

          <Link href="/">
            <Avatar className="hidden sm:flex">
              <Avatar.Image
                alt="Toqi Tahmid"
                src="https://i.ibb.co.com/ycV78Pzt/professional.png"
              />
            </Avatar>
          </Link>
        </div>

        <LayoutGroup id="desktop-navigation">
          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item, index) => (
              <NavLink key={item.id} item={item} index={index} />
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2">
          <Link href="/" className="md:hidden">
            <Avatar>
              <Avatar.Image
                alt="Toqi Tahmid"
                src="https://i.ibb.co.com/ycV78Pzt/professional.png"
              />
            </Avatar>
          </Link>

          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
