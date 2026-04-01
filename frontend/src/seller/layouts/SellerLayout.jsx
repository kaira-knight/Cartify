import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div>
      <h1>Seller Layout</h1>
      <Outlet />
    </div>
  );
};

export default SellerLayout;