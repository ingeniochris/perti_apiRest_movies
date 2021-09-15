'use strict';

import mongoose from 'mongoose';

export const conn = async _ => {
    const URI = process.env.MONGODB_CLUSTER
                ? process.env.MONGODB_CLUSTER
                : "mongodb://localhost/perti";
    try {
        const verifyConn = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        if(verifyConn) return console.log('MongoDB is Connected');
      }catch(error){
        handleError(error); 
      }
}


