import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/button";
import Input from "../../components/Input";
import { Label } from "../../components/ui/label";
import { createProfile } from "../../services/profileApi";


const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
  <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl transform transition-all duration-300 animate-scaleIn">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-3xl">🎉</span>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Profile Created Successfully!
    </h2>

    <p className="text-gray-600 mb-8 leading-relaxed">
      Your profile has been created successfully.
      Our team will be in touch with you soon.
    </p>

    <button
      onClick={onClose}
      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
    >
      Got it!
    </button>
  </div>
</div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isAdmissionConfirmed, setIsAdmissionConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    collegeName: "",
    universityName: "",
    dateOfAdmission: "",
    synopsisSubmissionDate: "",
    whatsappNumber: "",
    alternateNumber: "",
    email: state?.email || "",
  });

  useEffect(() => {
    if (!state?.email) {
      toast.error("Email missing. Please login again.");
      navigate("/login");
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createProfile(formData);

      toast.success("Profile saved successfully 🎉");
      setShowSuccessModal(true); // ✅ modal open
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save profile"
      );
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold">Create Your Profile</h1>
          <p className="text-slate-600 mt-2">
            Fill in your details to get started
          </p>
        </div>


        {/* Form */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Personal Info */}
            <section className="space-y-4">
              <h4 className="font-semibold border-b pb-2">
                Personal Information
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <Input id="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} />
                <Input id="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} />
              </div>
            </section>

            {/* Academic Info */}
            <section className="space-y-4">
              <h4 className="font-semibold border-b pb-2">
                Academic Information
              </h4>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAdmissionConfirmed}
                  onChange={(e) => setIsAdmissionConfirmed(e.target.checked)}
                />
                Admission confirmed
              </label>

              <div className={`grid md:grid-cols-2 gap-4 ${!isAdmissionConfirmed && "opacity-50"}`}>
                <Input id="collegeName" placeholder="College Name" disabled={!isAdmissionConfirmed} value={formData.collegeName} onChange={handleChange} />
                <Input id="universityName" placeholder="University Name" disabled={!isAdmissionConfirmed} value={formData.universityName} onChange={handleChange} />
                <Input id="dateOfAdmission" type="date" disabled={!isAdmissionConfirmed} value={formData.dateOfAdmission} onChange={handleChange} />
                <Input id="synopsisSubmissionDate" type="date" disabled={!isAdmissionConfirmed} value={formData.synopsisSubmissionDate} onChange={handleChange} />
              </div>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h4 className="font-semibold border-b pb-2">
                Contact Information
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <Input id="whatsappNumber" placeholder="WhatsApp Number" required value={formData.whatsappNumber} onChange={handleChange} />
                <Input id="alternateNumber" placeholder="Alternate Number" value={formData.alternateNumber} onChange={handleChange} />
              </div>
            </section>

            {/* Email */}
            <section>
              <Label>Email</Label>
              <Input id="email" value={formData.email} disabled />
            </section>

            {/* Submit */}
            <Button type="submit" variant="gold" size="lg" disabled={isLoading} className="w-full">
              {isLoading ? "Saving..." : "Save Profile"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/"); // ✅ Home page
          }}
        />

      </div>
    </div>
  );
};

export default Profile;
