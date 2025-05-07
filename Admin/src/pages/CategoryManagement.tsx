import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};

type CategoryResponse = {
  content: Category[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
};

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get<Category[]>(
        "http://localhost:8081/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [navigate]);

  const handleAdd = () => {
    navigate('/addcategory');
  };

  const handleEdit = (id: number) => {
    navigate(`/editcategory/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa danh mục này?");
    if (confirm) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8081/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Fetch categories again after successful deletion
        await fetchCategories();
        alert("Xóa danh mục thành công");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Có lỗi xảy ra khi xóa danh mục");
      }
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm danh mục
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Tên danh mục</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-gray-200">
                  <td className="p-4">{category.id}</td>
                  <td className="p-4">{category.name}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    Không có danh mục nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
