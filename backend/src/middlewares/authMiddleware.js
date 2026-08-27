import { ROLES } from '../config/index.js'

export const requireHospital = async (c, next) => {
  // In a real app, you would extract the JWT token here
  // and verify the user's role. For now, we assume the 
  // role is passed in headers for demonstration.
  const role = c.req.header('x-user-role')
  
  if (role !== ROLES.HOSPITAL) {
    return c.json({ error: 'Forbidden: Requires Hospital Role' }, 403)
  }
  
  await next()
}

export const requireGovernment = async (c, next) => {
  const role = c.req.header('x-user-role')
  
  if (role !== ROLES.GOVERNMENT) {
    return c.json({ error: 'Forbidden: Requires Government Role' }, 403)
  }
  
  await next()
}
