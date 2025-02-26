import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
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
