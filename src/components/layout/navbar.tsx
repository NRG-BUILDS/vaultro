import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LucideWallet, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Switch } from "../ui/switch";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Fund Interactions", href: "/interactions" },
  { label: "Create Fund", href: "/create-fund" },
  { label: "My Positions", href: "/positions" },
];

const defaultAppearance = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  animations: true,
  compactMode: false,
};

export function Navbar({
  setShowWalletPopup,
}: {
  setShowWalletPopup: (show: boolean) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [appearance, setAppearance] = useState(() => {
    const savedAppearance = localStorage.getItem("appearance");
    return savedAppearance ? JSON.parse(savedAppearance) : defaultAppearance;
  });
  const isDarkMode = appearance.theme === "dark";
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for navbar height
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Apply dark mode
    if (appearance.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply animations
    if (appearance.animations) {
      document.documentElement.classList.remove("no-animations");
    } else {
      document.documentElement.classList.add("no-animations");
    }

    // Apply compact mode
    if (appearance.compactMode) {
      document.documentElement.classList.add("compact-mode");
    } else {
      document.documentElement.classList.remove("compact-mode");
    }

    // Store settings in localStorage for persistence
    localStorage.setItem("appearance", JSON.stringify(appearance));
  }, [appearance]);

  const handleAppearanceChange = () => {
    setAppearance({
      ...appearance,
      theme: appearance.theme === "light" ? "dark" : "light",
    });
  };

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 ",
        isScrolled ? "py-3 glass-light dark:glass" : "py-6 bg-transparent"
      )}
    >
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="z-50">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isScrolled ? "text-foreground" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleAppearanceChange}
              className={`
          relative flex items-center h-8 w-16 rounded-full p-1 
          transition-colors duration-300
          ${isDarkMode ? "bg-primary" : "bg-border"}
        `}
              aria-label={
                isDarkMode ? "Activate light mode" : "Activate dark mode"
              }
            >
              {/* Sun Icon on the left */}
              <span
                className={`
            absolute left-1 text-foreground
            transition-opacity duration-300
            ${isDarkMode ? "opacity-60" : "opacity-100"}
          `}
              >
                <Sun size={18} />
              </span>

              {/* Toggle Knob */}
              <span
                className={`
            flex items-center justify-center
            h-6 w-6 rounded-full bg-white shadow-md
            transform transition-transform duration-300
            ${isDarkMode ? "translate-x-8" : "translate-x-0"}
          `}
              />

              {/* Moon Icon on the right */}
              <span
                className={`
            absolute right-2 text-primary
            transition-opacity duration-300
            ${isDarkMode ? "opacity-100" : "opacity-40"}
          `}
              >
                <Moon size={16} />
              </span>
            </button>

            <Button
              onClick={() => setShowWalletPopup(true)}
              className="rounded-full"
            >
              <LucideWallet />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-50 md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background md:hidden pt-20 px-6 flex flex-col"
          >
            <nav className="flex flex-col space-y-6 pt-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={
                    item.href.startsWith("#")
                      ? scrollToSection(item.href.substring(1))
                      : undefined
                  }
                  className="text-xl font-medium hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={handleAppearanceChange}
                className={`
          relative flex items-center h-8 w-16 rounded-full p-1 
          transition-colors duration-300
          ${isDarkMode ? "bg-primary" : "bg-border"}
        `}
                aria-label={
                  isDarkMode ? "Activate light mode" : "Activate dark mode"
                }
              >
                {/* Sun Icon on the left */}
                <span
                  className={`
            absolute left-1 text-foreground
            transition-opacity duration-300
            ${isDarkMode ? "opacity-60" : "opacity-100"}
          `}
                >
                  <Sun size={18} />
                </span>

                {/* Toggle Knob */}
                <span
                  className={`
            flex items-center justify-center
            h-6 w-6 rounded-full bg-white shadow-md
            transform transition-transform duration-300
            ${isDarkMode ? "translate-x-8" : "translate-x-0"}
          `}
                />

                {/* Moon Icon on the right */}
                <span
                  className={`
            absolute right-2 text-primary
            transition-opacity duration-300
            ${isDarkMode ? "opacity-100" : "opacity-40"}
          `}
                >
                  <Moon size={16} />
                </span>
              </button>

              <div className="flex flex-col space-y-4 pt-4">
                <Button
                  onClick={() => setShowWalletPopup(true)}
                  className="w-full rounded-full"
                >
                  Connect Wallet
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
