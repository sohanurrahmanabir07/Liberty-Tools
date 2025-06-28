import React, { useEffect, useState } from 'react';
import { socket } from '../Socket/socket';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';


export const Quote = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: '',
        description: '',
        phone: '',
        type: 'quote'
    })
    const handleForm = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        AOS.init();
    }, [])
    const handleSubmit = () => {


        socket.emit('sendQueries', contact)
        setContact({
            name: '',
            email: '',
            subject: '',
            description: '',
            phone: '',
            type: 'quote'
        })
        Swal.fire({
            title: "Your Queries!",
            text: "Successfully Sent!",
            icon: "success"
        });


    }
    return (
        <div className=" max-w-[1340px] mx-auto py-10 px-5">


            <div className="flex items-center max-sm:flex-col md:space-x-5">
                {/* Left image (placeholder, replace with yours) */}
                <div className="space-y-7 md:w-1/2" data-aos="fade-right"  data-aos-duration="2000" >
                    <h1 className='font-bold md:text-5xl text-2xl '>Extensive Selection of Power Tools & Industrial Machinery.</h1>
                    <p>Discover a vast inventory of top-brand power tools and heavy-duty industrial machinery. From drills and saws to lathes and mills, we have the equipment you need to tackle any project.
                        <br />
                        <br />

                        Outfit your professional workshop or industrial facility with our extensive selection of high-quality power tools and machinery. We cater to the demands of professionals in various industries.</p>
                </div>

                {/* Contact Form */}
                <div className=' md:w-1/2 space-y-5' data-aos="fade-left"  data-aos-duration="1500">
                    <h3 className="font-bold text-xl mb-1">Get A Quote</h3>
                    <p className="mb-6 text-sm text-gray-600">
                        Tell us about your requirements, and we'll provide a tailored quote.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 ">
                        <input
                            type="text"
                            placeholder="Name *"
                            value={contact.name}
                            name='name'

                            onChange={handleForm}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="email"
                            name='email'
                            placeholder="E-mail *"
                            onChange={handleForm}
                            value={contact.email}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name='phone'
                        value={contact.phone}
                        onChange={handleForm}
                        placeholder="Phone number *"
                        className="w-full p-3 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        value={contact.subject}
                        onChange={handleForm}
                        className="border border-gray-300 rounded p-3 focus:outline-none w-full"
                    />
                    <textarea
                        placeholder="Your request *"
                        value={contact.description}
                        onChange={handleForm}
                        name='description'
                        rows="5"
                        className="w-full p-3 border border-gray-300 rounded"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        disabled={!contact.name && !contact.email && !contact.subject && !contact.description}
                        onClick={handleSubmit}
                        className={`   ${!contact.name || !contact.email || !contact.subject || !contact.description ? `bg-gray-400 cursor-not-allowed ` : `bg-yellow-400 hover:bg-yellow-500`}  text-white text-lg font-semibold rounded-lg p-3 mt-2 transition`}
                    >
                        Send Message
                    </button>

                    <p className="text-xs mt-3 text-gray-500">
                        We Value Your Business-Related Messages for support, and other questions.
                    </p>
                </div>
            </div>
        </div>
    );
};
