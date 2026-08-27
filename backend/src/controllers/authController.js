export const login = async (c) => {
  const { userId, password } = await c.req.json()
  if (!userId || !password) {
    return c.json({ message: "User ID and Password are required!" }, 400)
  }
  
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM Users WHERE User_Id = ? AND Password = ?"
    ).bind(userId, password).all()
    
    if (results && results.length > 0) {
      const user = results[0]
      // Don't send password back
      delete user.Password
      return c.json({ 
        message: "✅ Login Successful", 
        user 
      })
    } else {
      return c.json({ message: "❌ Invalid Credentials" }, 401)
    }
  } catch (err) {
    console.error("Database error:", err)
    return c.json({ message: "Internal Server Error" }, 500)
  }
}

export const register = async (c) => {
  const body = await c.req.json()
  const { userId, password, firstName, lastName, email, role, hospitalName, licenseNumber, address, phone, website, departmentName, jurisdiction, authorityLevel, officeAddress, contactEmail } = body
  
  if (!userId || !password) {
    return c.json({ message: "User ID and Password are required!" }, 400)
  }
  
  try {
    // Check if user already exists
    const existingUser = await c.env.DB.prepare("SELECT User_Id FROM Users WHERE User_Id = ?").bind(userId).first()
    
    if (existingUser) {
      return c.json({ message: "User ID already exists!" }, 409)
    }
    
    const userRole = role || 'user'
    const stmts = []
    
    // Insert base user data
    stmts.push(
      c.env.DB.prepare(
        "INSERT INTO Users (User_Id, Password, First_Name, Last_Name, Email, Role) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(userId, password, firstName || null, lastName || null, email || null, userRole)
    )
    
    // If hospital role, insert hospital details
    if (userRole === 'hospital' && hospitalName) {
      stmts.push(
        c.env.DB.prepare(
          "INSERT INTO Hospital_Details (Hospital_Id, Hospital_Name, License_Number, Address, Phone, Website) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(userId, hospitalName, licenseNumber || null, address || null, phone || null, website || null)
      )
    } 
    // If government role, insert government details
    else if (userRole === 'government' && departmentName) {
      stmts.push(
        c.env.DB.prepare(
          "INSERT INTO Government_Details (Authority_Id, Department_Name, Jurisdiction, Authority_Level, Office_Address, Contact_Email) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(userId, departmentName, jurisdiction || null, authorityLevel || null, officeAddress || null, contactEmail || null)
      )
    }
    
    // Execute all statements in a batch transaction
    await c.env.DB.batch(stmts)
    
    return c.json({ 
      message: "✅ Registration Successful",
      userId: userId,
      role: userRole
    }, 201)
    
  } catch (err) {
    console.error("Transaction error:", err)
    return c.json({ message: "Failed to register user" }, 500)
  }
}

export const logout = async (c) => {
  const { userId } = await c.req.json()
  if (!userId) return c.json({ message: "User ID is required!" }, 400)

  // With JWT/session this would invalidate the token, 
  // but since original just called usp_Login, we just return success
  return c.json({ message: "✅ Logout Successful" })
}

export const getUserProfile = async (c) => {
  const userId = c.req.param('userId')
  const role = c.req.param('role')
  
  if (!userId || !role) {
    return c.json({ message: "User ID and Role are required" }, 400)
  }
  
  try {
    let query = ''
    
    if (role === 'hospital') {
      query = `
        SELECT u.*, h.* 
        FROM Users u
        JOIN Hospital_Details h ON u.User_Id = h.Hospital_Id
        WHERE u.User_Id = ? AND u.Role = 'hospital'
      `
    } else if (role === 'government') {
      query = `
        SELECT u.*, g.* 
        FROM Users u
        JOIN Government_Details g ON u.User_Id = g.Authority_Id
        WHERE u.User_Id = ? AND u.Role = 'government'
      `
    } else {
      query = 'SELECT * FROM Users WHERE User_Id = ?'
    }
    
    const userProfile = await c.env.DB.prepare(query).bind(userId).first()
    
    if (!userProfile) {
      return c.json({ message: "User not found" }, 404)
    }
    
    delete userProfile.Password
    
    return c.json({ 
      message: "Profile fetched successfully", 
      profile: userProfile 
    })
  } catch (err) {
    console.error("Profile fetch error:", err)
    return c.json({ message: "Failed to fetch profile" }, 500)
  }
}
