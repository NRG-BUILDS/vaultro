import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/brand/vaultro-lightmode.png";
import logoDark from "@/assets/brand/vaultro-darkmode.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const [variant, setVariant] = useState<"light" | "dark">("light"); // Default to light

  useEffect(() => {
    // Check the theme after mounting
    setVariant(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );

    const observer = new MutationObserver(() => {
      setVariant(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
      console.log(document.documentElement.classList);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    sm: "w-48",
    md: "w-56",
    lg: "w-56",
    xl: " w-40 md:w-56",
  };

  return (
    <div className={cn("", sizeClasses[size], className)}>
      <img
        src={variant === "dark" ? logo : logoDark}
        alt="Logo"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
