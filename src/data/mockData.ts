export const mockNFTs = [
  { 
    id: 1, 
    name: 'Blood Donation #1', 
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bloodType: 'O+',
    donationDate: '2023-01-15',
    hospital: 'City General Hospital',
    redeemed: false,
    benefits: ['10% discount at MedPharm', 'Free health checkup at City General']
  },
  { 
    id: 2, 
    name: 'Blood Donation #2', 
    image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bloodType: 'O+',
    donationDate: '2023-02-20',
    hospital: 'Memorial Medical Center',
    redeemed: true,
    benefits: ['15% discount at HealthStore', 'Priority appointment at Memorial Medical']
  },
  { 
    id: 3, 
    name: 'Blood Donation #3', 
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    bloodType: 'O+',
    donationDate: '2023-03-10',
    hospital: 'University Health System',
    redeemed: false,
    benefits: ['Free wellness package', '25% off at University Pharmacy']
  }
];

export const mockHealthRecords = [
  {
    id: 1,
    type: 'Blood Test',
    date: '2023-04-15',
    provider: 'City General Hospital',
    results: 'Normal',
    notes: 'All values within normal range'
  },
  {
    id: 2,
    type: 'COVID-19 Vaccination',
    date: '2023-02-10',
    provider: 'Community Vaccination Center',
    results: 'Completed',
    notes: 'Second dose of Pfizer-BioNTech'
  },
  {
    id: 3,
    type: 'Annual Physical',
    date: '2023-01-05',
    provider: 'Dr. Smith Clinic',
    results: 'Healthy',
    notes: 'Recommended regular exercise and balanced diet'
  }
];

export const mockMarketplaceItems = [
  {
    id: 1,
    name: 'Premium Health Check',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b7e9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '200 HIVE',
    provider: 'HealthPlus Network',
    description: 'Comprehensive health check including blood work, cardiac assessment, and nutrition consultation.'
  },
  {
    id: 2,
    name: 'Mental Wellness Package',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '150 HIVE',
    provider: 'MindfulHealth',
    description: 'Four therapy sessions with certified professionals and stress management resources.'
  },
  {
    id: 3,
    name: 'Fitness Tracker Pro',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: '80 HIVE',
    provider: 'FitLife Medical',
    description: 'Advanced fitness tracker with health metrics monitoring and personalized insights.'
  }
];
