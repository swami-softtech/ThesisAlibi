import { useState, useRef, useEffect } from "react";
import { Search, LogOut } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      toast.success(`Searching for: ${searchQuery}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-primary flex items-center justify-between px-4 md:px-6 border-b border-white/10 sticky top-0 z-50">
      
      {/* LEFT - SEARCH */}
      <div className="flex-1 max-w-lg">
        <form onSubmit={handleSearch} className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </form>
      </div>

      {/* RIGHT - PROFILE & LOGOUT */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Mobile Search Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
          onClick={() =>
            document.querySelector('input[placeholder="Search..."]')?.focus()
          }
        >
          <Search size={20} className="text-secondary" />
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 transition"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-secondary">
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>

        {/* Logout (desktop only) */}
        <div className="hidden md:block">
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="flex bg-red-600 hover:bg-red-700 items-center gap-2"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
