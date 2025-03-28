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
import heroimg from "../../assets/medGetLandingPage.png";
import Nelson from '../../assets/7317107.jpg';
import footerlogo from '../../assets/MedgetLogoNoBG2.png'
import headerlogowhite from '../../assets/MedgetLogoNoBG2.png'
import headerlogoblue from '../../assets/medgetNewBlueRGB.png'


const LandingPage = () => {
  const Nav = useNavigate();
  const [navBg, setNavBg] = useState("bg-blue-700 text-white");
  const [btnStyle, setBtnStyle] = useState(
    "bg-white text-blue-500 hover:bg-blue-500 hover:text-white border-none");
  const [logoSrc, setLogoSrc] = useState(headerlogowhite);
  const [navBtn, setNavBtn] = useState("hover:text-blue-100 cursor-pointer")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBg("bg-white shadow-md text-blue-700");
        setBtnStyle("bg-blue-700 text-white hover:bg-blue-800");
        setLogoSrc(headerlogoblue)
        setNavBtn("hover:text-blue-100 cursor-pointer")
      } else {
        setNavBg("bg-blue-700 text-white");
        setBtnStyle(
          "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
        );
        setLogoSrc(headerlogowhite)
        setNavBtn("hover:text-blue-500 cursor-pointer")
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
        <div className="flex items-center gap-4 mt-1.5">
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
            className="hover:text-blue-400 cursor-pointer font-bold"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-blue-400 cursor-pointer font-bold"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("mission")}
            className="hover:text-blue-400 cursor-pointer font-bold"
          >
            Mission
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-blue-400 cursor-pointer font-bold"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("blogs")}
            className="hover:text-blue-400 cursor-pointer font-bold"
          >
            Blogs
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            // className={navBtn}
            // className=""
            className="hover:text-blue-400 cursor-pointer font-bold"
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
        className="bg-gray-100 text-blue-700 py-30 px-25 max-lg:px-10 mt-16 flex flex-col md:flex-row items-center justify-between lg:gap-[20px]"
      >
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="lg:text-[55px] lg:w-100 lg:leading-15 font-bold mb-7 max-lg:text-4xl">
            Find & Manage Pharmacy Stock Easily
          </h1>
          <p className="text-[15px] mb-2 lg:w-160 max-lg:text-[16px] font-medium lg:mt-6">
            Effortlessly locate nearby pharmacies, check medicine availability, and update stock. Smart healthcare for pharmacies and customers.
          </p>
          <p className="text-[15px] mb-6 max-lg:text-[16px] font-medium lg:w-160 max">
            Our app prevents wasted trips and out-of-stock surprises; connecting pharmacies and customers instantly.
          </p>
          <div className="flex justify-center md:justify-start gap-4 ">
            <CTAButton
              text="Get Started"
              onClick={() => Nav("/selection")}
              className="border border-blue-700 text-blue-700 hover:bg-blue-600 hover:text-white lg:mt-6"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end md:mt-0">
          <img
            src={heroimg}
            alt="Pharmacy Illustration"
            className="w-full max-w-full h-auto"
          />
        </div>
      </section>
      {/* bg-[#75D1F8]  */}

      <section id="about" className="py-16 px-25 
      bg-[#DBF4FC] pb-30
      max-lg:px-10 border-1 border-[#75D1F8]">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src={aboutImg}
              alt="About MedGet"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left lg:text-cente">
            <h2 className="lg:text-5xl max-[769px]:text-3xl font-bold lg:mb-8 max-[769px]:mb-2 text-blue-700 flex justify-center">
              About MedGet
            </h2>
            <p className="text-lg text-black leading-relaxed lg:w-140  lg:px-20 flex justify-self-center text-center font-medium">
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

      <section id="mission" className="bg-white text-center lg:py-25 px-25 lg:pb-35 max-lg:px-10">
        <h2 className="lg:text-4xl font-bold lg:mb-8 text-blue-700 ">Our Mission</h2>
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

      <section id="services" className="py-25 px-25 max-lg:px-10 text-center bg-[#E6F9FF] lg:pb-40">
        <h2 className="lg:text-4xl max-[769px]:text-3xl font-bold lg:mb-16 max-[769px]:mb-4 text-blue-700">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={FaCapsules}
            title="Pharmacy Locator"
            description="Easily find the nearest pharmacy with our advanced search and location-based system."
            py='py-14'
            p='p-6'
            cardH='h-[100%]'
            cardBg='bg-[#5aa9e6]'
            h3Bottom='mb-4'
          // pTextCol='text-white'
          />
          {/* Users can quickly locate verified pharmacies in their vicinity */}
          <FeatureCard
            icon={FaWarehouse}
            title="Inventory Management"
            description="Pharmacies can manage their stock efficiently using our digital tools. "
            py='py-14'
            p='p-6'
            cardH='h-[100%]'
            cardBg='bg-[#f9f9f9]'
            h3Bottom='mb-4'
          />
          {/* Our system provides real-time tracking of medicine availability, low-stock alerts, and automated inventory updates */}

          <FeatureCard
            icon={FaClipboardList}
            title="Order Tracking"
            description="Users can check the availability of medicines before heading to a pharmacy."
            py='py-14'
            p='p-6'
            cardH='h-[100%]'
            cardBg='bg-[#7fc8f8]'
            h3Bottom='mb-4'
          />

          {/* This feature allows customers to verify if a pharmacy has their required medicine in stock, and reduce wasted trips and enhancing customer satisfaction */}
        </div>
      </section>

      <div className="mt-16 text-center py-15 lg:px-28 pb-40">
        <h3 className="lg:text-4xl font-bold text-blue-700 lg:mb-4">
          Meet the Team
        </h3>
        <p className="text-lg lg:mb-20 max-[769px]:mb-10 lg:w-180 text-center flex justify-self-center">
          MedGet is founded by two passionate individuals dedicated to
          transforming pharmacy accessibility and inventory management.
        </p>
        <div className="grid md:grid-cols-2 gap-30">
          <FeatureCard
            // className="bg-white text-xl p-6 text-blue-700 shadow-md rounded-lg text-center"
            showimg={true}
            image={Nelson}
            imgH='h-50'
            cardMb='mb-2'
            px='px-15'
            p='p-2'
            pb='pb-10'
            // cardH='h-20'
            title="Quadri Ade Nelson"
            description="An expert in healthcare technology, keen to improving pharmacy services through innovation with a tech driven mindset."
          />
          <FeatureCard
            // className="bg-white text-xl p-6 text-blue-700 shadow-md rounded-lg text-center"
            showimg={true}
            imgH='h-50'
            cardMb='mb-2'
            image={Nelson}
            px='px-20'
            p='p-2'
            pb='pb-10'
            title="Ugwu Chinedu"
            description="A tech-driven entrepreneur focused on making medicine more accessible to users and pharmacies."
          />
        </div>
      </div>

      <section id="blogs" className="bg-gray-100 text-center lg:py-28 px-25 lg:pb-40 x-lg:px-10">
        <h2 className="lg:text-4xl font-bold lg:mb-24 text-blue-700">Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={FaNewspaper}
            p='p-2'
            px='px-10'
            py='py-10'
            pb='pb-10'
            h3Bottom='mb-5'
            title="Optimizing Pharmacy Stock Management"
            description="Effective pharmacy stock management using tools like MedGet ensures real-time stock tracking, maintain patient care and minimize financial losses."
            // cardBg='bg-[#20bf55]'
            border='border-1'
            borderCol='border-[#20bf55]'
          />
          <FeatureCard
            p='p-2'
            px='px-10'
            pb='pb-10'
            py='py-10'
            h3Bottom='mb-5'
            icon={FaNewspaper}
            title="How MedGet Enhances Pharmacy Accessibility"
            description="MedGet connects users to nearby pharmacies, enabling real-time stock checks and quick access to medications, benefiting both users and pharmacies."
            // cardBg='bg-[#0b4f6c]'
            border='border-1'
            borderCol='border-[#0b4f6c]'
          />
          <FeatureCard
            p='p-2'
            px='px-10'
            pb='pb-10'
            py='py-10'
            icon={FaNewspaper}
            h3Bottom='lg:mb-5'
            title="The Role of Data Analytics in Pharmacy Operations"
            description="Data-driven decision-making in healthcare, aided by real-time analytics, identifying trends, and making informed purchasing decisions."
            // cardBg='bg-[#01baef]'
            border='border-1'
            borderCol='border-[#01baef]]'
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
          <FaPhoneAlt className="text-blue-700 text-2xl" />
          <p className="text-xl font-semibold text-gray-900">
            +234 814 868 9539 / +234 902 207 2067
          </p>
        </div>
        <CTAButton
          text="Contact Us"
          onClick={() => Nav("/contact")}
          className="text-blue-700 border-blue-700 hover:bg-gray-200 mt-10 border cursor-pointer"
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
                <FaFacebookF className="text-xl cursor-pointer" />
                <FaTwitter className="text-xl cursor-pointer" />
                <FaYoutube className="text-xl cursor-pointer" />
                <FaInstagram className="text-xl cursor-pointer" />
                <FaLinkedin className="text-xl cursor-pointer" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold ">Company</h3>
              <ul className="mt-2 space-y-2">
                <li className="hover:underline cursor-pointer">About Us</li>
                <li className="hover:underline cursor-pointer">Careers</li>
                <li className="hover:underline cursor-pointer">Articles & News</li>
                <li className='hover:underline cursor-pointer'>Legal Notice</li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold ">Support</h3>
              <ul className="mt-2 space-y-2">
                <li className="hover:underline cursor-pointer">Help Center</li>
                <li className="hover:underline cursor-pointer">My Account</li>
                <li className="hover:underline cursor-pointer">FAQ</li>
                <li className="hover:underline cursor-pointer">Contact Us</li>
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
