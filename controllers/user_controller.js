import userModel from "../model/user.js";
import bcrypt from "bcryptjs"


const createUser = async (req, res) => {
    const payload = req.body

    if (!payload.password 
        || !payload.email
    ) {
        return res.json(
            {"message" : "Fill in the required section"}
        )
    }
    const existingUser = await userModel.findOne({
        $or: [
            {email: payload.email},
            {phone: payload.phone},
        ]
    })
    if (existingUser) {
        return res.json({
            "message": "User already exist try another email/phone or log into your account"
        })
    }
    try {
    const hashedpassword = await bcrypt.hash(payload.password, 10)
    const newUser = new userModel({
        ...payload,
        password: hashedpassword
    })

    const savedUser = await newUser.save( )
    res.status(201).json(savedUser)
    } catch(error){
       return res.json({error: error.message})
    };
    
}

const getUsers = async (req, res) => {
    const allUsers = await userModel.find()
    res.json(allUsers)
}

const updateUser = async (req, res) => {
    const {id} = req.query
    const payload = req.body
    const updatedUser = await userModel.findByIdAndUpdate(
        id, 
        {...payload}, 
        {new:true}
    )
    res.json(updatedUser)
}

const deleteUser = async (req, res) => {
    const {id} = req.query
    const deleteduser = await userModel.findByIdAndDelete(id)
    res.status(201).json(deleteduser)

}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email:email})
    if(!user){
        res.json({
            "message": "This is account does not exist, create account!!!"
        })
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid){
        return res.json({
            "message": "Invalid Email or Password"
        })
    } else {
        return res.json({
            "message": "Login successful",
            id: user.id,
            name: user.name,
            email: user.email
        })
    }
}

export {createUser, getUsers, updateUser, deleteUser, loginUser}