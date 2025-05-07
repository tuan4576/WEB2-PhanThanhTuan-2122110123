import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBrand() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    try {
      await axios.post('http://localhost:8081/api/brands', 
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/brandmanagement');
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/auth/login');
      }
      console.error('Error creating brand:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm thương hiệu mới</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên thương hiệu
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
            >
              Thêm thương hiệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;
