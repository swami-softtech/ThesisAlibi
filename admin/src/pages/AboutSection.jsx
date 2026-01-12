import { useEffect, useState } from "react";
import {
  fetchAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} from "../services/aboutApi";
import JoditEditor from "jodit-react";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isMission: "",
    isVision: "",
    ethics: "",
    excellence: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔄 Fetch existing data
  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const { data } = await fetchAbout();
      if (data.data.length > 0) {
        setAbout(data.data[0]);
        setFormData(data.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 📝 Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 💾 Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (about?._id) {
        await updateAbout(about._id, formData);
        alert("About section updated successfully ✅");
      } else {
        await createAbout(formData);
        alert("About section created successfully 🎉");
      }
      loadAbout();
    } catch (err) {
      alert("Something went wrong, bhai 😓");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete
  const handleDelete = async () => {
    if (!about?._id) return;
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      await deleteAbout(about._id);
      setAbout(null);
      setFormData({
        title: "",
        description: "",
        isMission: "",
        isVision: "",
        ethics: "",
        excellence: "",
      });
      alert("Deleted successfully 🗑️");
    } catch (err) {
      alert("Delete failed 😬");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">About Us Section</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your About US sections</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              placeholder="Enter section title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Description Field with JoditEditor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <JoditEditor
              value={formData.description}
              onChange={(content) => handleChange({ target: { name: 'description', value: content } })}
              config={{
                readonly: false,
                placeholder: 'Enter detailed description...',
                toolbarAdaptive: false,
                height: 300,
                style: {
                  fontFamily: 'inherit',
                },
              }}
              className="border border-gray-300 rounded-lg overflow-hidden"
            />
            <p className="mt-2 text-sm text-gray-500">Rich text editor with formatting options</p>
          </div>

          {/* Mission Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mission <span className="text-red-500">*</span>
            </label>
            <textarea
              name="isMission"
              placeholder="Enter mission statement"
              value={formData.isMission}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
              rows="4"
              required
            />
          </div>

          {/* Vision Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vision <span className="text-red-500">*</span>
            </label>
            <textarea
              name="isVision"
              placeholder="Enter vision statement"
              value={formData.isVision}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
              rows="4"
              required
            />
          </div>

          {/* Ethics Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ethics <span className="text-red-500">*</span>
            </label>
            <textarea
              name="ethics"
              placeholder="Enter ethics guidelines"
              value={formData.ethics}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
              rows="4"
              required
            />
          </div>

          {/* Excellence Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excellence <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excellence"
              placeholder="Enter excellence standards"
              value={formData.excellence}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[100px]"
              rows="4"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {about ? "Update Section" : "Create Section"}
                </>
              )}
            </button>

            {about && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete Section
              </button>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};

export default AboutSection;
