import { Link } from 'react-router';
import logo from '../../assets/imgae/logo-01.png';
import { useState } from 'react';

function Header() {
  const token = localStorage.getItem('token');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Force page reload
    window.location.href = "/";
  };

  return (
    <>
        <div className=" sticky top-0 left-0 w-full flex items-center justify-around px-4 py-4 shadow-md bg-white z-50">
          <div className="flex items-center space-x-2">
            <img src={logo}  alt="logo" className="h-4" />
          </div>
          <nav className="flex justify-center space-x-4">
            <a href="/" className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Tranng chủ</a>
            <a href="/team" className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Danh mục</a>
            <a href="/news" className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Tin tức</a>
            <a href="/contact" className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Liên hệ</a>
          </nav>
          <div className="flex items-center space-x-4 mr-">
          <form className="flex items-center max-w-sm mx-auto mr-20" onSubmit={(e) => {
            e.preventDefault();
            window.location.href = '/search';
          }}>   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <input 
                type="text" 
                id="simple-search" 
                className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:placeholder-gray-400 dark:text-gray cursor-pointer" 
                placeholder="Bạn cần tìm dì..." 
                required
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/search';
                }}
                readOnly
              />
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium  rounded-lg border  bg-gray-100 hover:bg-gray-200 shadow-xl cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-30">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
            
            {/* <a href="/wishlish">
            <div className="h-10 w-10  flex items-center justify-center rounded-full  bg-gray-100 hover:bg-gray-200 shadow-xl cursor-pointer ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            </div>
            </a> */}
            <a href="/shoppingcart">
            <div className="h-10 w-10  flex items-center justify-center rounded-full  bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
              </svg>
            </div>
              </a>
              {token ? (
                  <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-2 cursor-pointer">
                    <img src="https://www.webiconio.com/_upload/255/image_255.svg" 
                         alt="user" 
                         className="h-10 w-10 rounded-full bg-gray-100"
                    />
                    {/* <span className="text-gray-700">{userName}</span> */}
                    {showDropdown && (
                      <ul className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-48">
                        <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Đăng xuất
                        </li>
                        <Link to="/orderdetail">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Chi tiết đơn hàng
                          </li>
                        </Link>
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link to="/auth/login">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </Link>
                )}
          </div>
      </div>

     
    </>
  )
}

export default Header
