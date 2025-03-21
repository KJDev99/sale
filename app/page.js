"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Kategory from "../components/Kategory";
import Things from "../components/Things";
import Market from "../components/Market";
import About from "../components/About";
import News from "./news/page";
import Search from "../components/Search";




export default function Home() {
  return (
    <div className="main">
      <Navbar />
      <Kategory />
      <Things />
      <Market />
      <About />
    </div>
  );
}
