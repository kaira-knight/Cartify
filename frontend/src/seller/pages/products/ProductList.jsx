import { useState } from "react";
import { Link } from "react-router-dom";

// Common Components
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";

// Hook
import useSeller from "../../hooks/useSeller";

const ProductList = () => {
  // ✅ Hook (correct usage)
  const { products, loadingProducts, removeProduct } = useSeller();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Sorting & Pagination
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ================= FILTER =================
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= SORT =================
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // ================= PAGINATION =================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Products
        </h1>

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

          <Link to="/seller/products/add">
            <Button className="w-full sm:w-auto">
              + Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* TABLE CARD */}
      <Card className="overflow-hidden">
        {loadingProducts ? (
          <div className="p-16 text-center text-gray-400 animate-pulse">
            Loading products...
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="p-16 text-center text-gray-500 font-medium">
            No products found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 border-b">
                    <th
                      className="py-4 px-6 font-semibold cursor-pointer hover:text-indigo-600"
                      onClick={() => requestSort("name")}
                    >
                      Product{" "}
                      {sortConfig.key === "name" &&
                        (sortConfig.direction === "asc"
                          ? "↑"
                          : "↓")}
                    </th>

                    <th
                      className="py-4 px-4 font-semibold cursor-pointer hover:text-indigo-600"
                      onClick={() => requestSort("price")}
                    >
                      Price{" "}
                      {sortConfig.key === "price" &&
                        (sortConfig.direction === "asc"
                          ? "↑"
                          : "↓")}
                    </th>

                    <th
                      className="py-4 px-4 font-semibold cursor-pointer hover:text-indigo-600"
                      onClick={() => requestSort("stock")}
                    >
                      Stock{" "}
                      {sortConfig.key === "stock" &&
                        (sortConfig.direction === "asc"
                          ? "↑"
                          : "↓")}
                    </th>

                    <th className="py-4 px-6 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {currentItems.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-indigo-50/30 transition"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {p.name}
                      </td>

                      <td className="py-4 px-4 text-gray-600 font-semibold">
                        ₹{p.price?.toLocaleString()}
                      </td>

                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            p.stock > 10
                              ? "success"
                              : p.stock > 0
                              ? "warning"
                              : "danger"
                          }
                        >
                          {p.stock > 10
                            ? "In Stock"
                            : p.stock > 0
                            ? `Low Stock (${p.stock})`
                            : "Out of Stock"}
                        </Badge>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex gap-3 justify-end">
                          <Link
                            to={`/seller/products/edit/${p._id}`}
                          >
                            <Button variant="ghost">
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="danger"
                            onClick={() => setDeleteId(p._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 border-t gap-4">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="text-gray-800">
                  {indexOfFirstItem + 1}
                </span>{" "}
                to{" "}
                <span className="text-gray-800">
                  {Math.min(
                    indexOfLastItem,
                    sortedProducts.length
                  )}
                </span>{" "}
                of{" "}
                <span className="text-gray-800">
                  {sortedProducts.length}
                </span>
              </p>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => prev - 1)
                  }
                >
                  Previous
                </Button>

                <Button
                  variant="secondary"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => prev + 1)
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* DELETE MODAL */}
      <Modal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
      >
        <div className="text-center space-y-4">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>

          <h2 className="text-xl font-bold">
            Confirm Deletion
          </h2>

          <p className="text-gray-500 text-sm">
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              className="flex-1"
              onClick={() => {
                removeProduct(deleteId); // ✅ hook instead of local API
                setDeleteId(null);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;