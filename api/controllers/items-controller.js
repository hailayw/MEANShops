const { isValidObjectId } = require('mongoose');
const Shop = require('../models/shop');
const { updateOneById, deleteOneById } = require('./shops-controller');

function _addItem(req, res, shop) {
    const newItem = req.body;    
    shop.items.push(newItem);

    shop.save((err, savedItem) => {
        const response = {
            status : 200,
            message : savedItem
        }
        if(err) {
            response.status = 500;
            response.message = err;
        }
        console.log("Created item" + response.message);
        res.status(response.status).json(savedItem);        
    });
}

function _updateItem(req, res, shop) {
    const updates = req.body;
    const itemId = req.params.itemId;

    //update
    const item = shop.items.id(itemId);
    
    if(!item) {
        res.status(404).json({"message" : "Item Id not found"});
        return;
    }
    
    shop.items.id(itemId).name = updates.name;
    shop.items.id(itemId).department = updates.department

    shop.save((err, updatedItem) => {
        const response = {
            status : 200,
            message : updatedItem
        }
        if(err) {
            response.status = 500;
            response.message = err;
        }
        console.log("Created item" + response.message);
        res.status(response.status).json(response.message);        
    });
}

//create
addOne = (req, res) => {
    //target Id
    const shopId = req.params.shopId;    
    
    //validate Id
    if(!isValidObjectId(shopId)) {
        res.status(400).json({"message" : "Invalid shop Id"});        
        return;
    }            
    Shop.findById(shopId).select("items").exec(function (err, shop) {          
        let response = { 
            status: 200, 
            message: shop.items
        }
        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding shop: ");
        } else if (!shop) {
            response.status = 404,
            response.message = {"message" : "Shop Id not found"};
            console.log("Shop Id not found");
        } else if (shop) {                      
            _addItem(req, res, shop); 
            return;
        }        
        res.status(response.status).json(response.message);        
    });    
}   

//read all
getAll = (req, res) => {
    const shopId = req.params.shopId;
    
    //validate Id
    if(!isValidObjectId(shopId)) {
        res.status(400).json({"message" : "Invalid shop Id"});        
        return;
    }
        
    Shop.findById(shopId).select("items").exec(function (err, shop) {          
        let response = { 
            status: 200, 
            message: shop.items
        }
                
        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding shop: ");
        } else if (!shop) {
            response.status = 404,
            response.message = {"message" : "Shop Id not found"};
            console.log("Shop Id not found");
        } else {                        
            console.log("Found Items ", response.message, " for Shop ", shop.name);
            res.status(response.status).json(response.message);
        }        
    });

}

//read one
getOne = (req, res) => {
    const shopId = req.params.shopId;
    const itemId = req.params.itemId;

    //validate Id
    if(!isValidObjectId(shopId) && !isValidObjectId(itemId)) {
        res.status(400).json({"message" : "Invalid shop Id or item Id"});        
        return;
    } 
       
    Shop.findById(shopId).select("items").exec(function (err, shop) {          
        let response = { 
            status: 200, 
            message: ''//if message = shop.items.id(itemId); code will break when shopId is not found
        }
        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding shop: ");
        } else if (!shop) {
            response.status = 404,
            response.message = {"message" : "Shop Id not found"};
            console.log("Shop Id not found");
        } else {               
            //if item is found   
            if(response.message) {
                response.message = shop.items.id(itemId);
                console.log("Found Item ", response.message);
            }
            else{
                response.status = 404,
                response.message = {"message" : "Item Id not found"};
                console.log("Item Id not found");
            }          
        }        
        res.status(response.status).json(response.message);
    });
}

//update
updateOne = (req, res) => {
    //target Id
    const shopId = req.params.shopId;    
    const itemId = req.params.itemId;

    //validate Id
    if(!isValidObjectId(shopId) && !isValidObjectId(itemId)) {
        res.status(400).json({"message" : "Invalid shop (or item) Id"});        
        return;
    }
            
    Shop.findById(shopId).select("items").exec(function (err, shop) {          
        let response = { 
            status: 200, 
            message: shop.items
        }

        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding shop: ");
        } else if (!shop) {
            response.status = 404,
            response.message = {"message" : "Shop Id not found"};
            console.log("Shop Id not found");
        } else if (shop) {
            _updateItem(req, res, shop); 
            return;
        }        
        res.status(response.status).json(response.message);        
    });    
}   

//delete
deleteOne = (req, res) => {
    //target Id
    const shopId = req.params.shopId;    
    const itemId = req.params.itemId;

    //validate Id
    if(!isValidObjectId(shopId) && !isValidObjectId(itemId)) {
        res.status(400).json({"message" : "Invalid shop (or item) Id"});        
        return;
    }
            
    Shop.findById(shopId).select("items").exec(function (err, shop) {          
        let response = { 
            status: 200, 
            message: ''//if shop.items.id(itemId)
        }
        if (err)  {
            response.status = 500;
            response.message = err;            
            console.log("Error finding shop: ");
        } else if (!shop) {
            response.status = 404,
            response.message = {"message" : "Shop Id not found"};
            console.log("Shop Id not found");
        } else if (shop) {
            //update
            const item = shop.items.id(itemId);            
            if(!item) {
                response.status = 404;
                response.message = {"message" : "Item Id not found"};                
            } else {
                shop.items.id(itemId).remove();
                shop.save();
                response.status = 200;
                response.message = {"message" : "Item successfully deleted"};
            }            
        }     
        //shop.items.id().remove()   
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
