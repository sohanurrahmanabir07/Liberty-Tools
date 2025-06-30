import React from 'react'
import { Blog } from '../../Blog/Blog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { BlogUpload } from '../FileUpload/BlogUpload'
import { useOutletContext } from 'react-router-dom'

export const DashboardBlog = () => {
    const { blogs, setBlogs } = useOutletContext()
    return (
        <div>
            <p className='md:text-5xl text-3xl text-center'>Blogs</p>
            <br />
            <div className='flex flex-row-reverse my-5'>
                <button className='btn bg-orange-500 text-white hover:bg-orange-400' onClick={() => document.getElementById('BlogUpload').checked = true} >Add New Blog <FontAwesomeIcon icon={faPlus} size='md' ></FontAwesomeIcon></button>
            </div>
            <BlogUpload></BlogUpload>
            <Blog  ></Blog>

        </div>
    )
}
