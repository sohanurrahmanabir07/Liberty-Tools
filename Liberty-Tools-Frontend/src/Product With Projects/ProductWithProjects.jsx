
import { FaPlus, FaLink } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
export const ProductWithProjects = () => {

  const { products } = useOutletContext()

  const navigate = useNavigate()

  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="w-full max-w-[1340px] mx-auto py-10 px-5 " data-aos="fade-up"
      data-aos-duration="1500">
      {/* Section Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-14 h-1 bg-orange-500 rounded"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
            Products
          </h2>
          <span className="w-14 h-1 bg-orange-500 rounded"></span>
        </div>
      </div>
      {/* Image Grid */}

      <div className="flex justify-end mb-4" onClick={()=>navigate("/all-products")}>
        <p className="hover:scale-x-105 transition-all duration-300 cursor-pointer font-semibold hover:underline text-orange-500"> View All Products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products && products.slice(0,6).map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/products/${item?.model}`)}
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            className="relative group  rounded-xl border-2 border-orange-500 overflow-hidden aspect-[4/3] cursor-pointer"
          >
            {/* Background image */}
            <div
              className="w-full h-full absolute top-0 left-0 bg-cover bg-center transition duration-300 group-hover:brightness-50"
              style={{ backgroundImage: `url(${item?.imageUrl[0]})` }}
            />
            {/* Hovered Icons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <div className="flex gap-4 mb-4">

                <button className="bg-opacity-80 rounded-full p-3 cursor-pointer shadow bg-orange-500 transition">
                  <FaLink className="text-gray-700 group-hover:text-white" size={20} />
                </button>
              </div>
              <div className="text-white text-lg font-semibold drop-shadow-md text-center">
                Product {idx + 1}<br />

              </div>
            </div>
            {/* Label for card 2 as in screenshot */}
            {(
              <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded font-semibold text-sm z-20">
                {item?.model.toUpperCase()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
