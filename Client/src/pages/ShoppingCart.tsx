import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  brand: Brand;
  category: Category;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  user: User;
}

function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token || !userId) return;

        const response = await axios.get(`http://localhost:8081/api/carts/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCartItems(response.data || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartItems([]);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (cartItemId: number, change: number) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) return;

      await axios.put(
        `http://localhost:8081/api/carts/${cartItemId}`,
        {
          quantity: change
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Refresh cart data
      const response = await axios.get(`http://localhost:8081/api/carts/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setCartItems(response.data || []);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveProduct = async (cartItemId: number) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) return;

      // Remove item locally first for better UX
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));

      await axios.delete(
        `http://localhost:8081/api/carts/${cartItemId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

    } catch (error) {
      console.error('Error removing product:', error);
      // If deletion fails, refresh cart to restore original state
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) return;
      
      const response = await axios.get(`http://localhost:8081/api/carts/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCartItems(response.data || []);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img 
                  src={`http://localhost:8081/images/${item.product.image}`}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium">{item.product.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 font-medium">Giá: {item.product.price.toLocaleString()} VND</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 border-r hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-3 py-1 border-l hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-medium text-blue-600">Tổng tiền: {calculateTotal().toLocaleString()} VND</p>
              <Link to="/checkout">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                  Thanh toán
                </button>
              </Link>
            </div>
          )}
        </div>

        {cartItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Không có sản phẩm trong giỏ hàng</p>
            <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
