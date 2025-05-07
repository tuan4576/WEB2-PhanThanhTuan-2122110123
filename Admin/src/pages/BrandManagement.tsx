import { useState, useEffect } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BrandManagement() {
  const [brands, setBrands] = useState<{id: number, name: string}[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }
    fetchBrands(token);
  }, [navigate]);

  const fetchBrands = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:8081/api/brands', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBrands(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth/login');
      }
      console.error('Error fetching brands:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')) {
      try {
        await axios.delete(`http://localhost:8081/api/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchBrands(token);
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth/login');
        }
        console.error('Error deleting brand:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý thương hiệu</h1>
        <Link 
          to="/addbrand"
          className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
        >
          Thêm thương hiệu
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Tên thương hiệu</th>
              <th className="px-6 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{brand.id}</td>
                <td className="px-6 py-4">{brand.name}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Link 
                      to={`/editbrand/${brand.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <BiEdit size={20} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(brand.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <BiTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandManagement;
