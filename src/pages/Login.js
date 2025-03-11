import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../contexts/RoleContext";
import HiveKeychainLogin from "./HiveKeychainLogin";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { login } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleApiLogin = async (email, password) => {
    try {
      const response = await fetch('https://localhost:7019/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          user_Id: email,
          password: password,
          processname: "Login"  // Hardcoded as requested
        })
      });

      const data = await response.json();
      console.log("API Response:", data);

      // Check if data contains the array with login result
      if (data.data && data.data.length > 0) {
        const loginResult = data.data[0];
        
        if (loginResult.Message_Code === 113) {
          // Show success message
          alert(loginResult.Message_Description);
          // Store user data if needed
          localStorage.setItem('userData', JSON.stringify(loginResult));
          return true;
        }
      }

      // If we didn't get the success code, show error
      setError(data.message || "Invalid credentials");
      return false;
    } catch (err) {
      console.error("Login error:", err);
      setError("API Login failed. Please try again.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const apiLoginSuccess = await handleApiLogin(email, password);
      
      if (apiLoginSuccess) {
        login(role);
        switch (role) {
          case "government":
            navigate("/gov-dashboard");
            break;
          case "hospital":
            navigate("/hospital-dashboard");
            break;
          case "user":
            navigate("/user-dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (err) {//arif
      setError("Login failed. Please try again.");
    }
  };

  const handleHiveLogin = () => {
    if (!window.hive_keychain) {
      alert("Hive Keychain is not installed.");
      return;
    }

    const message = "Login to LifeNFT at " + new Date().toISOString();

    window.hive_keychain.requestSignBuffer(
      null, // Automatically fetch the username
      message,
      "Posting",
      function (response) {
        if (response.success) {
          const username = response.data.username; // Extract username from response
          console.log("Hive Keychain Login Successful:", username);
          
          login("user"); // Set role to "user" after successful login
          navigate("/user-dashboard");
        } else {
          alert("Login failed: " + response.message);
          console.error("Hive Keychain Login Error:", response);
        }
      }
    );
  
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username/ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="user">Regular User</option>
              <option value="hospital">Hospital Owner</option>
              <option value="government">Government/Authority</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <a href="/register" className="text-purple-400 hover:text-purple-300">Register here</a>
        </div>

        <div className="mt-6 text-center">
          <button onClick={handleHiveLogin} className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20">
            Login with Hive Keychain
          </button>
        </div>
      </div>
    </div>
  );
}