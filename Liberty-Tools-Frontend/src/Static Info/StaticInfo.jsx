import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../assets/img/Liberty/cordless/Cordless_Heat_Gun-removebg-preview.png"

import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  faGears,
  faBolt,
  faShieldAlt,
  faLightbulb,
  faHandHoldingUsd
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const points = [
  {
    icon: faGears,
    title: "Ergonomic Design",
    desc: "Built with high-grade materials to withstand heavy-duty usage"
  },
  {
    icon: faBolt,
    title: "Powerful Performance",
    desc: "Delivers consistent power for efficient and precise results"
  },
  {
    icon: faShieldAlt,
    title: "Safety First",
    desc: "Features robust safety mechanisms for worry-free operation"
  },
  {
    icon: faLightbulb,
    title: "Innovative Features",
    desc: "Advanced technology for smarter and easier use"
  },
  {
    icon: faHandHoldingUsd,
    title: "Cost Effective",
    desc: "Engineered for durability and long-term value"
  }
];

export const StaticInfo = ({ img }) => {
  useEffect(() => {
    AOS.init();
  }, [])

  const location = useLocation()
  return (
    <div className="py-10 px-5">
      <div className="flex max-sm:flex-col items-center md:space-x-10 justify-around max-w-[1340px] mx-auto space-y-5">
        <img src={img || image} data-aos="fade-right" data-aos-duration="2000" className={`  max-sm:w-full ${location.pathname=='/about'? `w-1/2  `: `w-1/3`}  rounded-xl " data-aos="fade-right`}  alt="" />

        {
          location.pathname == '/about' ?
            (<div className="md:w-1/2 md:px-10 space-y-10" data-aos="fade-left" data-aos-duration="2000">
              <div className="space-y-2">
                <h1 className="font-bold text-3xl md:text-5xl">
                  We are Energetic Company
                </h1>

              </div>
              <div className="space-y-10">

                <p>
                  we are more than just a forklift machinery company — we are an active force in the industry. Committed to constant innovation, proactive solutions, and dynamic customer engagement, we bring energy and vitality to every aspect of our operations. Discover the power of an actively driven company, where progress and partnership thrive.</p>
              </div>
            </div>)
            :
            (<div className="md:w-1/2 md:px-10 space-y-10" data-aos="fade-left" data-aos-duration="2000">
              <div className="space-y-2">
                <h1 className="font-semibold text-2xl">
                  Power Through Tasks with Precision and Ease
                </h1>
                <p>Experience enhanced performance that redefines productivity.</p>
              </div>
              <div className="space-y-10">
                {points.map((point, idx) => (
                  <section key={idx} className="flex space-x-5 items-center group cursor-pointer">
                    <FontAwesomeIcon
                      className="text-4xl md:text-gray-400 text-orange-500 group-hover:text-orange-500  duration-200 transition-all"
                      icon={point.icon}
                    />
                    <div>
                      <p className="font-semibold text-lg">{point.title}</p>
                      <p>{point.desc}</p>
                    </div>
                  </section>
                ))}
              </div>
            </div>)


        }

      </div>
    </div>
  );
};