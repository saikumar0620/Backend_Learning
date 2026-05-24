// import { Router } from "express";
// import { logInUser, registerNewUser } from "../controllers/authcontroller.js";

// const authRouter = Router();

// authRouter.post("/register", registerNewUser);
// authRouter.post("/login", logInUser);
// export default authRouter;












import { Router } from "express";
import { logInUser, registerNewUser,refreshAccessToken } from "../controllers/authcontroller.js";




const authRouter = Router();

authRouter.post("/register", registerNewUser);
authRouter.post("/login", logInUser);
authRouter.get("refresh",refreshAccessToken)

export default authRouter;







