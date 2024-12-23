



import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';  
export const createToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email,
      role: user.role  
    },
    JWT_SECRET,  
    { expiresIn: '1h' }  
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);  
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expired' };  
    } else if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid token' };  
    } else {
      return { error: 'Token verification failed' };  
    }
  }
};
