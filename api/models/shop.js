const mongoose= require("mongoose"); 

const reqString = {
    type: String,
    required: true
}
const itemSchema = mongoose.Schema({
    name: String,
    department: String,
}); 

const shopSchema = mongoose.Schema({
    name: reqString,
    category: reqString,
    established: Number,
    items: [itemSchema]
});
    
module.exports = mongoose.model('Shop', shopSchema, 'shops');
