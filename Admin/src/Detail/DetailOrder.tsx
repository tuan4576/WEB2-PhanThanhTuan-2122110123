import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type OrderDetail = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
};

type Product = {
  id: number;
  name: string;
  image: string;
}

const DetailOrder: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<{[key: number]: Product}>({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get<OrderDetail[]>(
          `http://localhost:8081/api/order-details/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setOrderDetails(response.data);

        // Fetch product details for each order detail
        const productDetails: {[key: number]: Product} = {};
        for (const detail of response.data) {
          const productResponse = await axios.get<Product>(
            `http://localhost:8081/api/products/${detail.productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          productDetails[detail.productId] = productResponse.data;
        }
        setProducts(productDetails);

      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Error fetching order details:", error);
          alert("Có lỗi xảy ra khi tải chi tiết đơn hàng");
        }
      }
    };

    fetchOrderDetails();
  }, [navigate, id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">ID</th>
            <th className="px-6 py-3 border-b">Sản phẩm</th>
            <th className="px-6 py-3 border-b">Hình ảnh</th>
            <th className="px-6 py-3 border-b">Số lượng</th>
            <th className="px-6 py-3 border-b">Giá</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((detail) => (
            <tr key={detail.id}>
              <td className="px-6 py-4 border-b text-center">{detail.id}</td>
              <td className="px-6 py-4 border-b text-center">
                {products[detail.productId]?.name}
              </td>
              <td className="px-6 py-4 border-b text-center">
                <img 
                  src={`http://localhost:8081/images/${products[detail.productId]?.image}`}
                  alt={products[detail.productId]?.name}
                  className="w-20 h-20 object-cover mx-auto"
                />
              </td>
              <td className="px-6 py-4 border-b text-center">{detail.quantity}</td>
              <td className="px-6 py-4 border-b text-center">{detail.price.toLocaleString()} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailOrder;
