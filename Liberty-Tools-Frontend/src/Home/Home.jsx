import React from 'react'
import { SliderBanner } from '../SliderBanner/SliderBanner'
import { Quote } from '../Quote/Quote'
import { ProductBusiness } from '../Product Business/ProductBusiness'
import { ServicesHome } from '../Services Home/ServicesHome'
import { StaticInfo } from '../Static Info/StaticInfo'
import TabsWithContent from '../Tab/TabWithContent'
import { ProductWithProjects } from '../Product With Projects/ProductWithProjects'
import BlogSlider from '../Blog Slider/BlogSlider'

export const Home = () => {

    return (
        <div>

            <div className='md:-mt-20'>
                <SliderBanner></SliderBanner>
            </div>

            <Quote></Quote>
            <ProductWithProjects></ProductWithProjects>

            <ServicesHome></ServicesHome>
            <StaticInfo></StaticInfo>

            <TabsWithContent></TabsWithContent>
            <ProductBusiness></ProductBusiness>
            <BlogSlider></BlogSlider>




        </div>
    )
}
