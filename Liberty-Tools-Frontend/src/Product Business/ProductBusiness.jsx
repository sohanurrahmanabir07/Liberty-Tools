import image1 from "../assets/img/Liberty/bg/Cordless-Impact-Screwdriver.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
export const ProductBusiness = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className="max-w-[1340px] mx-auto py-10" data-aos="fade-up"
        data-aos-duration="1500">

            <div className="text-center space-y-4 ">

                <p className="font-bold md:text-5xl text-3xl"> <span className="text-yellow-500">____</span> BUSINESS <span className="text-yellow-500">____</span></p>
                <p className="font-semibold ">Equip your job site with our powerful cordless tool solutions</p>
            </div>
            <br />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 px-5">

                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        return (
                            <div key={index} className="flex p-2 items-center max-sm:flex-col  md:h-[300px] shadow-lg shadow-gray-400  border-2 border-yellow-500 rounded-lg md:overflow-hidden  ">
                                <img src={image1} className=" md:w-1/3  max-sm:h-[220px]" alt="" />
                                <div className="space-y-3 md:w-2/3  ">
                                    <p className="font-semibold">Cordless Impact Screwdriver.</p>
                                    <p className="text-gray-500">Achieve precise tightening and loosening of screws with ease. This high-performance, durable tool is designed to maximize efficiency on any job site, making it a must-have for both professionals and DIY enthusiasts.</p>
                                </div>
                            </div>
                        )
                    })
                }



            </section>

        </div>
    )
}
