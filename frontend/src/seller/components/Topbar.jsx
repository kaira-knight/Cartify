import { Menu } from "lucide-react";

const Topbar = ({ collapsed, setCollapsed }) => {
  return (
    <div style={styles.topbar}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={styles.menuBtn}
      >
        <Menu size={20} />
      </button>

      <h3>Seller Dashboard</h3>

      <div style={styles.right}>
        <span>Hello, Seller 👋</span>
      </div>
    </div>
  );
};

const styles = {
  topbar: {
    height: "60px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    borderBottom: "1px solid #e5e7eb",
  },
  menuBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  right: {
    fontSize: "14px",
    color: "#374151",
  },
};

export default Topbar;