import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GraduationCap, Mail, Phone, MapPin, Heart } from "lucide-react";
import { API_URL } from "../../services/api";


const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Thesis Journey", href: "/workflow" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/pages`);
        setPages(res.data.data || []);
      } catch (error) {
        console.error("Failed to load pages", error);
      }
    };

    fetchPages();
  }, []);

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-secondary">
                  ThesisAlibi
                </span>
                <span className="text-xs text-primary-foreground/70">
                  Thesis Support.
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering Doctoral Scholars With Expert Guidance, Ethical Research
              Practices, And Complete Thesis Support From Admission to Final Submission.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-secondary text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies (From Pages API) */}
          <div>
            <h4 className="font-serif text-secondary text-lg font-semibold mb-6">
              Policies
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={`/faq`}
                  className="text-sm hover:text-secondary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              {pages.map((page) => (
                <li key={page._id}>
                  <Link
                    to={`/policies/${page.type.toLowerCase()}`}
                    className="text-sm hover:text-secondary transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-secondary text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span>Nashik, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a href="thesisalibi@Gmail.com.com">
                  thesisalibi@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a href="tel:+918468861109">
                  +91 84688 61109
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary">
              © {new Date().getFullYear()} ThesisAlibi. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span>Made with</span>

              <Heart className="h-4 w-4 text-red-500 fill-red-500" />

              <span>by</span>

              <Link
                to={"/devloper"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-secondary transition-colors"
              >
                Tejas Derle Patil
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
