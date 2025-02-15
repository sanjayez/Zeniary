import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="h-screen w-full bg-blue-500"></div>
    </>
  );
}
