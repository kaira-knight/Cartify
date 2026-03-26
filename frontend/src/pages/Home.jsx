    //  import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = ({ user }) => {
  return (
     <>

      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">
     Big Sale Today
        </h1>
      </section>

      <section className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Electronics
        </div>
        <div className="bg-white p-4 rounded shadow">
          Fashion
        </div>
        <div className="bg-white p-4 rounded shadow">
          Shoes
        </div>
        <div className="bg-white p-4 rounded shadow">
          Watches
        </div>
      </section>

      <section className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          Featured Product
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;