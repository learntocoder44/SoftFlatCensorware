import mongoose from "mongoose";

const mongodbURL =
"mongodb+srv://durgamabhilash798:BFcB5VLi6ArrCLhO@cluster0.gvluupe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongodbURL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

db.on("connected", () => {
  console.log("MongoDB connected successfully");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default db;
