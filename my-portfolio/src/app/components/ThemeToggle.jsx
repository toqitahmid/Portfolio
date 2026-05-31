"use client";
import { useEffect, useState, startTransition } from "react";
import { useTheme } from "next-themes";
// import { Moon, Sun } from "lucide-react";
import {Moon, Sun} from "@gravity-ui/icons"
import { Switch } from "@heroui/react";
const ThemeToggling = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark this update as non-urgent to avoid synchronous state-update warnings
    startTransition(() => setMounted(true));
  }, []);

  const handleToggle = () => {
    if (!mounted) return;
    const root = typeof document !== "undefined" ? document.documentElement : null;
    if (root) root.classList.add("theme-transition");

    // setTheme(resolvedTheme === "dark" ? "light" : "dark");

    // Remove the transient class after the CSS transition duration
    if (root) window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  };

  return (
    <Switch onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {({ isSelected }) => (
        <>
          <Switch.Control
            className={`h-\[31px\] w-\[51px\] rounded-3xl bg-yellow-300 ${isSelected ? "" : "bg-brown-200"}`}
          >
            <Switch.Thumb
              className={`size-\[27px\] rounded-3xl bg-white shadow-sm ${isSelected ? "ms-\[22px\] shadow-lg" : ""}`}
            >
              <Switch.Icon>
                {isSelected ? (
                  <Moon className="size-4 text-black" />
                ) : (
                  <Sun className="size-4 text-yellow-700" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </>
      )}
    </Switch>
  );
};

export default ThemeToggling;
