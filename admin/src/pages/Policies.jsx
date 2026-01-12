import { useEffect, useState } from "react";
import { getAllPages, deletePage } from "../services/pageApi";
import PageFormModal from "../components/PageFormModal";
import { FiEdit2, FiTrash2, FiPlus, FiFileText, FiChevronRight } from "react-icons/fi";
import DeleteModal from "../components/DeleteModal";

export default function Policies() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await getAllPages();
      setPages(res.data.data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type) => {
    const colors = {
      'privacy': 'bg-blue-100 text-blue-800',
      'terms': 'bg-purple-100 text-purple-800',
      'policy': 'bg-green-100 text-green-800',
      'faq': 'bg-amber-100 text-amber-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[type.toLowerCase()] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-secondary to-secondary rounded-xl">
                  <FiFileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary">Policy Pages</h1>
                  <p className="text-gray-600 mt-1">Manage your website's legal and policy pages</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPage(null);
                setIsFormOpen(true);
              }}
              className="group flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Page</span>
            </button>
          </div>
        </div>

        {/* Pages Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <div
                key={page._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(page.type)}`}>
                      {page.type.charAt(0).toUpperCase() + page.type.slice(1)}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => {
                          setSelectedPage(page);
                          setIsFormOpen(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4 text-gray-600 hover:text-black" />
                      </button>
                      <button
                        onClick={() => setDeleteType(page.type)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                    {page.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {page.content ? page.content.substring(0, 100) + '...' : 'No content available'}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Last updated: {new Date(page.updatedAt || page.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedPage(page);
                        setIsFormOpen(true);
                      }}
                      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black group/edit"
                    >
                      Edit
                      <FiChevronRight className="w-4 h-4 group-hover/edit:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FiFileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'No pages match your search. Try a different term.' : 'Get started by creating your first policy page.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => {
                    setSelectedPage(null);
                    setIsFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FiPlus className="w-5 h-5" />
                  Create Your First Page
                </button>
              )}
            </div>
          </div>
        )}


      </div>

      {/* Create / Edit Modal */}
      <PageFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedPage={selectedPage}
        onSaved={() => {
          setIsFormOpen(false);
          fetchPages();
        }}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteType}
        title="Are you sure Delete Page?"
        onCancel={() => setDeleteType(null)}
        onConfirm={async () => {
          await deletePage(deleteType);
          setDeleteType(null);
          fetchPages();
        }}
      />
    </div>
  );
}