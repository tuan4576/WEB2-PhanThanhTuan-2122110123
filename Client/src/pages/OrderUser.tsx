import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderUser = () => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [products, setProducts] = useState<{[key: string]: any}>({});
  const { orderId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await axios.get(
          `http://localhost:8081/api/order-details/order/${orderId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setOrderDetails(response.data);
        
        // Fetch product details for each order detail
        const productDetails: {[key: string]: any} = {};
        for (const detail of response.data) {
          if (detail.productId) {
            const productResponse = await axios.get(
              `http://localhost:8081/api/products/${detail.productId}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            );
            productDetails[detail.productId] = productResponse.data;
          }
        }
        setProducts(productDetails);
        
      } catch (error) {
        console.error("Error loading order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, token]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Chi Tiết Đơn Hàng #{orderId}</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderDetails.map((detail) => (
                  <tr key={detail.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-20 w-20 flex-shrink-0">
                          <img 
                            className="h-20 w-20 rounded-md object-cover" 
                            src={products[detail.productId]?.image ? `http://localhost:8081/images/${products[detail.productId].image}` : 'placeholder.jpg'} 
                            alt={products[detail.productId]?.name || 'Product Image'}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {products[detail.productId]?.name}
                          </div>
                          {/* <div className="text-sm text-gray-500">
                            {products[detail.productId]?.description}
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(detail.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(detail.price * detail.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-700">
                    Tổng cộng: {formatPrice(orderDetails.reduce((sum, detail) => sum + (detail.price * detail.quantity), 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUser;
