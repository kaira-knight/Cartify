import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { getProductById, updateProduct } from "../../../services/sellerApi";
import toast from "react-hot-toast";

// Common Components
import Card from "../../components/common/Card";

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
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading product...
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="p-6 text-red-500 font-medium">
        Product not found
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Edit Product
      </h1>

      <Card>
        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default EditProduct;