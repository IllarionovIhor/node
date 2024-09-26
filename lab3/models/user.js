const mongoose = require('mongoose');
const validator = require("validator");

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
    }
});
module.exports = mongoose.model("User", userSchema);
