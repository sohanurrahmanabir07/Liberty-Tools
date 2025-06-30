import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Shortened power tools related testimonials
const testimonials = [
    {
        name: "Emily Carter",
        title: "CTO, BuildSmart Inc.",
        img: "https://randomuser.me/api/portraits/women/45.jpg",
        tool: "Electric Drill",
        rating: 5,
        text: "The LibertyTools electric drill is lightweight, powerful, and holds charge for long projects. A must-have for any workshop.",
    },
    {
        name: "James Patel",
        title: "CEO, MakerWorks",
        img: "https://randomuser.me/api/portraits/men/23.jpg",
        tool: "Angle Grinder",
        rating: 4,
        text: "The angle grinder is robust and easy to handle. It made our metalwork efficient and precise. Solid product.",
    },
    {
        name: "Sophia Lin",
        title: "Product Manager, UrbanTools",
        img: "https://randomuser.me/api/portraits/women/77.jpg",
        tool: "Rotary Tool",
        rating: 5,
        text: "The rotary tool is accurate and easy to use. Perfect for detailed work and creative projects.",
    },
    {
        name: "Daniel Kim",
        title: "Supply Chain Director, EquipPro",
        img: "https://randomuser.me/api/portraits/men/56.jpg",
        tool: "Heat Gun",
        rating: 4,
        text: "The heat gun heats quickly and feels sturdy. Our team uses it daily for packaging and repairs.",
    },
];

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-0 md:text-lg top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-0 md:text-lg top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
        <FontAwesomeIcon icon={faChevronRight} size="2xl" />
    </button>
);

const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 800, settings: { slidesToShow: 1 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
        <div>
            <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
    ),
    customPaging: () => (
        <span
            style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#ffc107",
                margin: "0 4px"
            }}
        />
    ),
};

const TestimonialsSlider = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <section
            data-aos="fade-up"
            data-aos-duration="1500"
            className="w-full py-14 max-w-[1340px] mx-auto flex flex-col items-center bg-white"
        >
            <div className=" w-full mx-auto px-2">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <span className="w-14 h-1 bg-orange-500 rounded"></span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                            Testimonials
                        </h2>
                        <span className="w-14 h-1 bg-orange-500 rounded"></span>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear what industry leaders say about our power tools—reliable, efficient, and built for professionals.
                    </p>
                </div>
                <Slider {...settings}>
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="p-2">
                            <div className="bg-white rounded shadow-md p-8 h-[250px] flex items-start gap-6 relative overflow-hidden">
                                {/* Avatar and Info */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-white shadow"
                                    />
                                    <div className="text-lg font-semibold text-gray-700">{item.name}</div>
                                    <div className="text-gray-400 text-sm mb-1">{item.title}</div>
                                    <div className="text-orange-500 font-bold text-xs mb-1">{item.tool}</div>
                                    <div className="flex gap-1 text-yellow-400 mb-2">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                        {[...Array(5 - item.rating)].map((_, i) => (
                                            <FaStar key={i + item.rating} className="text-gray-300" />
                                        ))}
                                    </div>
                                </div>
                                {/* Testimonial Text */}
                                <div className="flex-1 pl-3 flex flex-col justify-center">
                                    <FaQuoteLeft className="text-orange-500 text-2xl mb-2" />
                                    <p className="italic text-gray-700 text-base leading-relaxed line-clamp-4">
                                        {item.text}
                                    </p>
                                    <div className="flex justify-end">
                                        <FaQuoteRight className="text-orange-500 text-2xl mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default TestimonialsSlider;