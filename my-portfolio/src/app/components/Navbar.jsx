"use client";
// import { useState } from "react";
import { Button, Drawer, Avatar } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import NavStar from "./NavStar";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { label: "Home", address: "/ui/home" },
    { label: "Skills", address: "/ui/skills" },
    { label: "Projects", address: "/ui/projects" },
     { label: "Contact", address: "/ui/contact" },
  ];
  const NavLink = ({ item, mobile = false, index = 0 }) => {
    const isActive = pathname === item.address;
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: index * 0.05 }}
        whileHover={{ scale: 1.03 }}
      >
        <Link
          href={item.address}
          className={`flex items-center text-center whitespace-nowrap gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
            mobile ? "w-full" : "whitespace-nowrap"
          } ${
            isActive
              ? "border-b-2 border-b-yellow-300 text-primary-foreground font-semibold  shadow-sm f "
              : "text-foreground hover:bg-default"
          }`}
        >
          {item.label}
        </Link>
      </motion.div>
    );
  };
  return (
    <div className="sticky top-0 w-full z-50 border-b border-separator backdrop-blur-sm rounded-b-2xl">
      <NavStar></NavStar>
      <header className="flex h-16 items-center justify-between px-6 lg:w-9/12 md:w-11/12 w-full mx-auto">
        <div className="flex items-center justify-between gap-4">
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
                    <nav className="flex flex-col gap-5">
                      {navItems.map((item, idx) => (
                        <NavLink
                          key={item.label}
                          item={item}
                          mobile
                          index={idx}
                        />
                      ))}
                    </nav>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
          <Link href="/ui/home" className="hidden sm:flex">
            <Avatar>
              <Avatar.Image
                alt="Toqi Tahmid"
                src="https://i.ibb.co.com/ycV78Pzt/professional.png"
              />
              <Avatar.Fallback></Avatar.Fallback>
            </Avatar>
          </Link>
        </div>
        <ul className="hidden items-center gap-5 text-2xl md:flex text-yellow-400">
          {navItems.map((item, idx) => (
            <NavLink key={item.label} item={item} index={idx} />
          ))}
        </ul>

        <div className="flex justify-center items-center gap-2">
          <Link href="/ui/home" className="md:hidden">
            <Avatar>
              <Avatar.Image
                alt="Toqi Tahmid"
                src="https://i.ibb.co.com/ycV78Pzt/professional.png"
              />
              <Avatar.Fallback></Avatar.Fallback>
            </Avatar>
          </Link>
          <ThemeToggle></ThemeToggle>
        </div>
      </header>
    </div>
  );
}
