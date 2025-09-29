import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for Plentymarkets token
    const token = localStorage.getItem("plentyToken");
    const email = localStorage.getItem("plentyEmail"); // optional
    if (token) {
      setLoggedIn(true);
      setUserEmail(email);
    } else {
      setLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");

  const handleLogout = () => {
    localStorage.removeItem("plentyToken");
    localStorage.removeItem("plentyEmail");
    setLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      {loggedIn ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Account</h2>
          <p>Welcome, {userEmail}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 rounded mt-4 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <button
            onClick={handleLoginClick}
            className="bg-black text-white py-2 rounded hover:bg-gray-900 transition"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
}
