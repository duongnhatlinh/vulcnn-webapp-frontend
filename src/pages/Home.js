import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-600">
            VulCNN Web Application
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Công cụ phân tích và phát hiện lỗ hổng bảo mật trong mã nguồn
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/login"
              className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="ml-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
