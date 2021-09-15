'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    confirmPassword:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        enum: ["ROLE_USER", "ROLE_ADMIN"],
        required: true
    },
    accountVerifyToken:String,
    accountVerifyTokenExpiration: Date,
},
{timestamps: true}
);

export default mongoose.model("Account", accountSchema);