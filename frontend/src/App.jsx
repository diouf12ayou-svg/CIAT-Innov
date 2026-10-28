
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectForm from "./pages/ProjectForm";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);

      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth"
        });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/galerie" element={<Gallery />} />
        <Route path="/projets/:id" element={<ProjectDetail />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ajouter-projet" element={<ProjectForm />} />
      </Routes>
    </>
  );
}
