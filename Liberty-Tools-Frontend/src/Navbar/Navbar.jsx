import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { capitalizeWords, urlConverter } from '../Functions/functions';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Redux/LibertyStore';
import { SideNavbar } from './SideNav/SideNavbar';

export const Navbar = ({ products, categories }) => {
    const [showMegaBar, setShowMegaBar] = useState(false);
    const megaBarRef = useRef(null);
    const categoriesBtnRef = useRef(null);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const logo = useSelector((state) => state.LibertyTools.logo)
    const admin = useSelector((state) => state.LibertyTools.users)
    const isDashboard = location.pathname.startsWith('/dashboard');


    const dispatch = useDispatch()


    useEffect(() => {
        const handleScroll = () => {

            if (location.pathname.startsWith('/dashboard')) {
                setScrolled(true)
            }
            else if (window.scrollY > 40) {
                setScrolled(true);
            }

            else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideMegaBar = megaBarRef.current && !megaBarRef.current.contains(event.target);
            const clickedOutsideButton = categoriesBtnRef.current && !categoriesBtnRef.current.contains(event.target);
            if (clickedOutsideMegaBar && clickedOutsideButton) {
                setShowMegaBar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Dynamic classes for navbar background and text color
    let navbarBg = scrolled || location.pathname.startsWith('/dashboard') ? "bg-white text-black shadow" : "bg-transparent text-white";
    let linkText = scrolled || location.pathname.startsWith('/dashboard') ? "text-black" : "text-white";
    const activeBorder = scrolled ? "border-b-2 border-orange-500" : "border-b-2 border-orange-500";

    useEffect(() => {
        linkText = scrolled || location.pathname.startsWith('/dashboard') ? "text-black" : "text-white";
        navbarBg = scrolled || location.pathname.startsWith('/dashboard') ? "bg-white text-black shadow" : "bg-transparent text-white";
    }, [location.pathname])

    return (
        <div className='relative'>

            <nav className='max-w-[1340px] mx-auto' >
                <section className={` transition-colors duration-300 max-sm:text-black ${navbarBg} w-full fixed top-0 left-0 bg-amber-700 max-sm:p-5 z-20 md:z-35 md:px-10 px-5  h-[70px]`}>
                    <div className='flex justify-between mx-auto items-center max-w-[1340px]   ' >

                        {/* Start (Logo & Drawer) */}


                        <div className="flex items-center justify-center  space-x-4">
                            <div className="dropdown">
                                <label htmlFor="navbar-drawer" className={`drawer-button lg:hidden text-orange-500  text-xl cursor-pointer`}>☰</label>
                            </div>

                            <div className='w-25 cursor-pointer block' onClick={() => navigate('/')}>
                                {logo ?
                                    (<img loading="lazy" src={logo} alt="Logo" />)
                                    : (<div className='skeleton rounded-sm h-10'></div>)
                                }
                            </div>
                        </div>

                        {/* End (Menu) */}
                        <div className="hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 text-md font-semibold">
                                <li className={`${linkText} ${location.pathname === "/" ? activeBorder : ""}`}>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <button
                                        ref={categoriesBtnRef}
                                        className={`relative cursor-pointer flex items-center gap-1 ${linkText}`}
                                        onClick={() => setShowMegaBar(!showMegaBar)}
                                    >
                                        Products
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className={`transition-transform duration-300 ${showMegaBar ? "rotate-180" : ""}`}
                                            style={{ fontSize: "0.85em" }}
                                        />
                                    </button>
                                </li>
                                <li className={`${linkText} ${location.pathname === "/about" ? activeBorder : ""}`}>
                                    <Link to="/about">About</Link>
                                </li>
                                <li className={`${linkText} ${location.pathname === "/services" ? activeBorder : ""}`}>
                                    <Link to="/services">Services</Link>
                                </li>
                                {/* <li className={`${linkText} ${location.pathname === "/projects" ? activeBorder : ""}`}>
            <Link to="/projects">Projects</Link>
        </li> */}
                                <li className={`${linkText} ${location.pathname === "/blog" ? activeBorder : ""}`}>
                                    <Link to="/blog">Blog</Link>
                                </li>
                                <li className={`${linkText} ${location.pathname === "/contact" ? activeBorder : ""}`}>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                {
                                    admin && (
                                        <li className={`${linkText} ${location.pathname === "/dashboard" ? activeBorder : ""}`}>
                                            <Link to="/dashboard">Dashboard</Link>
                                        </li>
                                    )
                                }





                            </ul>

                        </div>

                        <div className="space-x-5 md:hidden " >


                            {isDashboard && (
                                <label
                                    htmlFor="dashboard-drawer"
                                    className="drawer-button text-black text-xl lg:hidden"
                                >
                                    ☰
                                </label>
                            )}


                        </div>






                    </div>
                </section>

                {/* MegaBar */}
                <SideNavbar categories={categories} ></SideNavbar>

            </nav>
            {showMegaBar && (
                <div
                    ref={megaBarRef}
                    className="bg-white w-full transition-all duration-300 hidden md:block max-w-[1340px] mx-auto left-1/2 transform -translate-x-1/2 fixed top-[70px] shadow-2xl shadow-orange-300 rounded-lg z-50"
                >
                    <div className='flex justify-end p-2'>
                        <div
                            className='cursor-pointer hover:scale-105 text-orange-500 duration-300'
                            onClick={() => { setShowMegaBar(false); navigate('/all-products'); }}
                        >
                            View All Products
                        </div>
                    </div>
                    <section className="flex flex-wrap gap-5 p-5">
                        {categories && categories.map((item, index) => (
                            <div
                                key={index}
                                className='overflow-hidden cursor-pointer flex flex-col items-center'
                                onClick={() => { setShowMegaBar(false); navigate(`/category/${urlConverter(item?.name)}`); }}
                            >
                                <img
                                    loading="lazy"
                                    src={item?.imageUrl || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}
                                    className='w-[150px] rounded-md  object-cover mb-2'
                                    alt={item?.name}
                                />
                                <Link className="text-center text-orange-500 font-semibold hover:underline w-full" to={`/category/${urlConverter(item?.name)}`}>
                                    {capitalizeWords(item?.name)}
                                </Link>
                            </div>
                        ))}
                    </section>
                </div>
            )}
            {/* Spacer so content below doesn't hide behind navbar */}
            <div className="h-[70px] z-0 "></div>
        </div>
    );
};