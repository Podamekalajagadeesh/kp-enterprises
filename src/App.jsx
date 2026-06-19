import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import ServiceAreas from './components/ServiceAreas.jsx';
import Testimonials from './components/Testimonials.jsx';
import ReviewForm from './components/ReviewForm.jsx';
import ContactForm from './components/ContactForm.jsx';
import BookingStatus from './components/BookingStatus.jsx';
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
      <ServiceAreas />
      <Testimonials />
      <ReviewForm />
      <ContactForm />
      <BookingStatus />
      <Footer />
    </>
  )
}

export default App