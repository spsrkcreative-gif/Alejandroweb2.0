import IdentityCarousel from './components/IdentityCarousel';
import { ScrollProgress } from './components/ScrollProgress';
import { Nav } from './components/Nav';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { MarketingIA } from './components/MarketingIA';
import { Experience } from './components/Experience';
import { MoreThanMarketing } from './components/MoreThanMarketing';
import { CTAFinal, Contact } from './components/CTAContact';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <IdentityCarousel standalone={false} />
        <About />
        <Services />
        <Projects />
        <Process />
        <MarketingIA />
        <Experience />
        <MoreThanMarketing />
        <CTAFinal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
