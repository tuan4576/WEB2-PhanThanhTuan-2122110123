import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Category = {
  id: number;
  name: string;
};

type Brand = {
  id: number;
  name: string;
};

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category_id: 0,
    brand_id: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get<Category[]>("http://localhost:8081/api/categories", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get<Brand[]>("http://localhost:8081/api/brands", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);

        if (categoriesResponse.data.length > 0) {
          setSelectedCategory(categoriesResponse.data[0].id);
        }
        if (brandsResponse.data.length > 0) {
          setSelectedBrand(brandsResponse.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('category_id', selectedCategory.toString());
    formDataToSend.append('brand_id', selectedBrand.toString());
    if (selectedFile) {
      formDataToSend.append('image', selectedFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8081/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        navigate('/productmanagement');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              name="category_id"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="w-full border rounded-md p-2"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Thương hiệu</label>
            <select
              name="brand_id"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(Number(e.target.value))}
              className="w-full border rounded-md p-2"
              required
            >
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Giá</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hình ảnh</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-md p-2"
              accept="image/*"
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/productmanagement')}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
