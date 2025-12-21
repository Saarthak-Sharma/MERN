const User = require("../models/user_models");
const bcrypt = require("bcryptjs"); 

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to MERN Project using Controllers!!");
    } catch (error) {
        console.log("Error");
        
    }
};

//register logic
const register = async (req,res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist) {
            return res.status(400).json({msg: "Email already exists!"});    
        }

        //hash password
        const saltRound = 5;
        const hashPassword = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password: hashPassword,
        });
        res.status(200).json({msg: "Registration Successful", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString() 
        });
    } catch (error) {
        //console.log(error);
        //res.status(500).json({msg: "Internal server error!"});
        next(error);
    } 
}

//login logic
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({ email });

        if(!userExist) {
            return res.status(400).json({msg: "Invalid Credentials" });
        }

        const user = await bcrypt.compare(password, userExist.password);

        if(user) {
            res.status(200).json({msg: "Login Successful", 
            token: await userExist.generateToken(), 
            userId: userExist._id.toString(),
            })
        } else {
            res.status(401).json({ msg: "Invalid Email or Password" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};

//to send user data : user logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ user: userData });
    } catch (error) {
        console.log(`error from the controller ${error}`);
        
    }
}

module.exports = { home , register, login, user};