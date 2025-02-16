import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import baseApi from "../../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch  {
        setMessage({ type: "error", text: "Failed to load products. Please try again." });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await baseApi.post("/user/cart", { product });

      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
      } else {
        setMessage({ type: "error", text: response.data.message || "Failed to add product to cart." });
      }
    } catch {
      setMessage({ type: "error", text: "Error adding to cart. Please try again." });
    }
  };

  return (
    <div>
      <Navbar />
      {/* Notification Message */}
   
      {message.text && (
        <div
          className={`text-white px-4 py-2 text-center ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}
   

      <div className="container mx-auto p-4">
        {loading ? (
          <div className="text-center text-gray-600 font-semibold">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                <img src={item.image} alt={item.title} className="h-40 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-center mb-2">{item.title}</h2>
                <p className="text-gray-600 font-bold mb-4">${item.price}</p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full transition ease-in duration-300 cursor-pointer"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
