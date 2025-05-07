import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Address = {
  addressId: number;
  street: string;
  buildingName: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

type Cart = {
  cartId: number;
  totalPrice: number;
  products: any[];
};

type User = {
  id: number;
  name: string;
  // lastName: string;
  phone: string;
  email: string;
  role: string;
  address: Address;
  cart: Cart;
};

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8081/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(response.data || []);
      setTotalPages(Math.ceil((response.data?.length || 0) / pageSize));
      setLoading(false);

    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      setError(error.message || 'An error occurred');
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edituser/${id}`);
  };

  const handleDelete = async (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    if (userToDelete?.role === 'ADMIN') {
      alert('Không thể xóa tài khoản ADMIN');
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        await axios.delete(`http://localhost:8081/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        fetchUsers();
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
          return;
        }
        setError(error.message || 'Failed to delete user');
      }
    }
  };
  

  const handleAdd = () => {
    navigate('/adduser');
  };

  if (loading) {
    return <div className="w-full p-6">Loading...</div>;
  }

  if (error) {
    return <div className="w-full p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm người dùng
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Số điện thoại</th>
                <th className="text-left p-4">Vai trò</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="p-4">{user.id}</td>
                  <td className="p-4">{`${user.name}`}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    {user.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPageNumber(prev => Math.max(0, prev - 1))}
              disabled={pageNumber === 0}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Trước
            </button>
            <span className="px-4 py-2">
              Trang {pageNumber + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPageNumber(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={pageNumber === totalPages - 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
