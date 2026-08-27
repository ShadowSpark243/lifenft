import { Hono } from 'hono'
import { createDonation, verifyDonation, mintNFT } from '../controllers/donationController.js'
import { requireHospital } from '../middlewares/authMiddleware.js'

const donationRoutes = new Hono()

// Only hospitals can record and verify donations
donationRoutes.post('/', requireHospital, createDonation)
donationRoutes.post('/:id/verify', requireHospital, verifyDonation)

// System or hospital calls this after interacting with Pinata/Hive
donationRoutes.post('/:id/mint', requireHospital, mintNFT)

export default donationRoutes
