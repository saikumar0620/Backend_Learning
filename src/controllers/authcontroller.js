// import Users from "../db/users.js"
// import asyncHandler from "../utils/asyncHandler.js"
// import { generateAccessToken, generateRefreshToken } from "../utils/jwt-tokens.js"
// const userInstance= new Users()

// const registerNewUser = asyncHandler(async  (req, res) => {
//   const newUserData = req.body
//   const savedNewUser = userInstance.createNewUser(newUserData)
//   if (!req.body.username) {
//     throw new Error("User name is required")
//   }

//   res.status(200).json({
//     success: true,
//     data: savedNewUser,
//     message: "User registered successfully"
//   })
   
// })

// const logInUser = (req, res) => {

//   const userToLogin = req.body
//   //get the existing user through the email while loggig in
//   const existingUser = userInstance.findUserByEmail(userToLogin.email)
  
//   //accessToken and refreshToken are used to save the user confidentiial data into a gibbiresh token string for authentication and authorization
//   const accessToken = generateAccessToken(existingUser.id)
//   const refreshToken = generateRefreshToken(existingUser.id)
  
//   res.status(200).json({
//     success: true,
//     data: {
//       loggedinUser: existingUser,
//       accessToken: accessToken,
//       refreshToken:refreshToken

//     },
      
//     message: "User logged in successfully"
//   })
    
// }

// export { registerNewUser, logInUser };











import Users from "../db/users.js"
// import asyncHandler from "../utils/asyncHandler.js"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt-tokens.js"


const userInstance= new Users()


const registerNewUser = async (req,res) => {
  const newUserdata = req.body
  const savedNewUser =userInstance.createNewUser(newUserdata)
  if (!req.body.username) {
    throw new Error("User name is required")
  }
  res.status(200).json({
    success: true,
    data: savedNewUser,
    message: "User registered successfully"
  })
}

const logInUser =  (req, res) => { 
  const userToLogin = req.body
  const existingUser = userInstance.findUserByEmail(userToLogin.email)
  const accessToken= generateAccessToken(existingUser.id)
  const refreshToken = generateRefreshToken(existingUser.id)
  //save the refreshToken key value in user object

  // set the cookie: refreshToken
  
res.status(200).json({
  success: true,
  data: {
    loggedinUser: existingUser,
    accessToken: accessToken
    // refreshToken:refreshToken

  },
  message: "User logged in successfully"
})

}

const refreshAccessToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token is required",
    });
  }

export { registerNewUser, logInUser, refreshAccessToken };











