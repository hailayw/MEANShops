const { isValidObjectId } = require('mongoose');
const Shop = require('../models/shop');

//create
addOne = (req, res) => {
    let response = {
        status: 201,
        message: ''
    };
    console.log('request received: ', req.body);
    let newShop = req.body;
    const shop = new Shop(newShop);
    console.log('created shop', shop);
    
    shop.save((err, doc)=>{
        if(err) {
            response.status = 500;
            response.message = err;
        } else {
            response.message = doc;
            console.log("Created document", response.message);
        }
        res.status(response.status).json(response.message);//response.message);                
    });        
}

//read
getAll = (req, res)=> {   
    let response = {
        status: 200,
        message: ''
    };

    //if there is a query, count will be what the user specifies 
    //but not exceeding maxcount
    if(req.query.count) {        
        count = parseInt(req.query.count);
        if(isNaN(count)) {
            response.status = 400;
            response.message = {"message:" : "Query string count should be digit"};
            res.status(response.status).json(response.message);                
            return;
        }
            
        if(count > parseInt(process.env.FIND_COUNT_MAX)) {
            response.status = 400; //bad request
            response.message = {"message":"Count should not exceed LIMIT "+ process.env.FIND_COUNT_MAX};

            res.status(response.status).json(response.message);
        }
        else {                
            Shop.find().limit(count).exec((err, shops) => {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else{                    
                    response.message = shops;                    
                    console.log('Found Shops: ', response.message);
                }                
                res.status(response.status).json(response.message);                
            });    
        }        
    }
    
    //if there is no query, get all existing documents
    else {      
        count = process.env.FIND_COUNT_MAX        
        Shop.find().exec((err, shops) => {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {                
                response.message = shops;
                console.log('Found shops', response.message);
            }                                
            res.status(response.status).json(response.message);
        });          
    }
}

//read by id
getOne = (req, res)=>{
    const shopId = req.params.shopId;
       
    //validate Id
    if(!isValidObjectId(shopId)) {
        res.status(400).json({"message" : "Invalid shop Id"});        
        return;
    }
    
    Shop.findById(shopId).exec((err, result)=> {
        let response = {
            status: 200,
            message: ''
        };
        
        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding shop: ");
        } else if (!result) {
            response.status = 404,
            response.message = {"message" : "Shop Id not found"};
            console.log("Shop Id not found");
        } else {            
            response.message = result;
            console.log("Found shop: ", response.message);
        }
        res.status(response.status).json(response.message);
    });
}

//update
updateOne = (req, res)=>{
    //target Id
    const shopId = req.params.shopId;    
    //updates
    const updates = req.body;
    
    //validate Id
    if(!isValidObjectId(shopId)) {
        res.status(400).json({"message" : "Invalid shop Id"});        
        return;
    }
    
    Shop.findByIdAndUpdate(shopId, updates, {new:true}).exec((err, updatedShop) => {            
        let response = {
            status: 200,
            message: ''//updatedShop,
        };
        if(err) { 
            response.status = 500;
            response.message = err;
            console.log("Error updating shop");
        } else if (!updatedShop) {
            response.status = 400; 
            response.message = {"message" : "Shope Id not found"};
            console.log("Shop id not found");
        } else {            
            response.message = updatedShop;
            console.log("Updated shop: ", response.message);
        }
        res.status(response.status).json(response.message);
    });            
    
}   

//delete
deleteOne = (req, res) => {
    const shopId = req.params.shopId;

    //validate Id
    if(!isValidObjectId(shopId)) {
        res.status(400).json({"message" : "Invalid shop Id"});        
        return;
    }
    
    Shop.findByIdAndDelete(shopId).exec((err, deletedShop)=> {        
        const response = {
            status: 204,
            message: deletedShop
        };

        if(err) {            
            response.status = 500; //500 - internal error
            response.message = err;
            console.log('Error finding shop.');
        }
        //if not found        
        else if (!deletedShop) {
            response.status = 404;
            response.message = {"message" : "Shop Id not found"};
            console.log('Shop Id not found');
        }
        //on success
        else {
            response.message = deletedShop;
            console.log('Deleted shop: ', response.message);          
        }
        console.log('Deleted shop-outside: ', response.message);
        res.status(response.status).json(response.message);        
    });

}

module.exports = {
    addOne,
    getOne,
    getAll,    
    updateOne,
    deleteOne
}