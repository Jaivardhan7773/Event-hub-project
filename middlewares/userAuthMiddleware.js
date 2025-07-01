import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


//middleare for updating profile for now
export const userAuthMiddleware = async (req, res, next) => {
    try {
        // console.log("Cookies: ", req.cookies);
        // console.log("Token: ", req.cookies.jwt);
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "Cannot get token"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        // console.log("Decoded token:", decoded);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Invalid user"
            })
        }
        req.user = user
        next();
    } catch (error) {
        console.log("error in userAuthMiddleware");
        res.status(500).json({
            message: "Internal server err"
        });
    }
}
