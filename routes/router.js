const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// get productsdata API
router.get("/getproducts", async(req,res)=>{
    try {
        const productsdata = await Products.find();
        //console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});



// Get individual data
router.get("/getproductsone/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        // console.log(id);

        const individualdata = await Products.findOne({id:id});
        
        //console.log(individualdata + "individual data get for me.... My name is Akash Gogoi");

        res.status(201).json(individualdata);


    } catch (error) {
        res.status(201).json(individualdata);
        console.log("error" + error.message);
    }
});


// register data

router.post("/register",async(req,res)=>{
    //console.log(req.body)      ==this console.log use for console the data from the API call, this data will not show on the MONGODB Databases.

    const {fname,email,mobile,password,cpassword} = req.body;

    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error:"fill the all data"});
        console.log("not data available");
    };

    try{
        const preuser = await USER.findOne({email:email});

        if(preuser){
            res.status(422).json({error:"this user is already exist"})
        }else if(password !== cpassword){
            res.status(422).json({error:"password and cpassword not match"})
        }else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            });

            // Akash -> Encrypted = 455as5421sf5asklas44as ->> Decrypt = Akash
            // bcryptjs

            // Password hasing process


            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }
    }catch(error){

    }
});


// Login user API

router.post("/login", async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"fill all the data"})
    };

    try {
        const userlogin = await USER.findOne({email:email});
        console.log(userlogin + "user value");

        if(userlogin){
            const isMatch = await bcrypt.compare(password,userlogin.password);
            console.log(isMatch + "password matched...");

            // token generate
            const token = await userlogin.generateAuthtoken();
            ///// console.log(token);


            res.cookie("Amazonweb",token,{
                expires: new Date(Date.now() + 90000000000),
                httpOnly: true
            })

            if(!isMatch){
                res.status(400).json({error:"invalid details and password"})
            }else{
                res.status(201).json(userlogin)
            }
        }else{
            res.status(400).json({error:"invalid password"}); 
        }
    } catch (error) {
        res.status(400).json({error:"invalid details"})
    }
})


// adding the data into Cart

router.post("/addcart/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart + "cart value");

        const UserContact = await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error:"INVALID USER IN ROUTER.JS"});
        }
  
    } catch (error) {
        res.status(401).json({error:"INVALID USER IN ROUTER.JS"});
    }
});


// Get cart details

router.get("/cartdetails", authenticate,async(req,res)=>{
    try {
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error)       
    }
})

// get valid user

router.get("/validuser", authenticate,async(req,res)=>{
    try {
        const validuser = await USER.findOne({_id:req.userID});
        res.status(201).json(validuser);
    } catch (error) {
        console.log("error" + error)       
    }
})


// remove item from cart
router.delete("/remove/:id", authenticate,async(req,res)=>{
    try {
        const {id} = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
            return cruval.id != id;
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed");
    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser);
    }
})



// token1, token2, token3, token4

// for user Logout
router.get("/logout", authenticate,(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currElem)=>{
            return currElem.token !== req.token
        });

        res.clearCookie("Amazonweb",{path:"/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user Logout");
    } catch (error) {
        // res.status(01).json(req.rootUser.tokens);
        console.log("error for user Logout");
    }
})



// CHAT GPT NEW CODE MODIFIED===========================

// adding the data into Cart
// router.post("/addcart/:id", authenticate, async (req, res) => {
//     try {
//       const { id } = req.params;
//       const cart = await Products.findOne({ id: id });
//       console.log(cart + "cart value");
  
//       const currentUser = req.rootUser;
//       console.log(currentUser);
  
//       if (currentUser) {
//         currentUser.cart.push(cart);
//         await currentUser.save();
//         console.log(currentUser.cart);
//         res.status(201).json(currentUser);
//       } else {
//         res.status(401).json({ error: "INVALID USER IN ROUTER.JS" });
//       }
  
//     } catch (error) {
//       res.status(401).json({ error: "INVALID USER IN ROUTER.JS" });
//     }
//   });
  







// CHAT GPT API
// Add to cart API

// router.post("/addtocart/:id/:userID",authenticate, async (req, res) => {
//     try {
//       const { id, userID } = req.params;
  
//       // Check if the user ID associated with the cart data matches the currently logged-in user's ID
//       if (userID !== req.session.userID) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }
  
//       // Add the product ID to the user's cart
//       const UserContact = await USER.findById(req.userID);
//       UserContact.cart.push(id);
//       await UserContact.save();

//       res.status(201).json(UserContact.cart);
//     } catch (error) {
//       console.log("Error adding to cart", error.message);
//       res.status(500).json({ error: "Server error" });
//     }
//   });
  
  


module.exports = router;