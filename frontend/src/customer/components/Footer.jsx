const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Cartify. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "1rem",
    background: "#111",
    color: "white",
    marginTop: "auto",
  },
};

export default Footer;