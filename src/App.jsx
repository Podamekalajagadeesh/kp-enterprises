import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <>
      <Navigation />
      <Hero />
      <Services />
      <WhyChooseUs />
      <ContactForm />
      <Footer />
    </>
  )
}

export default App