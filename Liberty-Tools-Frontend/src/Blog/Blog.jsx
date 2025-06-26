import React, { useEffect } from 'react'
import banner from "../assets/img/page-title-bg.jpg"
import { FaFolder, FaUser } from 'react-icons/fa6';
import { Description } from '../About/About Descrption/Description';
import { BlogCard } from './Blog Card/BlogCard';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
export const Blog = () => {
    const location = useLocation()
    const { blogs, setBlogs } = useOutletContext()
    const { blogId } = useParams()

    useEffect(() => {
        if (blogId) {
            document.getElementById(blogId).checked = true
        }

    }, [blogId])
    return (
        <div className='space-y-10' >
            {
                !location.pathname.startsWith('/dashboard') &&
                (
                    <div className="-mt-20 overflow-hidden h-[350px] relative">
                        <img src={banner} className="brightness-50 h-[500px] bg-cover w-full" alt="" />

                        <div className="text-center w-[650px] space-y-10 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-5xl text-white font-semibold ">Blog</div>
                    </div>
                )
            }

            {
                blogs.length == 0 && (
                    <div className='min-h-[330px]' >
                        <p className='font-semibold text-3xl text-center'>No Blog Yet..</p>
                    </div>

                )
            }

            <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 max-w-[1340px] mx-auto'>
                {
                    blogs.length > 0 ?

                        blogs.map((post, i) => (
                            <BlogCard key={i} post={post}  ></BlogCard>
                        ))

                        :

                        ''
                }


            </section>

        </div>
    )
}
