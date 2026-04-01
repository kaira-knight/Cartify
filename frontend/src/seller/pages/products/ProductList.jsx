import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../utils/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Sorting & Pagination State
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // 1. Filter Logic
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // 3. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Products</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64 bg-white shadow-sm"
          />

          <Link
            to="/seller/products/add"
            className="w-full sm:w-auto bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md text-center active:scale-95"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-400 animate-pulse">Loading products...</div>
        ) : sortedProducts.length === 0 ? (
          <div className="p-16 text-center text-gray-500 font-medium font-inter">No products found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
                    <th 
                      className="py-4 px-6 font-semibold cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => requestSort('name')}
                    >
                      Product {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="py-4 px-4 font-semibold cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => requestSort('price')}
                    >
                      Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th 
                      className="py-4 px-4 font-semibold cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => requestSort('stock')}
                    >
                      Stock Status {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {currentItems.map((p) => (
                    <tr key={p._id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{p.name}</td>
                      <td className="py-4 px-4 text-gray-600 font-semibold">₹{p.price?.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        {p.stock > 10 ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            In Stock
                          </span>
                        ) : p.stock > 0 ? (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Low Stock ({p.stock})
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex flex-wrap justify-end gap-4">
                          <Link 
                            to={`/seller/products/edit/${p._id}`} 
                            className="text-indigo-600 hover:text-indigo-900 font-bold decoration-2 underline-offset-4 hover:underline"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => setDeleteId(p._id)} 
                            className="text-red-500 hover:text-red-700 font-bold decoration-2 underline-offset-4 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50/50 border-t border-gray-100 gap-4">
              <p className="text-xs font-medium text-gray-500">
                Showing <span className="text-gray-800">{indexOfFirstItem + 1}</span> to <span className="text-gray-800">{Math.min(indexOfLastItem, sortedProducts.length)}</span> of <span className="text-gray-800">{sortedProducts.length}</span> items
              </p>
              <div className="flex gap-2 w-full sm:w-auto justify-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
              <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)} 
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleDelete(deleteId); setDeleteId(null); }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;