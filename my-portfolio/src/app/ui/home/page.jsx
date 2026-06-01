import About from "../about/page";
import Skills from "../skills/page";
import Contact from "../contact/page";
import Projects from "../projects/page";

const HomePage = () => {
  return (
    <div className="lg:space-y-20 md:space-y-15 space-y-8 sm:space-y-10 overflow-x-hidden">
      <About></About>
      <Skills></Skills>
      <Projects></Projects>
      <Contact></Contact>
    </div>
  );
};

export default HomePage;
