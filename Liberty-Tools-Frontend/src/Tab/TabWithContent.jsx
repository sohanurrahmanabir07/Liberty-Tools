import React, { useEffect, useState } from "react";
import project1 from "../assets/img/projects/remodeling-1.jpg"
import project2 from "../assets/img/projects/safety.jpg"
import project3 from "../assets/img/projects/safety2.jpg"
import project4 from "../assets/img/projects/features-4.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const tabData = [
  {
    label: "Maximize Jobsite Efficiency",
    content: (
      <div className="flex items-center flex-col lg:flex-row gap-10 mt-10"   >
        {/* Left: Text Content */}
        <div className="flex-1" data-aos="fade-right"
          data-aos-duration="1500">
          <h2 className="text-4xl font-bold text-gray-700">
            Streamlined Operations for Enhanced Productivity
          </h2>
          <div className="w-20 h-1 bg-orange-500 my-4"></div>
          <p className="italic text-gray-600 mb-2">
            Efficient job sites are the backbone of successful projects, and we provide the tools and solutions to make it happen. From innovative machinery to advanced equipment, our offerings are designed to save time and effort, enabling your team to focus on what matters most.
          </p>
          <ul className="mb-2">
            <li className="flex items-start gap-2 text-lg my-2">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Reduce Downtime with Reliable Equipment.</span>
            </li>
            <li className="flex items-start gap-2 text-lg">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Boost Productivity Through Innovation.</span>
            </li>
          </ul>
          <p className="text-gray-700">
            Minimize project delays with equipment that's built for performance and durability. Our reliable tools are designed to keep up with the demanding nature of industrial and construction work, ensuring that your operations run smoothly.
          </p>
        </div>
        {/* Right: Placeholder for image (replace with your image or div) */}
        <div className="flex-1 flex items-center justify-center min-h-[400px] rounded-lg"  data-aos="fade-left"
          data-aos-duration="1500">
          {/* Replace this div with your image */}
          <div className="w-full h-full flex overflow-hidden items-center justify-center  rounded-lg text-gray-400 text-2xl">
            {/* Example: <img src="your-image.jpg" alt="Jobsite" className="w-full h-full object-cover rounded-lg" /> */}
            <img src={project1} alt="" />
          </div>
        </div>
      </div>
    )
  },
  {
    label: "Prioritize Workplace Safety",
    content: (
      <div className="flex items-center flex-col lg:flex-row gap-10 mt-10">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-700">
            Safety Comes First
          </h2>
          <div className="w-20 h-1 bg-orange-500 my-4"></div>
          <p className="italic text-gray-600 mb-2">
            Our commitment to safety ensures every jobsite is equipped for secure and efficient work.
          </p>
          <ul className="mb-2">
            <li className="flex items-start gap-2 text-lg my-2">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Comprehensive Safety Gear</span>
            </li>
            <li className="flex items-start gap-2 text-lg">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Training and Best Practices</span>
            </li>
          </ul>
          <p className="text-gray-700">
            We offer safety equipment and guidance to minimize risks and help your team stay protected on site.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[400px] rounded-lg">
          <div className="w-full h-full flex overflow-hidden items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-2xl">
            <img src={project2} alt="" />
          </div>
        </div>
      </div>
    )
  },
  {
    label: "Effective Equipment Management",
    content: (
      <div className="flex flex-col items-center lg:flex-row gap-10 mt-10">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-700">
            Equipment Management Made Simple
          </h2>
          <div className="w-20 h-1 bg-orange-500 my-4"></div>
          <p className="italic text-gray-600 mb-2">
            Manage and maintain your equipment inventory easily for maximum ROI and uptime.
          </p>
          <ul className="mb-2">
            <li className="flex items-start gap-2 text-lg my-2">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Track Usage and Maintenance</span>
            </li>
            <li className="flex items-start gap-2 text-lg">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Reduce Loss and Downtime</span>
            </li>
          </ul>
          <p className="text-gray-700">
            Our management solutions help you keep track of your tools, schedule maintenance, and reduce operational hiccups.
          </p>
        </div>
        <div className="flex-1 flex items-center  justify-center min-h-[400px]  rounded-lg">
          <div className="w-full h-full flex overflow-hidden items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-2xl">
            <img src={project3} alt="" />
          </div>
        </div>
      </div>
    )
  },
  {
    label: "Embrace Innovation in Construction",
    content: (
      <div className="flex flex-col items-center lg:flex-row gap-10 mt-10">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-700">
            Innovative Solutions for Modern Construction
          </h2>
          <div className="w-20 h-1 bg-orange-500 my-4"></div>
          <p className="italic text-gray-600 mb-2">
            Stay ahead of the curve with the latest in construction technology and methods.
          </p>
          <ul className="mb-2">
            <li className="flex items-start gap-2 text-lg my-2">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Cutting-Edge Tools</span>
            </li>
            <li className="flex items-start gap-2 text-lg">
              <span className="text-orange-500 mt-1">✓</span>
              <span className="text-gray-700">Smart Automation</span>
            </li>
          </ul>
          <p className="text-gray-700">
            We help you adopt new technologies and innovations that can transform your business and projects.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[400px]  rounded-lg">
          <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-2xl">
            <img src={project4} alt="" />
          </div>
        </div>
      </div>
    )
  }
];

const TabsOrAccordion = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordions, setOpenAccordions] = useState([0]); // default: first accordion open

  const toggleAccordion = (idx) => {
    setOpenAccordions((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto py-10 px-5">
      {/* Desktop Tabs */}
      <div className="hidden md:flex flex-wrap border-b-2 mb-8">
        {tabData.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-6 py-4 cursor-pointer text-lg font-semibold focus:outline-none transition border-b-4 ${
              activeTab === idx
                ? "border-orange-500 text-gray-800"
                : "border-transparent text-gray-700"
            }`}
            onClick={() => setActiveTab(idx)}
            style={{ minWidth: "200px" }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Desktop Content */}
      <div className="hidden md:block">{tabData[activeTab].content}</div>

      {/* Mobile Accordion */}
      <div className="md:hidden">
        {tabData.map((tab, idx) => (
          <div key={tab.label} className="border-b">
            <button
              className="w-full text-left py-4 px-2 flex justify-between items-center text-lg font-semibold"
              onClick={() => toggleAccordion(idx)}
            >
              {tab.label}
              <span className={`ml-2 transition-transform duration-200 ${openAccordions.includes(idx) ? "rotate-180" : ""}`}>
                <FontAwesomeIcon icon={faChevronDown}  ></FontAwesomeIcon>
              </span>
            </button>
            {openAccordions.includes(idx) && (
              <div className="px-2 pb-4 animate-fadeIn">{tab.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsOrAccordion;