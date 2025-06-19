import userModel from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const signupController = async (req, res) => {
    const { fullname, email, password } = req.body

    try {


        if (!fullname) {
            return res.status(400).json({ message: "Full name is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least charcters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }


        const isUser = await userModel.findOne({ email })
        if (isUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randamavatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const user = await userModel.create({
            fullname,
            email,
            password
        });

    

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: true
        })

        res.status(201).json({ success: true, user: user })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}



export const loginController = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email) {
            return res.status(400).json({ message: "email is required" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" })
        }

        const isUser = await userModel.findOne({ email })

        if (!isUser) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await isUser.matchPassword(password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid Credentials" })



        const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET)

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: true
            // process.env.NODE_ENV === "production"
        })

        res.status(200).json({ success: true, user: isUser, message: "user is successfully login" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "server error" })
    }

}


export const logoutController = async (req, res) => {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Logout successfully" })
}

