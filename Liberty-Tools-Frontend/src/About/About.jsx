import banner from "../assets/img/page-title-bg.jpg"
import { StaticInfo } from "../Static Info/StaticInfo"
import StorySection from "./Story Section/StorySection"

import img from "../assets/img/alt-services.jpg"
import { Description } from "./About Descrption/Description"
import TeamSection from "./Team section/TeamSection"
import TestimonialsSlider from "./Testimonials/Testimonials"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
export const About = () => {
    useEffect(() => {
            AOS.init();
        }, [])
    return (
        <div>

            <div className="-mt-20 overflow-hidden h-[350px] relative">
                <img src={banner} className="brightness-50 h-[500px] bg-cover w-full" alt="" />

                <div className="text-center w-[650px] space-y-10 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-5xl text-white font-semibold ">About</div>
            </div>

            <StorySection></StorySection>
            <StaticInfo img={img} ></StaticInfo>
            <Description></Description>
            <TestimonialsSlider></TestimonialsSlider>

        </div>
    )
}
