import { useState } from "react";

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
  });

  const [preview, setPreview] = useState(initialData.image || null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-xl"
    >
      {/* Product Name */}
      <div>
        <label className="text-sm text-gray-500">Product Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full mt-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-sm text-gray-500">Price</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full mt-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="text-sm text-gray-500">Stock</label>
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Enter stock"
          className="w-full mt-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="text-sm text-gray-500">Product Image</label>
        <input
          type="file"
          onChange={handleImage}
          className="w-full mt-1 text-sm"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-3 w-32 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Submit */}
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;