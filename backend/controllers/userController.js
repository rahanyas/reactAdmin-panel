import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import createToken from "../utils/tokenCreate.js";
import  setTokenCookie  from "../utils/tokenCookies.js";
import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

export const signUp = async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const user = await userModel.signup(name, email, password);
    
    const token = createToken(user._id);
    console.log(token);   

    setTokenCookie(res, token);

    res.json({msg : 'create a new user', user: user._id})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({msg : error.message})
  }

};


export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(400).json({msg : 'this email does not exist'})
    };
    const passCompare = await bcrypt.compare(password, user.password);

    if(!passCompare){
      return res.status(400).json({msg : 'wrong password'})
    }
    const token = createToken(user._id);
    setTokenCookie(res, token)
    res.status(200).json({msg : 'login successfull', user: user._id})
    
  } catch (error) {
    console.log(error.message);
    res.status(400).json({msg : error.message})
  }
};



export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please log in first." });
    }

    const { product } = req.body;
    if (!product || !product.id) {
      return res.status(400).json({ success: false, message: "Invalid product data." });
    }

    // console.log("User:", user);
    // console.log("Product:", product);

    
    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({ user: user._id, items: [{ ...product, quantity: 1 }] });
    } else {
      const existingProduct = cart.items.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Product added to cart successfully!" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ success: false, message: "An error occurred while adding the product to the cart." });
  }
};


export const cartpage = async (req, res) => {
    try {
      const user = req.user;
      console.log(user);

      const cartItems = await Cart.findOne({user : user._id})
      console.log(cartItems);
       
      res.status(200).json({msg : 'cart products', cartItems : cartItems ? cartItems.items : []})
    } catch (err) {
      console.log('error fetching cart',err );
      res.status(500).json({msg : 'internal server error'})
    }
};

export const removeCartItem = async (req, res) => {
  try {
    const user = req.user;
    if(!user){
      return res.status(404).json({msg : 'please log in '})
    };

   const {id} = req.body;
   console.log(id);
   if(!id){
    return res.status(400).json({msg : 'item id is not found'})
   };

  const updateCart = await Cart.findOneAndUpdate(
    { user : new mongoose.Types.ObjectId(user._id)},
    {$pull : {items : {id : id}}},
    {new : true}
  ) 

   if(!updateCart){
    return res.status(404).json({msg : 'cart not found'})
   };

   return res.status(200).json({msg: 'product removed from cart', updateCart })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: 'error occured while deleting the cart item' })
  }
}