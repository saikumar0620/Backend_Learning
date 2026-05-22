// import jwt from 'jsonwebtoken';
// //to create a token: secret,expiry,data


// const generateAccessToken = (userId) => {
//   const accessToken = jwt.sign({userId} , process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIREY})
//   return accessToken;
// }

// const generateRefreshToken = (userId) => {
//   const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIREY })
//   return refreshToken;

// }

// export { generateAccessToken, generateRefreshToken }








import jwt from 'jsonwebtoken';
//to create a token: secret,expiry,data




const generateAccessToken = (userId) => {
  const accessToken=jwt.sing({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIREY})
}
const generateRefreshToken = (userId) => {
  const generateRefreshToken=jwt.sing({userId},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIREY})
}

export { generateAccessToken, generateRefreshToken }








