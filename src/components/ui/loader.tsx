// src/components/ui/LoaderScreen.tsx
import React from "react";
import Spinner from "./spinner";

interface LoaderScreenProps {
  fullScreen?: boolean;
  message?: string;
  spinnerSize?: "small" | "medium" | "large";
  spinnerColor?: "primary" | "secondary" | "neutral";
  bgColor?: string;
  zIndex?: number;
  transparent?: boolean;
}

const LoaderScreen: React.FC<LoaderScreenProps> = ({
  fullScreen = true,
  message = "Loading...",
  spinnerSize = "large",
  spinnerColor = "primary",
  bgColor = "bg-transparent",
  zIndex = 50,
  transparent = false,
}) => {
  const containerClasses = fullScreen ? "fixed inset-0" : "absolute inset-0";

  const bgClasses = transparent ? "bg-opacity-70" : "bg-opacity-100";

  return (
    <div
      className={`
        ${containerClasses} 
        ${bgColor} 
        ${bgClasses}
        p-4 flex flex-col items-center justify-center
      `}
      style={{ zIndex }}
      role="alert"
      aria-busy="true"
    >
      <Spinner size={spinnerSize} color={spinnerColor} />

      {message && (
        <p className="text-center mt-4 text-gray-700 dark:text-gray-200 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoaderScreen;
