import jwt from "jsonwebtoken"

export const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "4h"
    })

    // res.cookie("jwt", token, {
    //     maxAge: 4 * 60 * 60 * 1000,
    //     httpOnly: true, // prevent XSS (cross-site scripting) attacks
    //     sameSite: "strict", // prevent CSRF (cross-site request forgery) attacks
    //     secure: process.env.NODE_ENV !== 'development' 
    // })

    return token
}