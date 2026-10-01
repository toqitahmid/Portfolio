import dynamic from "next/dynamic";
import { Suspense } from "react";
import About from "../about/page";
import Projects from "../projects/page";
import ProjectGridSkeleton from "../projects/ProjectGridSkeleton";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const Skills = dynamic(() => import("../skills/page"), { ssr: true });
const Contact = dynamic(() => import("../contact/page"), { ssr: true });

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section id="home" className="min-h-screen">
        <About />
      </section>

      <section id="projects" className="min-h-screen">
        <Suspense fallback={<ProjectGridSkeleton count={2} />}>
          <Projects />
        </Suspense>
      </section>
      
      <section id="skills" className="min-h-screen">
        <Skills />
      </section>
      
    
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
