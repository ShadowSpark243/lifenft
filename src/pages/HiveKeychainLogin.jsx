import React, { useState } from "react";

const HiveKeychainLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const loginWithKeychain = () => {
    if (!window.hive_keychain) {
      alert("Hive Keychain is not installed.");
      return;
    }

    const message = "Login to LifeNFT at " + new Date().toISOString();

    window.hive_keychain.requestSignBuffer(username, message, "Posting", function(response) {
      if (response.success) {
        onLogin(username);
        console.log("Login Successful:", response);
      } else {
        alert("Login failed!");
        console.error("Error:", response.message);
      }
    });
  };

  return (
    <div>
      <h2>Hive Keychain Login</h2>
      <input
        type="text"
        placeholder="Enter Hive username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={loginWithKeychain}>Login with Keychain</button>
    </div>
  );
};

export default HiveKeychainLogin;
