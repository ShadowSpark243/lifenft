import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../contexts/RoleContext";

export function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleApiLogin = async (userId, password) => {
    try {
      setIsLoading(true);
      // Update the endpoint to point to our new backend
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: userId,
          password: password
        })
      });

      const data = await response.json();
      console.log("API Response:", data);

      // Update response handling to match our new backend format
      if (data.user) {
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Return success with role information
        return {
          success: true,
          role: data.user.Role || 'user',
          message: data.message
        };
      } else {
        // Login failed
        return {
          success: false,
          message: data.message || "Invalid credentials"
        };
      }
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: "Login failed. Please try again."
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const loginResult = await handleApiLogin(userId, password);
      
      if (loginResult.success) {
        // Set the role in the context
        login(loginResult.role);
        
        // Navigate based on role
        switch (loginResult.role) {
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
      } else {
        setError(loginResult.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleHiveLogin = () => {
    if (!window.hive_keychain) {
      alert("Hive Keychain is not installed.");
      return;
    }

    // Get username from input field
    const hiveUsername = userId;
    
    if (!hiveUsername) {
      setError("Please enter your Hive username first");
      return;
    }

    const message = "Login to LifeNFT at " + new Date().toISOString();

    window.hive_keychain.requestSignBuffer(
      hiveUsername,
      message,
      "Posting",
      function (response) {
        if (response.success) {
          console.log("Hive Keychain Login Successful:", hiveUsername);
          
          // For Hive users, we default to 'user' role
          login("user");
          
          // Store minimal user data
          localStorage.setItem('userData', JSON.stringify({
            User_Id: hiveUsername,
            Role: 'user',
            isHiveUser: true
          }));
          
          navigate("/user-dashboard");
        } else {
          setError("Hive login failed: " + response.message);
          console.error("Hive Keychain Login Error:", response);
        }
      }
    );
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to LifeNFT</h2>

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
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20 disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="my-6 relative flex items-center">
          <div className="flex-grow border-t border-slate-600"></div>
          <span className="flex-shrink mx-4 text-slate-400">or</span>
          <div className="flex-grow border-t border-slate-600"></div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400 mb-2">Enter your Hive username above, then click:</p>
          <button 
            onClick={handleHiveLogin} 
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-medium transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Connect Hive Wallet
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <a href="/register" className="text-purple-400 hover:text-purple-300">Register here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;