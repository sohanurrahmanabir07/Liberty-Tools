import { faArrowRight, faBolt, faGears, faHandshakeAngle, faIndustry, faMoneyCheckDollar, faPlus, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { AddService } from './New Service Modal/AddService'
import { useLocation } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
export const ServicesHome = () => {
    const location = useLocation()
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className='bg-gray-50 px-5' data-aos="fade-up"
        data-aos-duration="1500">
            <div className="max-w-[1340px] mx-auto py-10">

                <div className="text-center space-y-4 ">

                    <p className="font-bold md:text-5xl text-3xl"> <span className="text-yellow-500">____</span> Services <span className="text-yellow-500">____</span></p>
                    <p className="font-semibold ">Innovative Tools for Modern Construction Success</p>
                </div>
                <br />
                {
                    location.pathname.startsWith('/dashboard') &&
                    (
                        <>
                            <label htmlFor="AddService" className='btn text-base font-semibold hover:bg-yellow-500 bg-yellow-400 rounded-md text-white  '>
                                Add New Services <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                            </label>
                            <AddService></AddService>
                            <br />
                        </>
                    )
                }



                <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border-2 group shadow-lg shadow-gray-400 cursor-pointer  p-10 space-y-5 border-yellow-500 rounded-lg overflow-hidden items-center ">
                        <div className='text-2xl group-hover:text-yellow-500  text-gray-500   transition-all duration-200'>
                            <FontAwesomeIcon icon={faMoneyCheckDollar} size='2xl' ></FontAwesomeIcon>
                        </div>
                        <div className="space-y-3 ">
                            <p className="font-semibold text-xl">Equipment Sales</p>
                            <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                        </div>

                        <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                    </div>
                    <div className="border-2 shadow-lg shadow-gray-400 group cursor-pointer  p-10 space-y-5 border-yellow-500 rounded-lg overflow-hidden items-center ">
                        <div className='text-2xl group-hover:text-yellow-500 text-gray-500   transition-all duration-200 '>
                            <FontAwesomeIcon icon={faScrewdriverWrench} size='2xl' ></FontAwesomeIcon>
                        </div>
                        <div className="space-y-3 ">
                            <p className="font-semibold text-xl">Equipment Sales</p>
                            <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                        </div>

                        <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                    </div>
                    <div className="border-2 shadow-lg shadow-gray-400 group cursor-pointer  p-10 space-y-5 border-yellow-500 rounded-lg overflow-hidden items-center ">
                        <div className='text-2xl group-hover:text-yellow-500  text-gray-500  transition-all duration-200 '>
                            <FontAwesomeIcon icon={faIndustry} size='2xl' ></FontAwesomeIcon>
                        </div>
                        <div className="space-y-3 ">
                            <p className="font-semibold text-xl">Equipment Sales</p>
                            <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                        </div>

                        <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                    </div>
                    <div className="border-2 shadow-lg shadow-gray-400 group cursor-pointer  p-10 space-y-5 border-yellow-500 rounded-lg overflow-hidden items-center ">
                        <div className='text-2xl group-hover:text-yellow-500 text-gray-500   transition-all duration-200 '>
                            <FontAwesomeIcon icon={faBolt} size='2xl' ></FontAwesomeIcon>
                        </div>
                        <div className="space-y-3 ">
                            <p className="font-semibold text-xl">Equipment Sales</p>
                            <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                        </div>

                        <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                    </div>

                    <div className="border-2 shadow-lg shadow-gray-400 group cursor-pointer  p-10 space-y-5 border-yellow-500 rounded-lg overflow-hidden items-center ">
                        <div className='text-2xl group-hover:text-yellow-500 text-gray-500  transition-all duration-200 '>
                            <FontAwesomeIcon icon={faHandshakeAngle} size='2xl' ></FontAwesomeIcon>
                        </div>
                        <div className="space-y-3 ">
                            <p className="font-semibold text-xl">Equipment Sales</p>
                            <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                        </div>

                        <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                    </div>
                    <div className="border-2 shadow-lg shadow-gray-400 group cursor-pointer  p-10 space-y-5 border-yellow-500 rounded-lg overflow-hidden items-center ">
                        <div className='text-2xl group-hover:text-yellow-500 text-gray-500  transition-all duration-200 '>
                            <FontAwesomeIcon icon={faGears} size='2xl' ></FontAwesomeIcon>
                        </div>
                        <div className="space-y-3 ">
                            <p className="font-semibold text-xl">Equipment Sales</p>
                            <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                        </div>

                        <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                    </div>


                </section>

            </div>
        </div>

    )
}
