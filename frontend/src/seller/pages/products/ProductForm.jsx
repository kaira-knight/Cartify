import { useState } from "react";

// Common Components
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    image: initialData.image || null,
  });

  const [preview, setPreview] = useState(initialData.image || null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.price || form.price <= 0)
      newErrors.price = "Enter valid price";
    if (form.stock === "" || form.stock < 0)
      newErrors.stock = "Enter valid stock";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {initialData._id ? "Edit Product" : "Add Product"}
        </h2>
        <p className="text-sm text-gray-500">
          Fill in product details below
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="text-sm text-gray-500">
            Product Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full mt-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="text-sm text-gray-500">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full mt-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          {errors.price && (
            <p className="text-xs text-red-500 mt-1">
              {errors.price}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm text-gray-500">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="w-full mt-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          {errors.stock && (
            <p className="text-xs text-red-500 mt-1">
              {errors.stock}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm text-gray-500">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImage}
            className="w-full mt-1 text-sm"
          />

          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1"
          >
            {loading
              ? "Saving..."
              : initialData._id
              ? "Update Product"
              : "Save Product"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;