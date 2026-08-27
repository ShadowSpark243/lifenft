import { DONATION_STATUS } from '../config/index.js'

export class DonationService {
  constructor(db) {
    this.db = db
  }

  async createDonation(userId, hospitalId, donationType) {
    const donationId = crypto.randomUUID()
    
    await this.db.prepare(
      "INSERT INTO Donations (Donation_Id, User_Id, Hospital_Id, Donation_Type, Status) VALUES (?, ?, ?, ?, ?)"
    ).bind(donationId, userId, hospitalId, donationType, DONATION_STATUS.PENDING).run()
    
    return donationId
  }

  async verifyDonation(donationId) {
    await this.db.prepare(
      "UPDATE Donations SET Status = ? WHERE Donation_Id = ?"
    ).bind(DONATION_STATUS.VERIFIED, donationId).run()
    
    return true
  }

  async mintNFT(donationId, ownerId, ipfsHash, hiveTxId) {
    const nftId = crypto.randomUUID()
    
    const stmts = [
      this.db.prepare(
        "INSERT INTO NFTs (NFT_Id, Donation_Id, Owner_Id, IPFS_Hash, Hive_Tx_Id) VALUES (?, ?, ?, ?, ?)"
      ).bind(nftId, donationId, ownerId, ipfsHash, hiveTxId),
      
      this.db.prepare(
        "UPDATE Donations SET Status = ? WHERE Donation_Id = ?"
      ).bind(DONATION_STATUS.MINTED, donationId)
    ]
    
    await this.db.batch(stmts)
    return nftId
  }
}
