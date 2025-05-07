import { useState, useEffect } from 'react';
import axios from 'axios';
import noUiSlider from 'nouislider';
import { Link } from 'react-router';

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
  price: number;
  brand: Brand;
  category: Category;
}

function Search() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [brandsRes, categoriesRes, productsRes] = await Promise.all([
          axios.get('http://localhost:8081/api/brands', { headers }),
          axios.get('http://localhost:8081/api/categories', { headers }),
          axios.get('http://localhost:8081/api/products', { headers })
        ]);
        setBrands(brandsRes.data);
        setCategories(categoriesRes.data);
        setAllProducts(productsRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    let filteredProducts = [...allProducts];

    // Filter by search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.id === selectedBrand
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.id === selectedCategory
      );
    }

    // Filter by price range
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setProducts(filteredProducts);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      await axios.post('http://localhost:8081/api/carts', 
        {
          product: {
            id: productId
          },
          quantity: 1,
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
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Bộ lọc tìm kiếm</h2>
            
            {/* Search input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Brand filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Thương hiệu</h3>
              <select 
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedBrand(Number(e.target.value))}
              >
                <option value="">Tất cả thương hiệu</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Danh mục</h3>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Khoảng giá</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-[45%] p-2 border rounded"
                    placeholder="Từ"
                  />
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-[45%] p-2 border rounded"
                    placeholder="Đến"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Áp dụng
            </button>
          </div>

          {/* Products grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-white shadow-lg border rounded-2xl p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 relative hover:shadow-2xl">
                  <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                    </svg>
                  </div>
                  <Link to={`/product/${product.id}`} className="cursor-pointer">
                    <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                      <div className="block h-full w-full transition-transform duration-300">
                        <img src={`http://localhost:8081/images/${product.image}`} className="h-full w-full object-cover rounded-xl" alt={product.name} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-300">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-blue-500">{product.price.toLocaleString('vi-VN')} VND</span>
                        </div>
                        <button 
                          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search
