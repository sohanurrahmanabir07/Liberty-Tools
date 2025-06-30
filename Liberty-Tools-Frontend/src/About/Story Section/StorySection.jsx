import React, { useEffect } from "react";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import officeBuilding from "../../assets/img/Liberty Office Bulding.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';


const StorySection = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (

    <section className="w-full flex flex-col max-w-[1340px] mx-auto items-center py-8 md:py-16 bg-white">
      <div className="w-full max-w-[1600px] px-4">
        <h1 className="text-4xl md:text-5xl text-orange-500 font-bold mb-6 mt-2">
        Our Journey<br />
        <span className="text-xl text-black">From Startup to a Trusted Global Supplier</span>
         
          <br />
          <br />
        </h1>
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 items-stretch">
          {/* Left: Story Card */}
          <div data-aos="fade-right"
            data-aos-duration="1500" className="bg-gray-100 px-8 py-10 flex-1 max-w-[600px] min-w-[320px] flex flex-col justify-center rounded-none">

            <h2 className="text-3xl font-bold text-gray-700 mb-2">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2020, Liberty Equipment Co LLC has grown from a small U.S. startup into a trusted global supplier of high-quality power tools. We prioritize safety, durability, and performance in every product, serving professionals and hobbyists worldwide. Driven by innovation and customer satisfaction, we invest in R&D and strong partnerships. Our journey reflects steady growth, hard work, and a commitment to empowering users with reliable, cutting-edge tools.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-start gap-2 text-gray-600">
                <FaCheckCircle className="text-yellow-400 mt-1" />
                <span>Launched our flagship cordless tool series, setting a new benchmark for reliability and innovation in the industry.</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <FaCheckCircle className="text-yellow-400 mt-1" />
                <span>Expanded our product line to include heat guns, electric sanders, rotary tools, and angle grinders, meeting the evolving needs of our customers.</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <FaCheckCircle className="text-yellow-400 mt-1" />
                <span>Established robust international logistics, allowing us to supply our products efficiently to clients around the world.</span>
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Vitae autem velit excepturi fugit. Animi ad non. Eligendi et non nesciunt suscipit repellendus porro in quo eveniet. Molestias in maxime doloremque.
            </p>
            <a
              href="#"
              className="flex items-center gap-2 text-lg text-gray-700 hover:text-yellow-400 font-semibold transition"
            >
              <FaPlayCircle className="text-yellow-400 text-2xl" />
              Watch Video
            </a>
          </div>
          {/* Right: Image */}
          <div data-aos="fade-left"
            data-aos-duration="1500" className="flex-1 flex items-center justify-center md:min-w-[420px] md:-mt-70 md:-ml-5 overflow-hidden rounded-lg max-sm:my-5 md:max-w-[780px]">
            <img
              src={officeBuilding}
              alt="Construction site"
              className="w-full h-full object-cover"
              style={{ maxHeight: 520, minHeight: 300, borderRadius: 20 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


export default StorySection;