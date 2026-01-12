import { Bell, Settings, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-primary  flex items-center justify-between px-6 border-b border-white/10">
      
      {/* LEFT - SEARCH */} 
      <div className="flex items-center w-[320px] bg-white border border-primary rounded-full px-4 py-2">
        <Search size={18} className="text-primary mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
        />
      </div>

      {/* RIGHT - ICONS & PROFILE */}
      <div className="flex items-center gap-5">
        
        {/* Notification */}
        <button className="relative p-2 rounded-full  transition">
          <Bell size={20} className="text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-full  transition">
          <Settings size={20} className="text-secondary" />
        </button>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-secondary cursor-pointer">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
