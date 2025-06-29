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
export const Home = () => {
    const scg = "M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z"
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
            <TestimonialsSlider></TestimonialsSlider>
            <BlogSlider></BlogSlider>




        </div>
    )
}
