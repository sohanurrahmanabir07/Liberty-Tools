
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useOutletContext } from "react-router-dom";
export const SliderBanner = () => {

    const { banners } = useOutletContext()
    const PrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute left-4 md:text-3xl text-2xl top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
        >
            <FontAwesomeIcon icon={faChevronLeft} size="2xl" ></FontAwesomeIcon>
        </button>
    );

    // Tailwind-styled Next Arrow
    const NextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-4 md:text-3xl text-2xl top-50/100   md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
        >
            <FontAwesomeIcon icon={faChevronRight} size="2xl" ></FontAwesomeIcon>
        </button>
    );
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        autoplay: true,
        autoplaySpeed: 3500,
    };
    return (
        <div className="relative">

            {
                banners.length == 0 ?
                    (
                        <div className="skeleton w-full h-[500px] md:h-screen"></div>
                    )
                    :

                    (
                        <Slider {...settings}>

                            {

                                banners.length > 1 ?
                                    banners.map((item, index) => {

                                        return (
                                            <div className="w-full  md:h-screen h-[500px] overflow-hidden " key={index}>
                                                <img src={item.imageUrl[0]} className="w-full brightness-40 bg-cover  h-full md:h-screen" alt="" />
                                            </div>
                                        )
                                    })
                                    :


                                    [1, 2].map((item, index) => {
                                        return (
                                            <div className="w-full  md:h-screen h-[500px]  overflow-hidden " key={index}>
                                                <img src={banners[0].imageUrl[0]} className="w-full  brightness-50 object-cover h-full " alt="" />
                                            </div>
                                        )
                                    })




                            }

                        </Slider>
                    )
            }





            <div className="text-center w-3/4  md:w-[650px] space-y-10 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2">
                <h1 className="md:text-6xl text-3xl font-bold text-white">Welcome to Liberty <br /> Equipment</h1>
                <p className="md:font-semibold text-gray-300  text-sm md:text-lg  ">Discover innovative, high-quality tools and equipment designed to enhance efficiency and productivity. At Liberty Equipment, we are committed to providing reliable solutions for all your industrial needs.</p>
                <button className="font-semibold text-white hover:bg-orange-400 transition-all duration-300 cursor-pointer px-10 py-3 rounded-l-full rounded-r-full border-2 border-orange-500">Get Started</button>
            </div>
        </div>

    );
}
