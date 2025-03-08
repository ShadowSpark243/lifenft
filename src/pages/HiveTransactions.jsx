import React, { useState } from "react";
// import hiveTx from "hive-tx";
// import * as hiveTx from "hive-tx";
import { PrivateKey, Transaction } from "hive-tx";

const HiveTransactions = () => {
  const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchLifeNFTTransactions = async () => {
    if (!username) {
      alert("Please enter a Hive username.");
      return;
    }

    try {
      const response = await fetch(`https://api.hive.blog`, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "condenser_api.get_account_history",
          params: [username, -1, 1000],
          id: 1,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!data.result) {
        throw new Error("Failed to fetch transactions");
      }

      const nftTransactions = data.result
        .map(([_, trx]) => trx)
        .filter(trx => trx.op[0] === "custom_json" && trx.op[1].id === "life_nft")
        .map(trx => JSON.parse(trx.op[1].json));

      setTransactions(nftTransactions);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch data.");
    }
  };

  return (
    <div>
      <h2>Fetch LifeNFT Transactions</h2>
      <input
        type="text"
        placeholder="Enter Hive Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchLifeNFTTransactions}>Fetch Transactions</button>

      {error && <p>{error}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>Donor ID</th>
            <th>Name</th>
            <th>Blood Type</th>
            <th>Amount</th>
            <th>IPFS Hash</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.donor_id}</td>
              <td>{tx.donor_name}</td>
              <td>{tx.blood_type}</td>
              <td>{tx.amount}</td>
              <td>
                <a href={`https://ipfs.io/ipfs/${tx.ipfs_hash}`} target="_blank" rel="noopener noreferrer">
                  {tx.ipfs_hash}
                </a>
              </td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HiveTransactions;
