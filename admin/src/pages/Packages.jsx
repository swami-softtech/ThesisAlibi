import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiStar
} from "react-icons/fi";

import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage
} from "../services/packageApi";

import { PackageFormModal } from "../components/PackageFormModal";
import DeleteModal from "../components/DeleteModal";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadPackages = async () => {
    setPackages(await getPackages());
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleSave = async (data) => {
    editing
      ? await updatePackage(editing._id, data)
      : await createPackage(data);

    setOpenForm(false);
    setEditing(null);
    loadPackages();
  };

  const handleDelete = async () => {
    await deletePackage(deleteId);
    setDeleteId(null);
    loadPackages();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Packages Manager</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your service packages</p>
          </div>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800"
          >
            <FiPlus size={16} />
            Add Package
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-secondary">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-50 text-center">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium  text-gray-900">
                        {pkg.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {pkg.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pkg.popular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          <FiStar size={10} />
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm  text-gray-900"
                          onClick={() => {
                            setEditing(pkg);
                            setOpenForm(true);
                          }}
                        >
                          <FiEdit size={20} />

                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm  text-red-700"
                          onClick={() => setDeleteId(pkg._id)}
                        >
                          <FiTrash2 size={20} />

                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {packages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">No packages found</div>
              <p className="text-gray-500 text-sm">Get started by creating a new package</p>
            </div>
          )}
        </div>
      </div>

      <PackageFormModal
        open={openForm}
        initialData={editing}
        onClose={() => {
          setOpenForm(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <DeleteModal
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}