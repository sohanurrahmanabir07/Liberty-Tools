import { useEffect } from "react"
import ModalImage from "react-modal-image"
import { useOutletContext } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Certificate = () => {

    const { certificate } = useOutletContext()

    useEffect(() => {
        AOS.init();

    }, [])

    return (
        <div className="bg-gray-100 px-5 py-10">
            <br />
            <p className="font-bold md:text-5xl text-center text-3xl"> <span className="text-orange-500">____</span> CERTIFICATE <span className="text-orange-500">____</span></p>
            <br />
            <br />
            <div className="flex flex-col md:justify-center items-center max-sm:space-y-5 px-5 md:flex-row  md:flex-wrap max-w-[1340px] gap-10 mx-auto">
                {
                    certificate ?
                        certificate && certificate.map((item, index) => {
                            return (
                                <div key={index} className="space-y-2"   >

                                    <ModalImage
                                        small={item?.imageUrl[0]}
                                        large={item?.imageUrl[0]}
                                        // alt={item?.name}
                                        className="md:w-[300px] bg-white hover:scale-105 duration-150 transition-all ease-in-out object-cover"
                                        hideDownload={true}
                                        hideZoom={true}





                                    />
                                    <div className="text-center text-xl font-semibold text-gray-700 ">
                                        <p>{item?.name}</p>
                                    </div>

                                </div>
                            )
                        })
                        :
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                            return (
                                <div key={index} className="skeleton h-[350px] w-full md:w-[250px]  "></div>
                            )
                        })
                }
            </div>
        </div>
    )
}
