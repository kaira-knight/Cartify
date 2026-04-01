import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { createProduct } from "../../../utils/api";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);
      toast.success("Product added!");
      navigate("/seller/products");
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Add Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;