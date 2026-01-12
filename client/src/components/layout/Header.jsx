import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../../assets/logo.svg"
import Title from "../../assets/title.svg"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "WorkFlow", href: "/workflow" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b py-2 border/50 bg-primary">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl  transition-transform group-hover:scale-105">
            <img src={Logo} alt="logo" className="w-full" />
          </div>
          <div className="flex flex-col">
            {/* <span className="font-serif text-xl font-bold text-secondary">ThesisAlibi</span> */}
            <img src={Title} alt="logo" className=" w-40" />
            <span className="text-xs text-white">A Medical PG Thesis Research Firm</span>
          </div>
        </Link>



        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-1 text-white">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="nav"
                  size="sm"
                  className={location.pathname === link.href ? "text-secondary" : ""}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* <Link to="/login">
            <Button className={`bg-secondary`} size="default">
              Login
            </Button>
          </Link> */}

          <Link to="/register">
            <Button className={`bg-secondary`} size="default">
              Register/Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6 text-secondary" /> : <Menu className="h-6 w-6 text-secondary" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden text-white border-t border-border bg-primary"
          >
            <nav className="container mx-auto flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${location.pathname === link.href ? "text-secondary" : ""}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className={`bg-secondary w-full`} size="default">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className={`bg-secondary w-full`} size="default">
                    Register
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
