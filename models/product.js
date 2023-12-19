const app=require("..//app")
const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
  image: String,
  title: String,
  price: Number,
});








module.exports = productSchema;