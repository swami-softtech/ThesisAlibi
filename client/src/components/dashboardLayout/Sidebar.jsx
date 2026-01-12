import {
  ChevronDown,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Package,
  PenTool,
  ShieldCheck,
  Workflow
} from "lucide-react";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo.svg";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(true);
  const [openPolicies, setOpenPolicies] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (!open) setOpenPolicies(false);
  }, [open]);

  const menuMain = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { label: "Blog", icon: <PenTool />, path: "/blog" },
    { label: "WorkFlow", icon: <Workflow />, path: "/workflow" },
    { label: "Packages", icon: <Package />, path: "/packages" },
    { label: "About Us", icon: <Package />, path: "/about" },
    { label: "Achievements", icon: <Package />, path: "/achievements " },
    { label: "Get in Touch", icon: <MessageCircle />, path: "/contact" },
    { label: "FAQ", icon: <FileText />, path: "/faq" },
    { label: "Policies", icon: <ShieldCheck />, path: "/policies" },
  ];

  return (
    <div
      className={`h-screen ${
        open ? "w-72" : "w-20"
      } bg-primary border-r border-black/30 shadow-xl flex flex-col transition-all duration-300`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 min-h-[80px]">
        {open ? (
          <img src={LOGO} alt="logo" className="w-[50%]" />
        ) : (
          <div className="w-6 h-6 bg-secondary rounded-full"></div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-orange-500/20"
        >
          <Menu className="text-white" />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-3 sidebar-scroll">
        {menuMain.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer mb-1 transition
              ${
                isActive(item.path)
                  ? "bg-secondary text-black font-semibold"
                  : "text-gray-300 hover:bg-secondary/20 hover:text-white"
              }
              ${!open ? "justify-center" : ""}`}
          >
            <span className="text-lg">{item.icon}</span>
            {open && <span className="text-sm font-medium">{item.label}</span>}
          </div>
        ))}

        {/* POLICIES */}
        <div className="mt-2">
          <div
            onClick={() => setOpenPolicies(!openPolicies)}
            className={`flex items-center ${
              open ? "justify-between" : "justify-center"
            } p-3 rounded-xl cursor-pointer text-gray-300 hover:bg-orange-500/20 hover:text-white`}
          >
            
          </div>
        </div>
      </div>

      {/* MINIMIZED INDICATOR */}
      {!open && (
        <div className="absolute bottom-4 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      )}
    </div>
  );
}
