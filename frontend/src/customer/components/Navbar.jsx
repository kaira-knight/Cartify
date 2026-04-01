import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("userInfo");

  return (
    <nav style={styles.nav}>
      <h2>Cartify 🛒</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            <button
              onClick={() => {
                localStorage.removeItem("userInfo");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    background: "#111",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
};

export default Navbar;