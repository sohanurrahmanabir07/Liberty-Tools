import React, { useContext, useEffect, useState } from 'react'
import Cover from "../assets/img/Cordless tools banner.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useOutletContext } from 'react-router'
import { capitalizeWords } from '../Functions/functions'
import { ProductUpload } from '../Dashboard/FileUpload/ProductUpload'
import { ProductCard } from '../Product Card/ProductCard'
import pdf from "../../public/pdf/NT - 111 FS.pdf"
import banner from "../assets/img/Liberty/bg/All Products Banner.jpg"
export const AllProducts = () => {
    const [limit, setLimit] = useState(6)
    const { products, categories } = useOutletContext()
    const [categoryFilter, setCategoryFilter] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [search, setSearch] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (products != null) {
            setFilterProducts(products); // Load products into filterProducts when available
        }
    }, [products]);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200);
        AOS.init({
            disable: 'mobile'
        });
    }, [])


    useEffect(() => {

        if (products) {
            const filter = products.filter((item) => {
                const searchLower = search.toLowerCase();

                // Define the keys to search in from the category
                const searchableKeys = ["model", "category", "release_date", "name", "rating"];

                // Check if any of the fields contain the search term
                return searchableKeys.some(key =>
                    item[key] && item[key].toString().toLowerCase().includes(searchLower)
                );
            });
            setFilterProducts(filter)
        }

    }, [search])

    useEffect(() => {
        if (products) {
            const filter = categoryFilter.length > 0 ?
                products.filter((item => categoryFilter.includes(item?.category.toLowerCase())))
                :
                products

            setFilterProducts(filter)

        }
    }, [categoryFilter])

    const handleCheck = (e) => {
        e.target.checked ? setCategoryFilter((prev) => [...prev, e.target.value]) : setCategoryFilter((prev) => [...prev].filter((item) => item != e.target.value))


    }



    return (


        <section  {
            ...(
                !location.pathname.startsWith('/dashboard') ? {'data-aos':'fade-up' , 'data-aos-duration':'1000'}
                : {}
            )

        }   >
            <div className=' overflow-hidden -mt-20  bg-amber-700 '>
                <img loading="lazy" src={banner || ``} className='  md:w-full max-sm:h-[220px] brightness-50' alt="" />
            </div>
            <div className={`max-w-[1340px] ${!location.pathname.startsWith('/dashboard') ? 'mx-auto' : 'px-3'}  space-y-5 bg- mb-20`}>





                <div className='w-full h-[50px] bg-orange-500 rounded-sm flex items-center justify-center md:my-5 my-5'>
                    <div className='w-3/4 relative md:w-2/5'>
                        <div className='px-2 rounded-sm border-2 border-white flex items-center'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' ></FontAwesomeIcon>
                            <input type="text" name="" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Product' className='p-2 text-white w-full focus:outline-none' id="" />

                        </div>

                    </div>

                </div>
                <ProductUpload></ProductUpload>
                {
                    location.pathname.startsWith('/dashboard') &&
                    (
                        <div className='flex max-sm:justify-center max-sm:items-center '>
                            <label htmlFor="my_modal_4" className='btn text-base font-semibold hover:bg-orange-400 bg-orange-500 rounded-md text-white  '>
                                Add Products <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                            </label>

                        </div>


                    )
                }


                <section className={`flex justify-center max-sm:items-center  max-sm:flex-col  max-sm:space-y-3 md:space-x-3  `}>
                    <div className='max-sm:hidden'>
                        <section className='bg-gray-200 w-[220px] space-y-3 p-4 rounded-lg shadow-lg '>

                            {
                                categories && categories.map((item, index) =>
                                (
                                    <div key={index} className='flex justify-between cursor-pointer'>

                                        <label className='font-semibold text-base'>{capitalizeWords(item?.name)}</label>
                                        <input type="checkbox" value={item?.name.toLowerCase()} onChange={handleCheck} className='toggle toggle-sm' />
                                    </div>
                                ))
                            }


                        </section>
                    </div>





                    <section className='space-y-2 md:w-4/5'>
                        <div className='flex justify-between md:hidden'  >

                            {/* <div>
                                <a href="../../public/pdf/NT - 111 FS.pdf" className='btn m-1 w-[150px] text-white bg-orange-500  rounded-sm'>Catelog</a>
                            </div> */}
                            <div onClick={() => setShowFilter(!showFilter)} className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn text-white bg-orange-500  m-1 w-[150px] rounded-sm">Filter <FontAwesomeIcon icon={faFilter} ></FontAwesomeIcon></div>

                            </div>



                        </div>
                        {
                            showFilter &&
                            (
                                <section className={`bg-gray-200 w-[220px]  transition-all duration-300 ease-in-out transform md:hidden mx-auto space-y-3 p-4 rounded-lg shadow-lg md:mt-15   ${showFilter ? `opacity-100 scale-100` : `opacity-0 scale-95 hidden`}`}>
                                    {
                                        categories && categories.map((item, index) =>
                                        (
                                            <div key={index} className='flex justify-between cursor-pointer'>

                                                <label className='font-semibold text-base'>{capitalizeWords(item?.name)}</label>
                                                <input type="checkbox" value={item?.name} onChange={handleCheck} className='toggle toggle-sm' />
                                            </div>
                                        ))
                                    }

                                </section>

                            )
                        }

                        {
                            products ?




                                filterProducts.length > 0 ?

                                    (
                                        <section className=' min-h-[600px] space-y-5'>

                                            {/* <div className='max-sm:hidden'>
                                                <a href="../../public/pdf/NT - 111 FS.pdf" className='btn m-1 w-[150px] text-white bg-orange-500  rounded-sm'>Catelog</a>
                                            </div> */}
                                            <div className={`grid grid-cols-1 ${location.pathname.startsWith('/dashboard') ? 'md:grid-cols-3 ' : 'md:grid-cols-4'} gap-3`}>



                                                {filterProducts.slice(0, limit).map((item, index) => {
                                                    return (
                                                 
                                                            <ProductCard key={index} item={item} ></ProductCard>
                                                 


                                                    )
                                                })
                                                }
                                            </div>
                                            <div className='text-center'>
                                                <button disabled={limit >= filterProducts.length} onClick={() => setLimit((prev) => prev + 6)} className={`btn ${limit >= filterProducts.length ? `text-gray-400` : `text-blue-700 hover:bg-blue-700 hover:text-white`}   rounded-md`}> Show More...</button>
                                            </div>
                                        </section>

                                    )
                                    :
                                    (
                                        <div className='h-screen'>
                                            <p className='font-bold text-center text-2xl mt-20'>No Product Available...</p>
                                        </div>


                                    )






                                :
                                (
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        {
                                            [1, 2, 3, 4, 5, 6].map((item, index) =>
                                            (
                                                <div key={index} className="skeleton h-[250px] w-[250px]"></div>
                                            ))

                                        }
                                    </div>
                                )



                        }




                    </section>

                </section>




            </div>
        </section>

    )
}




