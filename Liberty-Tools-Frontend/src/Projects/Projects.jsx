import React from 'react'
import banner from "../../src/assets/img/page-title-bg.jpg"
import { ProductWithProjects } from '../Product With Projects/ProductWithProjects'
export const Projects = () => {
    return (
        <div>
            <div className="-mt-20 overflow-hidden h-[350px] relative">
                <img src={banner} className="brightness-50 h-[500px] bg-cover w-full" alt="" />

                <div className="text-center w-[650px] space-y-10 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-5xl text-white font-semibold ">Projects</div>
            </div>

            <ProductWithProjects></ProductWithProjects>

        </div>
    )
}
