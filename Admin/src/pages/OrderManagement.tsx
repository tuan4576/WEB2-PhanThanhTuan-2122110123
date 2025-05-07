import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, CheckCircle, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Order = {
  id: number;
  customerName: string;
  productName: string;
  status: string;
  orderDate: string;
};

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get<Order[]>(
          "http://localhost:8081/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Error fetching orders:", error);
          alert("Có lỗi xảy ra khi tải danh sách đơn hàng");
        }
      }
    };

    fetchOrders();
  }, [navigate]);


  const handleEdit = (id: number) => {
    alert(`Sửa đơn hàng ID: ${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/orders/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa đơn hàng này?");
    if (confirm) {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        await axios.delete(`http://localhost:8081/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(orders.filter((o) => o.id !== id));
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Có lỗi xảy ra khi xóa đơn hàng");
      }
    }
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOrders(newSelected);
  };

  const handleProcessSelected = () => {
    if (selectedOrders.size === 0) {
      alert("Vui lòng chọn đơn hàng để xử lý");
    } else {
      alert(`Xử lý các đơn hàng ID: ${[...selectedOrders].join(", ")}`);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          {/* <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm đơn hàng
          </button> */}
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedOrders.size === orders.length) {
                        setSelectedOrders(new Set());
                      } else {
                        setSelectedOrders(new Set(orders.map(o => o.id)));
                      }
                    }}
                    checked={selectedOrders.size === orders.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên khách hàng</th>
                <th className="text-left p-4">Số điện thoại</th>
                <th className="text-left p-4">Địa chỉ</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.id)}
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </td>
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">{order.phone}</td>
                  <td className="p-4">{order.address}</td>
                  <td className="p-4">{order.email}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleView(order.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                    {/* <button
                      onClick={() => handleEdit(order.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </button> */}
                    {/* <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button> */}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút xử lý cho các đơn hàng đã chọn */}
        {/* <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedOrders.size} đơn hàng
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OrderManagement;
