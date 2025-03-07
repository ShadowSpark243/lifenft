import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RoleContext } from '../contexts/RoleContext';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export function VerifyDonation() {
  const { userRole } = useContext(RoleContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorName: '',
    donorId: '',
    bloodType: 'O+',
    amount: '',
    notes: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState("");

  const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5OTMyNjE0OC1hMzIzLTQ0YzItYjUwNi00MTU0YTNiMTNmMzMiLCJlbWFpbCI6ImFyaWZha2h0YXI5MDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImY4NGUyNWIzYzgyYjY1ZTAzOGExIiwic2NvcGVkS2V5U2VjcmV0IjoiOWRjODM2Yzk5OTNiMTg2Zjg0ZTQ3MWQ5ZmU1ZDE2ZTY3YzE0ZDIwZTczNTlkNGU0ODJmODVkMjFkNWNkMDdmNiIsImV4cCI6MTc3MjgyNzM3NX0.tFYF935D4sJDZY98sLj1rK9lC2NOrk-x9f2lYjXHpgQ"; // Replace with your actual Pinata JWT

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadToPinata = async () => {
    const metadata = {
      name: "LifeNFT Blood Donation Badge",
      description: "NFT awarded for blood donation",
      attributes: {
        donorId: formData.donorId,
        donorName: formData.donorName,
        bloodType: formData.bloodType,
        amount: formData.amount,
        notes: formData.notes,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        { pinataContent: metadata },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );
      return response.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    const ipfsHash = await uploadToPinata();

    if (ipfsHash) {
      setIpfsHash(ipfsHash);

      const customJson = {
        id: "life_nft",
        json: JSON.stringify({
          nft_type: "LifeNFT",
          donor_id: formData.donorId,
          donor_name: formData.donorName,
          blood_type: formData.bloodType,
          amount: formData.amount,
          notes: formData.notes,
          ipfs_hash: ipfsHash,
          timestamp: new Date().toISOString(),
          tx_id: uuidv4()
        }),
        required_auths: [],
        required_posting_auths: [formData.donorId]
      };

      if (window.hive_keychain) {
        window.hive_keychain.requestCustomJson(
          formData.donorId,
          customJson.id,
          "Posting",
          customJson.json,
          "Issue Blood Donation NFT",
          (response) => {
            if (response.success) {
              setTransactionStatus("NFT issued successfully on Hive!");
            } else {
              setTransactionStatus("Transaction failed: " + response.message);
            }
            setIsVerifying(false);
          }
        );
      } else {
        alert("Hive Keychain extension is required!");
        setIsVerifying(false);
      }
    } else {
      alert("Failed to upload metadata.");
      setIsVerifying(false);
    }
  };

  if (userRole !== 'hospital') {
    return (
      <div className="max-w-4xl mx-auto px-4 text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-slate-400 mb-6">You don't have permission to access this page.</p>
        <Link to="/" className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Verify Blood Donation</h1>
        <p className="mt-2 text-slate-400">Record a new blood donation and issue an NFT to the donor</p>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="donorName" placeholder="Donor Name" onChange={handleInputChange} required className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg" />
          <input type="text" name="donorId" placeholder="Donor ID (Hive username)" onChange={handleInputChange} required className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg" />
          <input type="number" name="amount" placeholder="Amount (ml)" onChange={handleInputChange} required className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg" />
          <textarea name="notes" placeholder="Notes" onChange={handleInputChange} className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg"></textarea>
          <button type="submit" disabled={isVerifying} className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all">
            {isVerifying ? "Verifying..." : "Verify & Issue NFT"}
          </button>
        </form>

        {transactionStatus && <p className="text-green-400 mt-4">{transactionStatus}</p>}
      </div>
    </div>
  );
}
