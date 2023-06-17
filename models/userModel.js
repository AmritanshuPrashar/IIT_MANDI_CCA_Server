const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4

    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (confirmPassword) {
                return confirmPassword === this.password;
            },
            message: "Passwords do not match"
        }
    },
    role: {
        type: String,
        default: 'user'
    }
}
)

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel