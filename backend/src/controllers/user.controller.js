import User from "../models/userSchema.js";

export const getProfile = async (req , res) => {
    const id = req.user.id;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({user : {
        _id: user._id,
        userName: user.userName,
        email: user.email,
    }});
}

