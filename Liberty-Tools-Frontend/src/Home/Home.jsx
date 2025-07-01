import React from 'react'
import { SliderBanner } from '../SliderBanner/SliderBanner'
import { Quote } from '../Quote/Quote'
import { ProductBusiness } from '../Product Business/ProductBusiness'
import { ServicesHome } from '../Services Home/ServicesHome'
import { StaticInfo } from '../Static Info/StaticInfo'
import TabsWithContent from '../Tab/TabWithContent'
import { ProductWithProjects } from '../Product With Projects/ProductWithProjects'
import BlogSlider from '../Blog Slider/BlogSlider'
import TestimonialsSlider from '../About/Testimonials/Testimonials'
import svg from "../assets/img/SVG/alien-svgrepo-com.svg"
import { Certificate } from '../Certificate/Certificate'
export const Home = () => {

    return (
        <div>

            <div className='md:-mt-20'>
                <SliderBanner></SliderBanner>
            </div>

            <Quote></Quote>
            <div className='bg-gray-100'>
                <ProductWithProjects></ProductWithProjects>
            </div>






            <ServicesHome></ServicesHome>
            <StaticInfo></StaticInfo>
            <div className='bg-gray-100'>
                <TabsWithContent></TabsWithContent>
            </div>
            <ProductBusiness></ProductBusiness>
            <Certificate></Certificate>
            <TestimonialsSlider></TestimonialsSlider>
            <BlogSlider></BlogSlider>




        </div>
    )
}
