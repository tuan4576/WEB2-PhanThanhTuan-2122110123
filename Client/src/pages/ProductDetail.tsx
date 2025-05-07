import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth/login');
          return;
        }

        const response = await axios.get(`http://localhost:8081/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate('/auth/login');
        }
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        navigate('/auth/login');
        return;
      }

      await axios.post('http://localhost:8081/api/carts',
        {
          product: {
            id: product?.id
          },
          quantity: quantity,
          user: {
            id: Number(userId)
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Thêm vào giỏ hàng thành công!');

    } catch (error) {
      console.error('Error adding to cart:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/auth/login');
      }
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng!');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={`http://localhost:8081/images/${product.image}`}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <p className="text-xl font-semibold text-blue-600">
                  Giá: {product.price.toLocaleString()} VND
                </p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">
                  <span className="font-medium">Thương hiệu:</span> {product.brand.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Danh mục:</span> {product.category.name}
                </p>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border-r hover:bg-gray-100"
                    disabled={isAddingToCart}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border-l hover:bg-gray-100"
                    disabled={isAddingToCart}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md transition duration-200 ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang thêm...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Thêm vào giỏ hàng</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
