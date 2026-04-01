import { Outlet } from "react-router-dom";
import Navbar from "../customer/components/Navbar";
import Footer from "../customer/components/Footer";

const MainLayout = () => {
  return (
    <div style={styles.container}>
      <Navbar />

      <main style={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    padding: "2rem",
  },
};

export default MainLayout;