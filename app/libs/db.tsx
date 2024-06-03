import mongoose from 'mongoose';

const mongourl = process.env.MONGO_URL as string;
if (!mongourl) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env');
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(mongourl, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;


 