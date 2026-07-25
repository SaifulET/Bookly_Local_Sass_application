"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isLoggedIn");
      if (saved === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleSetIsLoggedIn = (val: boolean) => {
    setIsLoggedIn(val);
    localStorage.setItem("isLoggedIn", val ? "true" : "false");
  };

  return (
    <Navbar
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={handleSetIsLoggedIn}
      selectedLanguage={selectedLanguage}
      setSelectedLanguage={setSelectedLanguage}
    />
  );
}
