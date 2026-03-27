import Navbar from "../components/Navbar";

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="p-6 space-y-2">
        <h2 className="text-2xl font-bold">
          User Profile
        </h2>

        <p>Name: User</p>
        <p>Email: user@email.com</p>
        <p>Saved Addresses</p>
      </div>
    </div>
  );
};

export default Profile;