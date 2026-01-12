import { useEffect, useState } from "react";
import { getFaqs, createFaq, deleteFaq, updateFaq } from "../services/faqApi";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiAlertTriangle, FiEdit } from "react-icons/fi";
import DeleteModal from "../components/DeleteModal";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const loadFaqs = async () => {
    try {
      const res = await getFaqs();
      setFaqs(res.data.data);
    } catch (error) {
      console.error("Error loading FAQs:", error);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Open Add Modal
  const openAddModal = () => {
    resetForm();
    setShowFormModal(true);
  };

  // Reset Form
  const resetForm = () => {
    setForm({ question: "", answer: "" });
    setEditingId(null);
  };

  // Cancel Edit/Close Modal
  const cancelEdit = () => {
    resetForm();
    setShowFormModal(false);
  };

  // Edit Handler
  const editHandler = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id);
    setShowFormModal(true);
  };

  // Delete Handler
  const deleteHandler = (faq) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!faqToDelete) return;

    setLoading(true);
    try {
      await deleteFaq(faqToDelete._id);
      await loadFaqs();
      setShowDeleteModal(false);
      setFaqToDelete(null);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  // Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateFaq(editingId, form);
      } else {
        await createFaq(form);
      }

      resetForm();
      setShowFormModal(false);
      await loadFaqs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">FAQs Manager</h1>
            <p className="text-gray-600 text-sm mt-1">Manage frequently asked questions</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            <FiPlus className="w-5 h-5" />
            Add New FAQ
          </button>
        </div>

        {/* FAQ Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary text-secondary text-left text-xs font-medium  uppercase">
                <tr>
                  <th className="px-6 py-3  tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 tracking-wider">
                    Answer
                  </th>
                  <th className="px-6 py-3 text-center tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {faqs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FiAlertTriangle className="w-12 h-12 mb-3 text-gray-400" />
                        <span className="text-lg font-medium">No FAQs found</span>
                        <p className="text-sm mt-1">Click "Add New FAQ" to create your first FAQ</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  faqs.map((faq, index) => (
                    <tr key={faq._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 line-clamp-2 max-w-md">
                          {faq.answer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => editHandler(faq)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm  text-gray-900"
                            title="Edit"
                          >
                            <FiEdit size={20} />
                          </button>
                          <button
                            onClick={() => deleteHandler(faq)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm  text-red-700"
                            title="Delete"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit FAQ" : "Add New FAQ"}
              </h2>
              <button
                onClick={cancelEdit}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={submitHandler} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter the question"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[150px]"
                    placeholder="Enter the answer"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-6 border-t mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : editingId ? (
                    "Update FAQ"
                  ) : (
                    "Add FAQ"
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        loading={loading}
        onCancel={() => {
          setShowDeleteModal(false);
          setFaqToDelete(null);
        }}
        onConfirm={confirmDelete}
      />


    </div>
  );
}