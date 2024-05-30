import Disclaimer from "./components/Disclaimer";
import HeroSection from "./components/HeroSection";
import Services from "./components/services/Services";
import Testimonials from "./components/testimonials/Testimonials";

const App = ()=>{

    return(
        <main id="container" className="mt-6">
          <HeroSection/>
          <Services/>
          <Testimonials/>
          <Disclaimer/>
        </main>
    )
}

export default App;