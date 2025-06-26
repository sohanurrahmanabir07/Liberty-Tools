import React from "react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import bg from "../assets/img/footer-bg.jpg"
import { useSelector } from "react-redux";
const Footer = () => {
  const logo = useSelector((state) => state.LibertyTools.logo)
  return (

    <footer className="relative w-full mt-12">
      {/* Background image with brightness-50 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2)",
        }}
        aria-hidden="true"
      />
      {/* Overlay for content */}
      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-10 text-white">
        {/* Logo and Contact */}
        <div className="flex-1 min-w-[230px]">
          <div className="flex items-center gap-2 mb-3">
            {/* Use your own logo here */}
            {
              logo ?
                (
                  <img
                    src={logo}
                    loading="lazy"
                    alt="Logo"
                    className="w-1/3"
                  />
                )

                :
                (<div className='skeleton rounded-sm h-10'></div>)


            }
           
          </div>
          <div className="mb-1">Address: 30N Gould St Ste R Sheridan</div>
          <div className="mb-1">Wyoming, United States</div>
          <div className="mb-1">
            <span className="font-semibold">Phone:</span> +1 332-252-2817
          </div>
          <div className="mb-4">
            <span className="font-semibold">Email:</span>{" "}
            <a href="mailto:sales@libertyequipmentco.us" className="underline text-yellow-300">
              sales@libertyequipmentco.us
            </a>
          </div>
          {/* Social icons */}
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-yellow-400 transition">
              <FaXTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-yellow-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-yellow-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-yellow-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        {/* Useful Links */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">About us</a></li>
            <li><a href="#" className="hover:text-yellow-400">Services</a></li>
            <li><a href="#" className="hover:text-yellow-400">Terms of service</a></li>
            <li><a href="#" className="hover:text-yellow-400">Privacy policy</a></li>
          </ul>
        </div>
        {/* Our Services */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Our Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Web Design</a></li>
            <li><a href="#" className="hover:text-yellow-400">Web Development</a></li>
            <li><a href="#" className="hover:text-yellow-400">Product Management</a></li>
            <li><a href="#" className="hover:text-yellow-400">Marketing</a></li>
            <li><a href="#" className="hover:text-yellow-400">Graphic Design</a></li>
          </ul>
        </div>
        {/* Hic solutasetp */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Hic solutasetp</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Molestiae accusamus iure</a></li>
            <li><a href="#" className="hover:text-yellow-400">Excepturi dignissimos</a></li>
            <li><a href="#" className="hover:text-yellow-400">Suscipit distinctio</a></li>
            <li><a href="#" className="hover:text-yellow-400">Dilecta</a></li>
            <li><a href="#" className="hover:text-yellow-400">Sit quas consectetur</a></li>
          </ul>
        </div>
        {/* Nobis illum */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Nobis illum</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Ipsam</a></li>
            <li><a href="#" className="hover:text-yellow-400">Laudantium dolorum</a></li>
            <li><a href="#" className="hover:text-yellow-400">Dinera</a></li>
            <li><a href="#" className="hover:text-yellow-400">Trodela</a></li>
            <li><a href="#" className="hover:text-yellow-400">Flexo</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/20 text-center text-gray-200 py-5 bg-black/30">
        <div>
          © Copyright <span className="font-bold text-yellow-400">Liberty</span> All Rights Reserved
        </div>
        <div className="text-sm mt-1">
          Designed by Advancesafety engineering
        </div>
      </div>
    </footer>
  )
}
  ;

export default Footer;