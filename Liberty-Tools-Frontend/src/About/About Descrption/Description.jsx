
import React, { useEffect } from "react";
import { FaRegCalendarAlt, FaRegSun, FaRegStar } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import image from "../../assets/img/features-3-2.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import wareHouse from "../../assets/img/warehouse.jpg"

import { FaWarehouse, FaBoxes, FaTruckLoading, FaTools } from "react-icons/fa";
export const Description = () => {
    const warehouseFeatures = [
        {
            icon: <FaWarehouse className="text-orange-500 text-3xl" />,
            title: "Spacious Warehouse",
            desc: "Our modern warehouse ensures safe and organized storage for all tools and power products, enabling quick access and efficient handling.",
        },
        {
            icon: <FaBoxes className="text-orange-500 text-3xl" />,
            title: "Wide Product Range",
            desc: "We stock a diverse inventory of professional power tools, accessories, and equipment, ready to meet every project need.",
        },
        {
            icon: <FaTruckLoading className="text-orange-500 text-3xl" />,
            title: "Fast Dispatch",
            desc: "Our logistics team ensures rapid and reliable delivery from our warehouse to your doorstep, maintaining product integrity at every step.",
        },
        {
            icon: <FaTools className="text-orange-500 text-3xl" />,
            title: "Quality Assurance",
            desc: "Each tool is checked and maintained by our staff, guaranteeing you receive only the best products for your tasks.",
        },
    ];

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <section className="w-full bg-white py-14 flex justify-center">
            <div className="max-w-6xl flex flex-col md:flex-row gap-10 items-center px-4 md:px-5">
                {/* Text Left */}
                <div className="w-full md:w-1/2" data-aos="fade-up"
                    data-aos-duration="1500"   >
                    <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                        Welcome to Our Product Warehouse
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Our state-of-the-art warehouse is the heart of our operation, housing a vast selection of power tools and equipment. Every product is carefully organized and maintained to ensure prompt delivery and the highest quality for our customers. Discover how we bring efficiency and reliability to your projects.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {warehouseFeatures.map((f, i) => (
                            <div className="flex items-start gap-4" key={i}>
                                <div className="mt-1">{f.icon}</div>
                                <div>
                                    <div className="font-semibold text-gray-800">{f.title}</div>
                                    <div className="text-gray-600 text-sm">{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Image Right */}
                <div className="w-full h-[400px] md:w-1/2" data-aos="fade-down"
                    data-aos-duration="1500" >
                    <img
                        src={wareHouse}
                        alt="Product Warehouse"
                        className="rounded-lg shadow-lg object-cover w-full h-[500px]  max-w-md"
                    />
                </div>
            </div>
        </section>
    );
}
