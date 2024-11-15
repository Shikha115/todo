export const authenticateToken=(req, res, next)=> {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
    
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;  // Attach the user info from the token to the request
      next();
    });
  }