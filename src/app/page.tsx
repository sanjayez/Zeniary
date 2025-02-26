import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroMask from "./components/common/HeroMask";
import SidekickSection from "./components/SideKick";
import GreenBlobSidekick from "./components/common/GreenBlobSidekick";
import Dashboard from "./components/Dashboard";
import Security from "./components/Security/Security";
import Privacy from "./components/Security/Privacy";
import EarlyAccess from "./components/EarlyAccess";
import Features from "./features/page";
export default function Home() {
  return (
    <div className="">
      <Hero />
      {/* <GreenBlobSidekick /> */}
      {/* <SidekickSection /> */}
      <Features />
      <Dashboard />
      {/* <GreenBlobSidekick /> */}
      <Privacy />
      <EarlyAccess />
    </div>
  );
}
