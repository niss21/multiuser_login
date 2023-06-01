const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        lowercase: true,
        required: true,
      },
    password: {
        type: String,
        minLength: 8,
        required: true,
        select: false,
    },
    role: {
        required: true,
        role: String,
        enum: ["recruiter", "applicant"]
    }

},
{ collation: { locale: "en" } }
);

// module.exports = mongoose.model("User", UserSchema)

const User = mongoose.model('User', userSchema);

module.exports = User;