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
        <div className="flex-1 min-w-[230px] space-y-5">
          <div className='w-25 cursor-pointer block' onClick={() => navigate('/')}>
            {logo ?
              (<img loading="lazy" src={logo} alt="Logo" />)
              : (<div className='skeleton rounded-sm h-10'></div>)
            }
          </div>
          <div className="mb-1">Address: 418 BROADWAY STE R
            ALBANY NEW YORK 122072</div>
          <div className="mb-1">Wyoming, United States</div>
          <div className="mb-1">
            <span className="font-semibold">Phone:</span> +13322522817

          </div>
          <div className="mb-4">
            <span className="font-semibold">Email:</span>{" "}
            <a className="underline text-yellow-300">
              info@libertytools.us
            </a>
          </div>
          {/* Social icons */}
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-orange-400 transition">
              <FaXTwitter />
            </a>
            <a href="https://www.facebook.com/libertyequipmentco" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-orange-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-orange-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-orange-400 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        {/* Useful Links */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/about" className="hover:text-orange-500">About us</a></li>
            <li><a href="/services" className="hover:text-orange-500">Services</a></li>
            <li><a href="/blog" className="hover:text-orange-500">Blog</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Our Services</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Web Design</a></li>
            <li><a href="#" className="hover:text-orange-500">Web Development</a></li>
            <li><a href="#" className="hover:text-orange-500">Product Management</a></li>
            <li><a href="#" className="hover:text-orange-500">Marketing</a></li>
            <li><a href="#" className="hover:text-orange-500">Graphic Design</a></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Hic solutasetp</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Molestiae accusamus iure</a></li>
            <li><a href="#" className="hover:text-orange-500">Excepturi dignissimos</a></li>
            <li><a href="#" className="hover:text-orange-500">Suscipit distinctio</a></li>
            <li><a href="#" className="hover:text-orange-500">Dilecta</a></li>
            <li><a href="#" className="hover:text-orange-500">Sit quas consectetur</a></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[180px]">
          <h3 className="font-semibold mb-4 text-lg">Nobis illum</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Ipsam</a></li>
            <li><a href="#" className="hover:text-orange-500">Laudantium dolorum</a></li>
            <li><a href="#" className="hover:text-orange-500">Dinera</a></li>
            <li><a href="#" className="hover:text-orange-500">Trodela</a></li>
            <li><a href="#" className="hover:text-orange-500">Flexo</a></li>
          </ul>
        </div> */}
      </div>
      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/20 text-center text-gray-200 py-5 bg-black/30">
        <div>
          © Copyright <span className="font-bold text-orange-500">Liberty</span> All Rights Reserved
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