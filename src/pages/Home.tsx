import { useState, useEffect } from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';
import LoadingScreen from '../components/LoadingScreenStripes';

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      // setLoading(false); // LoadingScreen will call handleFinishLoading
      // document.body.classList.add('loaded');
    }, 500); // Adjust time as needed or use actual asset loading
    return () => clearTimeout(timer);
  }, []);

  const handleFinishLoading = () => {
    setLoading(false);
    document.body.classList.add('loaded'); // Optional: if you have global styles for loaded state
  };

  return (
    <>
      {loading && <LoadingScreen onFinishLoading={handleFinishLoading} />}
      <div>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="contact"><Contact /></section>
      </div>
    </>
  );
};

export default Home;
