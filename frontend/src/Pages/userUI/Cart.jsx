import { useEffect, useState } from "react";
import useUser from "../../context/UserContext"; 
import baseApi from "../../utils/api";
import Navbar from "../../components/Navbar";

const Cart = () => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await baseApi.get("/user/showCart");
      const { cartItems } = response.data;
      setItems(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  
  const removeItem = async (id) => {
    try {
       const response = await baseApi.delete('/user/removeCartItem', {data : { id}});
       const json = await response.data;
       console.log(json);
      setItems((prev) => prev.filter((item) => item.id !== id))  
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
    <Navbar /> 
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((elm) => (
            <div key={elm.id} className="border p-4 rounded-lg shadow-lg bg-white">
              <img src={elm.image} alt={elm.title} className="w-full h-48 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{elm.title}</h2>
              <p className="text-gray-700">${elm.price}</p>
              <p className="text-sm text-gray-500">Quantity: {elm.quantity}</p>
              <button
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full cursor-pointer"
                onClick={() => removeItem(elm.id)}
              >
                Remove Item
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No items in the cart</p>
      )}
    </div>
    </div>
  );
};

export default Cart;

