const ProductDetails = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="grid md:grid-cols-2 gap-8 p-8">
        <ImageCarousel />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Product Name
          </h2>

          <p className="text-xl text-green-600">
            ₹999
          </p>

          <VariantSelector />

          <AddToCartButton />
        </div>
      </div>

      <ReviewList />
    </div>
  );
};

export default ProductDetails;