import mongoose from "mongoose";

if (!process.env.DATABASE_URL){
    throw new Error('Please add the DATABASE_URL environment variable')
}

const DATABASE_URL : string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { connection: null, promise: null};
}

async function connectDb() {
    if (cached.connection){
        return cached.connection
    }
    if (!cached.promise){
        const options = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    cached.promise = mongoose.connect(DATABASE_URL, options).then((mongoose) => {
        console.log('Connected to database');
        return mongoose;
    }).catch((err) => {
        console.log(err as Error)
        console.log(`Something went wrong ${err.message}`)
    })
    }
    cached.connection = await cached.promise;
 
    return cached.connection;
}

export default connectDb;