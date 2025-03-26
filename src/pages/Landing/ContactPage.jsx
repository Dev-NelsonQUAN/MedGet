import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import CTAButton from "../../ui/CTAButton";
import footerlogo from '../../assets/MedgetLogoNoBG2.png'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="container mx-auto max-w-3xl bg-white mb-10 p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-center text-gray-600 mb-6">
          Have a question or need assistance? Get in touch with us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          ></textarea>
          <CTAButton
            text="Send Message"
            className="w-full bg-blue-700 text-white hover:bg-blue-800"
          />
        </form>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-blue-700">
            Contact Details
          </h3>
          <div className="mt-4 space-y-2">
            <p className="flex items-center justify-center gap-2 text-gray-700">
              <FaPhoneAlt /> +234 814 868 9539 / +234 902 207 2067
            </p>
            <p className="flex items-center justify-center gap-2 text-gray-700">
              <FaEnvelope /> support@medGet.com
            </p>
            <p className="flex items-center justify-center gap-2 text-gray-700">
              <FaMapMarkerAlt /> 123 MedGet Street, Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>
<footer className="bg-blue-950 text-white py-8 px-10 sm:px-12 md:px-16 lg:px-20 xl:px-25 max-lg:px-10 max-sm:px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <img src={footerlogo} className="w-[150px] mx-auto md:mx-0" />
            <p className="mt-4 max-w-[250px] mx-auto md:mx-0 text-sm">
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
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Articles & News</li>
              <li>Legal Notice</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>My Account</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto text-center mt-8 border-t border-gray-700 pt-4 text-sm px-4">
          &copy; {new Date().getFullYear()} MedGet. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
