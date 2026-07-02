require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("./models/itemsModel");
const itemsCollection = require("./itemsCollection");

const seedDatabase = async () => {
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("<your uri")) {
            console.error("❌ ERROR: Please replace the placeholder MONGO_URI in server/.env with your actual MongoDB Atlas connection string first!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB Atlas...");
        
        await Item.deleteMany({});
        console.log("🗑️  Cleared existing items in collection...");
        
        await Item.insertMany(itemsCollection);
        console.log(`🎉 Successfully inserted ${itemsCollection.length} items from itemsCollection.js into your 'items' collection!`);
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
