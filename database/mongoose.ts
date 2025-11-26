import mongoose from 'mongoose';
import { buffer } from 'stream/consumers';

const MONGODB_URI = process.env.MONGODB_URI

declare global {
    var mongooseCatche: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let catched = global.mongooseCatche;

if (!catched) {
    catched = global.mongooseCatche = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

    if (catched.conn) return catched.conn;

    if (!catched.promise) {
        catched.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }

    try {
        catched.conn = await catched.promise;
    } catch (err) {
        catched.promise = null;
        throw err;
    }
}

console.log(`Connected to database ${process.env.NODE_ENV} ${MONGODB_URI}`);