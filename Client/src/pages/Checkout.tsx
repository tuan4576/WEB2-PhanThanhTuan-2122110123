import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  note: string;
  email: string;
}

interface CartItem {
  id: number;
  product: {
    id: number;
    price: number;
    name: string;
    image: string;
  };
  quantity: number;
}

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    note: '',
    email: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/auth/login');
          return;
        }

        const response = await axios.get(`http://localhost:8081/api/carts/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCartItems(response.data || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate('/auth/login');
        }
      }
    };

    fetchCart();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('email');
      
      if (!token || !userId) {
        navigate('/auth/login');
        return;
      }

      // Create order with updated structure
      const orderResponse = await axios.post('http://localhost:8081/api/orders', 
        {
          name: formData.name,
          email: userEmail,
          phone: formData.phone,
          address: formData.address,
          user: {
            id: parseInt(userId)
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const orderId = orderResponse.data.id;

      // Create order details for each cart item
      for (const item of cartItems) {
        await axios.post('http://localhost:8081/api/order-details',
          {
            orderId,
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      // Clear cart and redirect
      navigate('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/auth/login');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b last:border-0">
                <img 
                  src={`http://localhost:8081/images/${item.product.image}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  <p className="text-blue-600">{(item.product.price * item.quantity).toLocaleString()} VND</p>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="text-xl font-bold text-blue-600">{calculateTotal().toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Đặt hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
