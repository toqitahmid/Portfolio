import About from "../about/page";
import Skills from "../skills/page";
import Contact from "../contact/page";
import Projects from "../projects/page";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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

      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
