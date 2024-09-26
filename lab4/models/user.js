const mongoose = require('mongoose');
const validator = require("validator");
// lab4
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// lab4


const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    age: {type: Number,
        default: 0,
        validate: {
            validator: function(value){
                if (value < 0){
                    throw new Error("Age must be a positive integer");
                }
            }
        }
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: value => {
                if(value.length < 7 && value.lowercase != "password"){
                    throw new Error("Age must be a positive integer");
                }
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findOneByCredentials =  async (email, password) =>{
    const user = await User.findOne({email});

    console.log(email);
    if (!user) {
        throw new Error("incorrect email");
    }
    const isMatch = await  bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("incorrect password");
    }
    return user;
};

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, "mySillyWilyPassPhrase");
    user.tokens = [...user.tokens, {token}];
    await user.save();
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
