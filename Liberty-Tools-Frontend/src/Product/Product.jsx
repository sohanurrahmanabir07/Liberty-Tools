import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'

import { ProductImage } from './ProductImage'
import { ProductDetails } from './ProductDetails'
import { ProductInfo } from './ProductInfo'
import { DynamicBanner } from '../Dynamic Banner/DynamicBanner'
import ProductAccordion from './ProductAccordion'
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Product = () => {
    const { model } = useParams()
    const [item, setItem] = useState(null)
    const products = useOutletContext().products
    const [categoryItem, setCategoryItem] = useState(null)
    const categories = useOutletContext().categories

    useEffect(() => {
        if (products && categories) {
            const p = products.find((item) => item?.model == model)
            setItem(p)
            if (p) {
                const category = categories.find((item) => item?.name?.toLowerCase() == p.category.toLowerCase())
                if (category) {
                    setCategoryItem(category)
                }
                else {
                    setCategoryItem(-1)
                }


            }

        }
    }, [products, categories])


    useEffect(() => {
        AOS.init();
    }, [])


    return (
        <section className='space-y-5'>
            {
                item ?
                    (
                        <DynamicBanner item={categoryItem} ></DynamicBanner>


                    )
                    :
                    (
                        <div className="skeleton w-full h-[300px]"></div>
                    )
            }
            <div  className='max-w-[1440px] mx-auto px-5 space-y-10'>



                <section className='flex justify-between max-sm:flex-col md:space-x-5 max-sm:space-y-5'>

                    {
                        item ?
                            (
                                <ProductImage item={item}></ProductImage>

                            )
                            :
                            (
                                <div className="skeleton w-full md:w-1/2 h-[300px]"></div>
                            )
                    }

                    {
                        item ?
                            (
                                <ProductDetails item={item}></ProductDetails>

                            )
                            :
                            (
                                <div className="skeleton w-1/2 h-[300px]"></div>
                            )
                    }

                </section>

                <section className='flex max-sm:flex-col space-y-5'>
                    <div className='md:w-1/2'>
                        <ProductAccordion item={item} ></ProductAccordion>

                    </div>





                    <div className='md:w-1/2 h-[250px] rounded-lg '>
                        <ProductInfo item={item} ></ProductInfo>
                    </div>
                </section>




            </div>

        </section>



    )
}
