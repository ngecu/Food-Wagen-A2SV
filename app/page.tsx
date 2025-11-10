'use client';

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Footer/>
    </div>
  );
}