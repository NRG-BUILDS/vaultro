import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import WalletPopup from "../wallet/wallet-popup";
import React from "react";

const Layout = () => {
  const [showWalletPopup, setShowWalletPopup] = React.useState(false);
  return (
    <>
      <Navbar setShowWalletPopup={setShowWalletPopup} />
      {/* Gradient Background */}
      <div className="fixed top-0 left-0 w-full h-full inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="relative z-10">
        <Outlet />
      </div>
      {/* Wallet Popup */}
      {showWalletPopup && (
        <WalletPopup onOpenChange={setShowWalletPopup} open={showWalletPopup} /> // Pass the state setter function to WalletPopup
      )}
    </>
  );
};

export default Layout;
