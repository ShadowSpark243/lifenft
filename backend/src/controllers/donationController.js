import { DonationService } from '../services/donationService.js'

export const createDonation = async (c) => {
  const { userId, hospitalId, donationType } = await c.req.json()
  const service = new DonationService(c.env.DB)
  
  try {
    const donationId = await service.createDonation(userId, hospitalId, donationType)
    return c.json({ message: 'Donation recorded', donationId }, 201)
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
}

export const verifyDonation = async (c) => {
  const donationId = c.req.param('id')
  const service = new DonationService(c.env.DB)
  
  try {
    await service.verifyDonation(donationId)
    return c.json({ message: 'Donation verified successfully' })
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
}

export const mintNFT = async (c) => {
  const donationId = c.req.param('id')
  const { ownerId, ipfsHash, hiveTxId } = await c.req.json()
  const service = new DonationService(c.env.DB)
  
  try {
    const nftId = await service.mintNFT(donationId, ownerId, ipfsHash, hiveTxId)
    return c.json({ message: 'NFT Minted', nftId }, 201)
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
}
