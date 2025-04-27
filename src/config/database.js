

const mongoose = require("mongoose")

const connectDB= async ()=>{
    await mongoose.connect(
        "mongodb+srv://mrrahulgupta29:IETuvyAcTZctlweS@dev-buddies.fwlkkos.mongodb.net/?retryWrites=true&w=majority&appName=dev-Buddies"
    );
}

module.exports = connectDB;
