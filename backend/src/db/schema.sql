CREATE TABLE IF NOT EXISTS Users (
    User_Id TEXT PRIMARY KEY,
    Password TEXT NOT NULL,
    First_Name TEXT,
    Last_Name TEXT,
    Email TEXT,
    Role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS Hospital_Details (
    Hospital_Id TEXT PRIMARY KEY,
    Hospital_Name TEXT NOT NULL,
    License_Number TEXT,
    Address TEXT,
    Phone TEXT,
    Website TEXT,
    FOREIGN KEY(Hospital_Id) REFERENCES Users(User_Id)
);

CREATE TABLE IF NOT EXISTS Government_Details (
    Authority_Id TEXT PRIMARY KEY,
    Department_Name TEXT NOT NULL,
    Jurisdiction TEXT,
    Authority_Level TEXT,
    Office_Address TEXT,
    Contact_Email TEXT,
    FOREIGN KEY(Authority_Id) REFERENCES Users(User_Id)
);

CREATE TABLE IF NOT EXISTS Donations (
    Donation_Id TEXT PRIMARY KEY,
    User_Id TEXT NOT NULL,
    Hospital_Id TEXT NOT NULL,
    Donation_Type TEXT NOT NULL,
    Status TEXT DEFAULT 'Pending',
    Date_Donated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(User_Id) REFERENCES Users(User_Id),
    FOREIGN KEY(Hospital_Id) REFERENCES Users(User_Id)
);

CREATE TABLE IF NOT EXISTS NFTs (
    NFT_Id TEXT PRIMARY KEY,
    Donation_Id TEXT NOT NULL,
    Owner_Id TEXT NOT NULL,
    IPFS_Hash TEXT NOT NULL,
    Hive_Tx_Id TEXT,
    Mint_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Donation_Id) REFERENCES Donations(Donation_Id),
    FOREIGN KEY(Owner_Id) REFERENCES Users(User_Id)
);

CREATE TABLE IF NOT EXISTS Hospital_Verifications (
    Verification_Id TEXT PRIMARY KEY,
    Hospital_Id TEXT NOT NULL,
    Government_Id TEXT NOT NULL,
    Status TEXT DEFAULT 'Pending',
    FOREIGN KEY(Hospital_Id) REFERENCES Users(User_Id),
    FOREIGN KEY(Government_Id) REFERENCES Users(User_Id)
);
