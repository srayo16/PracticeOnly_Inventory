const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique: [true, "Name must be unique than others."],
        required: [true, "Name Required"]
    },

    email: {
        type: String,
        required: [true, "Email Required"]
    },

    password: {
        type: String,
        minLength: [8, "Must be 8 letters!"],
        required: [true, "Password Required"]
    },

},
    {
        timestamps: true,
        timeseries: true
    }

);

adminSchema.methods.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.pre("save", async (next) => {
    if (!this.isModified) {
        next();
    }
    if (!this.password) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const model = mongoose.model("AdminModel", adminSchema);
module.exports = model;