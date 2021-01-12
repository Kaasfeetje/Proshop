import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.DB_URI.replace(
            "<password>",
            process.env.DB_PASSWORD
        );
        const conn = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(
            `MongoDB Connected: ${conn.connection.host}`.cyan.underline
        );
    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDB;
