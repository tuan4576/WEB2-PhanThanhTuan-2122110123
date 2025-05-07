import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, CheckCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Brand = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  brand: Brand;
  category: Category;
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8081/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setProducts(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Error fetching products:", error);
          alert("Có lỗi xảy ra khi tải danh sách sản phẩm");
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleAdd = () => {
    navigate('/addproduct');
  };

  const handleEdit = (id: number) => {
    navigate(`/editproduct/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (confirm) {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        await axios.delete(`http://localhost:8081/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh products after deletion
        const response = await axios.get<Product[]>(
          "http://localhost:8081/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setProducts(response.data);
        alert("Xóa sản phẩm thành công");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Error deleting product:", error);
          alert("Có lỗi xảy ra khi xóa sản phẩm");
        }
      }
    }
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const handleProcessSelected = () => {
    if (selectedProducts.size === 0) {
      alert("Vui lòng chọn sản phẩm để xử lý");
    } else {
      alert(`Xử lý các sản phẩm ID: ${[...selectedProducts].join(", ")}`);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Thêm sản phẩm
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl mb-6">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedProducts.size === products.length) {
                        setSelectedProducts(new Set());
                      } else {
                        setSelectedProducts(new Set(products.map(p => p.id)));
                      }
                    }}
                    checked={products && selectedProducts.size === products.length}
                  />
                </th>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Hình ảnh</th>
                <th className="text-left p-4">Tên sản phẩm</th>
                <th className="text-left p-4">Giá</th>
                <th className="text-left p-4">Thương hiệu</th>
                <th className="text-left p-4">Danh mục</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-200">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                  </td>
                  <td className="p-4">{product.id}</td>
                  <td className="p-4">
                    <img 
                      src={`http://localhost:8081/images/${product.image}`} 
                      alt={product.name} 
                      className="w-24 h-24 object-cover rounded" 
                    />
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.price.toLocaleString()}₫</td>
                  <td className="p-4">{product.brand.name}</td>
                  <td className="p-4">{product.category.name}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!products.length && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleProcessSelected}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Xử lý {selectedProducts.size} sản phẩm
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductManagement;
