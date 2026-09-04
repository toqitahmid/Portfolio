import About from "../about/page";
import Contact from "../contact/page";
import Projects from "../projects/page";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Skills from "../skills/page";

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section id="home" className="min-h-screen">
        <About />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
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
