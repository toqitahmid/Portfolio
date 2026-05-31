import About from '../about/page';
import Skills from '../skills/page';
import Experience from '../experience/page';
import Contact  from '../contact/page';
import Projects from '../projects/page';

const HomePage = () => {
    return (
        <div className='lg:space-y-20 md:space-y-15 space-y-10'>
        <About></About>
        <Skills></Skills>
        <Projects></Projects>
        <Experience></Experience>
        <Contact></Contact>
        </div>
    );
};

export default HomePage;