'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName:{
          type: String,
          required:true
      },
      account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    },
    { timestamps: true }
  );


 export default mongoose.model("User", userSchema);