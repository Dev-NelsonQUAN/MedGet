import { useState, useEffect } from "react";
import {
  FaCapsules,
  FaWarehouse,
  FaPhoneAlt,
  FaClipboardList,
  FaNewspaper,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import FeatureCard from "../../ui/FeatureCard";
import CTAButton from "../../ui/CTAButton";
import MissionItem from "../../ui/missionPros";
import aboutImg from "../../assets/Adobe Express - file.png";
import missionPht1 from "../../assets/43715.jpg";
import missionPht2 from "../../assets/433.jpg";
import missionPht3 from "../../assets/43715.jpg";
import { useNavigate } from "react-router-dom";
import heroimg from "../../assets/2650.jpg";
import Nelson from '../../assets/7317107.jpg';
import footerlogo from '../../assets/MedgetLogoNoBG2.png'
import headerlogowhite from '../../assets/MedgetLogoNoBG2.png'
import headerlogoblue from '../../assets/MedgetLogoNoBG1.png'


const LandingPage = () => {
  const Nav = useNavigate();
  const [navBg, setNavBg] = useState("bg-blue-700 text-white");
  const [btnStyle, setBtnStyle] = useState(
    "bg-white text-blue-500 hover:bg-blue-500 hover:text-white border-none");
  const [logoSrc, setLogoSrc] = useState(headerlogowhite);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBg("bg-white shadow-md text-blue-700");
        setBtnStyle("bg-blue-700 text-white hover:bg-blue-800");
        setLogoSrc(headerlogoblue)
      } else {
        setNavBg("bg-blue-700 text-white");
        setBtnStyle(
          "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
        );
        setLogoSrc(headerlogowhite)
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <nav
        className={`fixed top-0 left-0 w-full p-4 px-25 max-lg:px-10 max-sm:px-4 flex justify-between items-center transition-all duration-300 ${navBg} z-50`}
      >
        {/* <img src={headerlogo} className="text-2xl font-bold cursor-pointer"/> */}
        <div className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt="Logo"
            className="w-[130px] h-auto cursor-pointer transition-all duration-300"
            onClick={() => scrollToSection("hero")}
          />
        </div>
        <div className="hidden lg:flex gap-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-blue-500"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-blue-500"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("mission")}
            className="hover:text-blue-500"
          >
            Mission
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-blue-500"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("blogs")}
            className="hover:text-blue-500"
          >
            Blogs
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-blue-500"
          >
            Contact
          </button>
        </div>
        <CTAButton
          onClick={() => Nav("/selection")}
          text="Sign Up"
          className={btnStyle}
        />
      </nav>

      <section
        id="hero"
        className="bg-white text-blue-700 py-24 px-25 max-lg:px-10 mt-16 flex flex-col md:flex-row items-center justify-between"
      >
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl font-bold mb-5 max-lg:text-4xl">
            Find & Manage Pharmacy Stock Easily
          </h1>
          <p className="text-[15px] mb-2 max-lg:text-[16px]">
            Effortlessly locate nearby pharmacies, check medicine availability, and update stock. Smart healthcare for pharmacies and customers.
          </p>
          <p className="text-[15px] mb-6 max-lg:text-[16px]">
            Our app prevents wasted trips and out-of-stock surprises; connecting pharmacies and customers instantly.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <CTAButton
              text="Get Started"
              onClick={() => Nav("/selection")}
              className="border border-blue-700 text-blue-700 hover:bg-blue-600 hover:text-white"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src={heroimg}
            alt="Pharmacy Illustration"
            className="w-full max-w-full h-auto"
          />
        </div>
      </section>

      <section id="about" className="py-16 px-25 bg-white-400 max-lg:px-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src={aboutImg}
              alt="About MedicalVe"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
              About MedGet
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              MedGet is a pharmacy locator and stock management system that
              helps users find the nearest pharmacies and allows pharmacies to
              efficiently manage their stock.
            </p>
            {/* <CTAButton
              text="Learn More"
              className="mt-6 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
            /> */}
          </div>
        </div>
      </section>

      <section id="mission" className="bg-gray-100 text-center py-16 px-25 max-lg:px-10">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionItem
            image={missionPht1}
            text="Bridging the gap between pharmacies and users."
          />
          <MissionItem
            image={missionPht2}
            text="Helping pharmacies efficiently manage stock."
          />
          <MissionItem
            image={missionPht3}
            text="Providing real-time data and analytics."
          />
        </div>
      </section>

      <section id="services" className="py-16 px-25 max-lg:px-10 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={FaCapsules}
            title="Pharmacy Locator"
            description="Easily find the nearest pharmacy with our advanced search and location-based system. Users can quickly locate verified pharmacies in their vicinity"
          />
          <FeatureCard
            icon={FaWarehouse}
            title="Inventory Management"
            description="Pharmacies can manage their stock efficiently using our digital tools. Our system provides real-time tracking of medicine availability, low-stock alerts, and automated inventory updates"
          />
          <FeatureCard
            icon={FaClipboardList}
            title="Order Tracking"
            description="Users can check the availability of medicines before heading to a pharmacy. This feature allows customers to verify if a pharmacy has their required medicine in stock, and reduce wasted trips and enhancing customer satisfaction"
          />
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">
            Meet the Team
          </h3>
          <p className="text-lg mb-6">
            MedGet is founded by two passionate individuals dedicated to
            transforming pharmacy accessibility and inventory management.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              // className="bg-white text-xl p-6 text-blue-700 shadow-md rounded-lg text-center"
              showimg={true}
              image={Nelson}
              title="Quadri Nelson"
              description="An expert in healthcare technology, committed to improving pharmacy services through innovation with a tech driven mindset."
            />
            <FeatureCard
              // className="bg-white text-xl p-6 text-blue-700 shadow-md rounded-lg text-center"
              showimg={true}
              image={Nelson}
              title="Ugwu Chinedu"
              description="A tech-driven entrepreneur focused on making medicine more accessible to users and pharmacies."
            />
          </div>
        </div>
      </section>

      <section id="blogs" className="bg-gray-100 text-center py-16 px-25 max-lg:px-10">
        <h2 className="text-3xl font-bold mb-8 text-blue-700">Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={FaNewspaper}
            title="Optimizing Pharmacy Stock Management"
            description="Effective pharmacy stock management using tools like MedGet ensures real-time stock tracking, low-stock alerts, and efficient restocking, preventing shortages to maintain patient care and minimize financial losses."
          />
          <FeatureCard
            icon={FaNewspaper}
            title="How MedGet Enhances Pharmacy Accessibility"
            description="MedGet connects users to nearby pharmacies, enabling real-time stock checks and quick access to essential medications, benefiting both users and pharmacies."
          />
          <FeatureCard
            icon={FaNewspaper}
            title="The Role of Data Analytics in Pharmacy Operations"
            description="Data-driven decision-making in healthcare, aided by real-time analytics, enables pharmacies to optimize operations by adjusting pricing strategies, identifying trends, and making informed purchasing decisions."
          />
        </div>
      </section>

      <section id="contact" className="bg-gray-200 text-center py-16 px-25 max-lg:px-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Need Assistance?
        </h2>
        <p className="text-lg mb-6">
          We are here to help. Contact us anytime for support.
        </p>
        <div className="flex justify-center gap-4">
          <FaPhoneAlt className="text-blue-700 text-4xl" />
          <p className="text-xl font-semibold text-gray-900">
            +234 814 868 9539 / +234 902 207 2067
          </p>
        </div>
        <CTAButton
          text="Contact Us"
          onClick={() => Nav("/contact")}
          className="text-blue-700 border-blue-700 hover:bg-gray-200 mt-10 border"
        />
      </section>

      <section className="bg-blue-700 text-white text-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Join MedGet Today!</h2>
      </section>

      <footer className="bg-blue-950 text-white py-8">
        <div className=" mx-auto px-4 md:px-11 lg:px-25 xl:px-25 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <img src={footerlogo} className="w-[140px]" alt="Footer Logo" />
              <p className="mt-2 max-w-xs text-center md:text-left">
                Your trusted pharmacy locator & stock management system.
              </p>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <FaFacebookF className="text-xl" />
                <FaTwitter className="text-xl" />
                <FaYoutube className="text-xl" />
                <FaInstagram className="text-xl" />
                <FaLinkedin className="text-xl" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="mt-2 space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Articles & News</li>
                <li>Legal Notice</li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="mt-2 space-y-2">
                <li>Help Center</li>
                <li>My Account</li>
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 border-t border-gray-700 pt-4 text-sm">
            &copy; {new Date().getFullYear()} MedGet. All rights reserved.
          </div>
        </div>
      </footer>


    </div>
  );
};

export default LandingPage;
