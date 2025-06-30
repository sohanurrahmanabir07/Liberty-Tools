import image1 from "../assets/img/Liberty/bg/Cordless-Impact-Screwdriver.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
export const ProductBusiness = () => {

    const { businessProducts } = useOutletContext()
    const navigate = useNavigate()
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className="max-w-[1340px] mx-auto py-10" data-aos="fade-up"
            data-aos-duration="1500">

            <div className="text-center space-y-4 ">

                <p className="font-bold md:text-5xl text-3xl"> <span className="text-orange-500">____</span> BUSINESS <span className="text-orange-500">____</span></p>
                <p className="font-semibold ">Equip your job site with our powerful cordless tool solutions</p>
            </div>
            <br />


            {

                businessProducts ?

                    (<div className="px-5 space-y-3">
                        <div className="flex flex-row-reverse px-1 ">
                            <p onClick={() => navigate('/all-products')} className="text-lg font-semibold hover:scale-105 duration-300 cursor-pointer text-orange-500  ">View All Products</p>
                        </div>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {


                                businessProducts && businessProducts.slice(0, 4).map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => navigate(`/products/${item?.model}`)} className="flex p-2 cursor-pointer items-center max-sm:flex-col  md:h-[300px] shadow-lg shadow-gray-400  border-2 border-orange-500 rounded-lg md:overflow-hidden  ">
                                            <img src={item?.imageUrl[0]} className=" md:w-1/3  max-sm:h-[220px]" alt="" />
                                            <div className="space-y-3 md:w-2/3 p-3 md:p-0 ">
                                                <p className="font-semibold text-lg">{item?.model.toUpperCase()}</p>
                                                <p className="text-gray-500">

                                                    {

                                                        item?.description.length > 50 ?

                                                            (
                                                                <>
                                                                    {
                                                                        item?.description?.slice(0, 150)
                                                                    }
                                                                    ...
                                                                </>
                                                            )
                                                            :
                                                            (item?.description)


                                                    }</p>
                                            </div>
                                        </div>
                                    )
                                })






                            }



                        </section>

                    </div>

                    )
                    :
                    (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 px-5">

                            {
                                [1, 2, 3, 4].map((item, index) => {
                                    return (
                                        <div key={index} className="flex p-2 items-center max-sm:flex-col  md:h-[300px] shadow-lg shadow-gray-400  border-2 border-orange-500 rounded-lg md:overflow-hidden  ">
                                            <div className="skeleton h-full w-full"></div>
                                        </div>
                                    )
                                })






                            }

                        </section>
                    )
            }







        </div>
    )
}
