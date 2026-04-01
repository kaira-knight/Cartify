import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { getProductById, updateProduct } from "../../../utils/api";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setInitialData(res.data);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Submit update
  const handleSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      toast.success("Product updated!");
      navigate("/seller/products");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!initialData) {
    return <p className="text-red-500">Product not found</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Edit Product</h1>

      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditProduct;