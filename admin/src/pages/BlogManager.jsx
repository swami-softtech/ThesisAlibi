import { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { FiEdit, FiPlus, FiTrash2, FiUpload } from "react-icons/fi";

// API Base URL
const API_BASE = import.meta.env.VITE_BASE_URI;
const IMAGE_BASE = `${import.meta.env.VITE_BASE_URI}/uploads`;

const BlogManager = () => {
  const editor = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    authorRole: "",
    image: null,
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/blogs`);
      const data = await res.json();
      setBlogs(data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Create new blog
  const handleCreateNew = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      content: "",
      category: "",
      author: "",
      authorRole: "",
      image: null,
    });
    setIsModalOpen(true);
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      category: blog.category || "",
      author: blog.author || "",
      authorRole: blog.authorRole || "",
      image: null,
    });
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("author", formData.author);
      data.append("authorRole", formData.authorRole);

      if (formData.image) {
        data.append("image", formData.image);
      }

      let url = `${API_BASE}/api/blogs`;
      let method = "POST";

      if (editingBlog) {
        url = `${API_BASE}/api/blogs/${editingBlog._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        body: data,
      });

      if (!res.ok) throw new Error("Save failed");

      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save blog.");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete modal handlers
  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      const res = await fetch(`${API_BASE}/api/blogs/${blogToDelete._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setDeleteModalOpen(false);
      setBlogToDelete(null);
      fetchBlogs();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog.");
    }
  };

  return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
//             <p className="text-gray-600 text-sm mt-1">Manage blog posts</p>
//           </div>
//           <button
//             onClick={handleCreateNew}
//             className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800"
//           >
//             <FiPlus className="w-5 h-5" />
//             Create New Blog
//           </button>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-primary">
//                 <tr className="text-secondary text-center">
//                   <th className="px-6 py-4 text-sm font-semibold">Image</th>
//                   <th className="px-6 py-4 text-sm font-semibold">Title</th>
//                   <th className="px-6 py-4 text-sm font-semibold">Category</th>
//                   <th className="px-6 py-4 text-sm font-semibold">Author</th>
//                   <th className="px-6 py-4 text-sm font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {blogs.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-10 text-gray-500">
//                       No blogs found
//                     </td>
//                   </tr>
//                 ) : (
//                   blogs.map((blog) => (
//                     <tr key={blog._id}>
//                       <td className="px-6 py-4">
//                         <div className="h-16 w-24 bg-gray-100 rounded overflow-hidden">
//                           {blog.image ? (
//                             <img
//                               src={`${IMAGE_BASE}/${blog.image}`}
//                               alt=""
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <div className="h-full w-full flex items-center justify-center text-gray-400">
//                               No image
//                             </div>
//                           )}
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 font-medium truncate max-w-xs">
//                         {blog.title}
//                       </td>

//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
//                           {blog.category || "Uncategorized"}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div>{blog.author}</div>
//                         {blog.authorRole && (
//                           <div className="text-xs text-gray-500">
//                             {blog.authorRole}
//                           </div>
//                         )}
//                       </td>

//                       <td className="px-6 py-4 space-x-2">
//                         <button
//                           onClick={() => handleEdit(blog)}
//                           className="inline-flex items-center gap-1 px-3 py-1.5 text-sm  text-gray-900"
//                         >
//                           <FiEdit size={20} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(blog)}
//                           className="inline-flex items-center gap-1 px-3 py-1.5 text-sm  text-red-700"
//                         >
//                           <FiTrash2 size={20} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* CREATE / EDIT MODAL */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold">
//                   {editingBlog ? "Edit Blog" : "Create Blog"}
//                 </h2>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-2xl text-gray-400 hover:text-gray-600"
//                 >
//                   ×
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full border rounded-lg px-4 py-3"
//                   />

//                   <input
//                     type="text"
//                     name="category"
//                     placeholder="Category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full border rounded-lg px-4 py-3"
//                   />

//                   <input
//                     type="text"
//                     name="author"
//                     placeholder="Author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full border rounded-lg px-4 py-3"
//                   />

//                   <input
//                     type="text"
//                     name="authorRole"
//                     placeholder="Author Role"
//                     value={formData.authorRole}
//                     onChange={handleInputChange}
//                     className="w-full border rounded-lg px-4 py-3"
//                   />
//                 </div>

//                 {/* Jodit Editor */}
//                 <div>
//                   <label className="block mb-2 font-medium">Content</label>
//                   <JoditEditor
//   ref={editor}
//   value={formData.content}
//   onChange={(newContent) =>
//     setFormData((prev) => ({ ...prev, content: newContent }))
//   }
//   config={{
//     readonly: false,
//     placeholder: "Enter detailed content...",
//     toolbarAdaptive: false,
//     height: 300,
//     style: { fontFamily: "inherit" },
//   }}
// />

//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     {editingBlog ? "New Image (optional)" : "Image"}
//                   </label>
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleInputChange}
//                     required={!editingBlog}
//                     className="w-full border rounded-lg px-4 py-3"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-6 py-3 border rounded-lg"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={formLoading}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//                   >
//                     {formLoading
//                       ? "Saving..."
//                       : editingBlog
//                         ? "Update Blog"
//                         : "Create Blog"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* DELETE MODAL */}
//         {deleteModalOpen && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl p-6 max-w-md w-full">
//               <h3 className="text-xl font-semibold mb-4">Delete Blog</h3>
//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to delete{" "}
//                 <span className="font-semibold">
//                   "{blogToDelete?.title}"
//                 </span>
//                 ? This action cannot be undone.
//               </p>

//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => setDeleteModalOpen(false)}
//                   className="px-5 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>

  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-100">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
        <p className="text-gray-500 text-base">Create, edit, and manage your blog content</p>
      </div>
      <button
        onClick={handleCreateNew}
        className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3.5 rounded-xl text-base font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        <FiPlus className="w-6 h-6" />
        Create New Blog
      </button>
    </div>

    {/* Loading */}
    {loading ? (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Loading blogs...</p>
      </div>
    ) : (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-900 to-black">
              <tr className="text-white text-left">
                <th className="px-8 py-5 text-sm font-semibold uppercase tracking-wider">Image</th>
                <th className="px-8 py-5 text-sm font-semibold uppercase tracking-wider">Title</th>
                <th className="px-8 py-5 text-sm font-semibold uppercase tracking-wider">Category</th>
                <th className="px-8 py-5 text-sm font-semibold uppercase tracking-wider">Author</th>
                <th className="px-8 py-5 text-sm font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                        <FiFileText className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No blogs found</h3>
                      <p className="text-gray-500 mb-6">Get started by creating your first blog post</p>
                      <button
                        onClick={handleCreateNew}
                        className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Create Blog
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-8 py-5">
                      <div className="h-20 w-28 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        {blog.image ? (
                          <img
                            src={`${IMAGE_BASE}/${blog.image}`}
                            alt="Blog thumbnail"
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
                            <FiImage className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="max-w-xs">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {blog.content?.replace(/<[^>]*>/g, '').substring(0, 60)}...
                        </p>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100">
                        {blog.category || "Uncategorized"}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                          <div className="font-medium text-gray-900">{blog.author}</div>
                          {blog.authorRole && (
                            <div className="text-sm text-gray-500">{blog.authorRole}</div>
                          )}
                        
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:text-blue-700 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:scale-105"
                          title="Edit blog"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(blog)}
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-xl hover:from-red-100 hover:to-pink-100 hover:text-red-700 transition-all duration-300 border border-red-100 hover:border-red-200 hover:scale-105"
                          title="Delete blog"
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
    )}

    {/* CREATE / EDIT MODAL */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-3xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBlog ? "Edit Blog Post" : "Create New Blog"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {editingBlog ? "Update your blog content" : "Fill in the details to create a new blog"}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category *</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g., Technology, Lifestyle"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Author *</label>
                <input
                  type="text"
                  name="author"
                  placeholder="Author name"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Author Role</label>
                <input
                  type="text"
                  name="authorRole"
                  placeholder="e.g., Senior Writer, Editor"
                  value={formData.authorRole}
                  onChange={handleInputChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all outline-none"
                />
              </div>
            </div>

            {/* Jodit Editor */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Content *</label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 transition-all">
                <JoditEditor
                  ref={editor}
                  value={formData.content}
                  onChange={(newContent) =>
                    setFormData((prev) => ({ ...prev, content: newContent }))
                  }
                  config={{
                    readonly: false,
                    placeholder: "Write your blog content here...",
                    toolbarAdaptive: false,
                    height: 350,
                    style: { 
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      fontSize: '16px'
                    },
                    buttons: 'bold,italic,underline,strikethrough,|,ul,ol,|,font,fontsize,|,image,link,|,align,|,undo,redo',
                    // theme: 'dark'
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {editingBlog ? "New Image (optional)" : "Featured Image *"}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  required={!editingBlog}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <FiUpload className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-700 font-medium mb-1">
                    {editingBlog ? "Upload new image" : "Click to upload image"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {formLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {editingBlog ? "Updating..." : "Creating..."}
                  </span>
                ) : editingBlog ? (
                  "Update Blog"
                ) : (
                  "Create Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* DELETE MODAL */}
    {deleteModalOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl flex items-center justify-center">
              <FiTrash2 className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Delete Blog</h3>
              <p className="text-gray-500 text-sm">This action cannot be undone</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-8">
            <p className="text-gray-700">
              Are you sure you want to delete "
              <span className="font-semibold text-gray-900">
                {blogToDelete?.title}
              </span>
              "? All content will be permanently removed.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex-1"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex-1"
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default BlogManager;
