import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import baseApi from "../utils/api";
const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {  
      const response = await baseApi.post('/user/cart', {
        product
      });
      console.log('added to cart', response.data);
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products &&
            products.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img src={item.image} alt={item.title} className="h-40 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-center mb-2">{item.title}</h2>
                <p className="text-gray-600 font-bold mb-4">${item.price}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full cursor-pointer transition ease-in duration-300" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
