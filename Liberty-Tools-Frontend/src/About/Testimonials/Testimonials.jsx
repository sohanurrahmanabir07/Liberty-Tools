import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from 'aos';
import 'aos/dist/aos.css';
// Example testimonials data
const testimonials = [
    {
        name: "Sara Wilsson",
        title: "Designer",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        text: "Export tempor illum tamen malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
    },
    {
        name: "Jena Karlis",
        title: "Store Owner",
        img: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 5,
        text: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.",
    },
    {
        name: "Matt Brandon",
        title: "Freelancer",
        img: "https://randomuser.me/api/portraits/men/85.jpg",
        rating: 5,
        text: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore.",
    },
    {
        name: "John Larson",
        title: "Entrepreneur",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        text: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa.",
    },
];
const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-0 md:text-lg top-25/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" ></FontAwesomeIcon>
    </button>
);

// Tailwind-styled Next Arrow
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-0 md:text-lg top-25/100   md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
        <FontAwesomeIcon icon={faChevronRight} size="2xl" ></FontAwesomeIcon>
    </button>
);

const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true, // <-- Enable arrows!
    autoplay: false,
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
    }, [])
    return (
        <section data-aos="fade-up"
        data-aos-duration="1500" className="w-full py-14 flex flex-col items-center bg-white">
            <div className="max-w-6xl w-full mx-auto px-4">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <span className="w-14 h-1 bg-yellow-400 rounded"></span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                            Testimonials
                        </h2>
                        <span className="w-14 h-1 bg-yellow-400 rounded"></span>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
                    </p>
                </div>
                <Slider {...settings}>
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="px-4">
                            <div className="bg-white rounded shadow-md p-8 min-h-[260px] flex items-start gap-6 relative">
                                {/* Avatar and Info */}
                                <div className="flex flex-col items-center">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-white shadow"
                                    />
                                    <div className="text-lg font-semibold text-gray-700">{item.name}</div>
                                    <div className="text-gray-400 text-sm mb-1">{item.title}</div>
                                    <div className="flex gap-1 text-yellow-400 mb-2">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                                {/* Testimonial Text */}
                                <div className="flex-1 pl-3 flex flex-col justify-center">
                                    <FaQuoteLeft className="text-yellow-400 text-2xl mb-2" />
                                    <p className="italic text-gray-700 text-base leading-relaxed">
                                        {item.text}
                                    </p>
                                    <div className="flex justify-end">
                                        <FaQuoteRight className="text-yellow-200 text-2xl mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}



export default TestimonialsSlider;