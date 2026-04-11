import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-royal-blue text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-soft-gold font-bold text-lg mb-3">
            CXO Orbit Global
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The world's most trusted CXO community platform for collaboration,
            innovation, and leadership excellence.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-soft-gold">Events</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/events" className="hover:text-soft-gold">
                All Events
              </Link>
            </li>
            <li>
              <Link
                to="/events?type=conference"
                className="hover:text-soft-gold"
              >
                Conferences
              </Link>
            </li>
            <li>
              <Link
                to="/events?type=roundtable"
                className="hover:text-soft-gold"
              >
                Roundtables
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-soft-gold">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/about" className="hover:text-soft-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/advisory-board" className="hover:text-soft-gold">
                Advisory Board
              </Link>
            </li>
            {/* <li>
              <Link to="/insights" className="hover:text-soft-gold">
                Insights & Media
              </Link>
            </li> */}
            <li>
              <Link to="/contact" className="hover:text-soft-gold">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-soft-gold">Partners</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/sponsors" className="hover:text-soft-gold">
                Partners
              </Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-soft-gold">
                CXO Community
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-800 py-4 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center gap-4 text-white text-xs">
          {/* LEFT TEXT */}
          <p className="text-center md:text-left text-white text-xs">
            Copyright © 2026 Cxo Orbit Global. All rights reserved.
            &nbsp;|&nbsp;
            <Link
              to="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-soft-gold"
            >
              Privacy Policy
            </Link>
            &nbsp;|&nbsp;
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-soft-gold"
            >
              Terms of Use
            </Link>
          </p>

          {/* RIGHT SOCIAL ICONS (LIKE IMAGE) */}
          <div className="flex gap-3">
            {/* LinkedIn */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:border-soft-gold hover:text-soft-gold cursor-pointer transition">
              <FaLinkedinIn size={14} />
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919881230663"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:border-soft-gold hover:text-soft-gold cursor-pointer transition"
            >
              <FaWhatsapp size={14} />
            </a>

            {/* Facebook */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:border-soft-gold hover:text-soft-gold cursor-pointer transition">
              <FaFacebookF size={14} />
            </div>

            {/* Instagram */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:border-soft-gold hover:text-soft-gold cursor-pointer transition">
              <FaInstagram size={14} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
