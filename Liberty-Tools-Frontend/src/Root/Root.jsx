import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { socket } from '../Socket/socket'
import axios from 'axios'
import { addLogo } from '../Redux/LibertyStore'
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Root = () => {


  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)
  const [queries, setQueries] = useState([])
  const [banners, setBanners] = useState([])
  const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.LibertyTools.users)
  useEffect(() => {
    AOS.init();
  }, [])
  const data = {
    products: products,
    categories: categories,
    setCategories: setCategories,
    setProducts: setProducts,
    queries: queries,
    setQueries: setQueries,
    banners: banners,
    setBanners: setBanners,
    blogs: blogs,
    setBlogs: setBlogs
  }

  useEffect(() => {


    if (admin && !socket.connected) {
      socket.emit('join')
    }
    socket.on('queries', (data) => {
      setQueries((prev) => [data.data, ...prev])


      toast.info('New Queries😱😱😱!!', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    })
    return () => {
      socket.off('queries')
    }

  }, [admin])


  useEffect(() => {
    socket.connect()
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getLogo`)
      .then((res) => {
        if (res.status == 200) {
          dispatch(addLogo((res.data.data)))
        }
      })
      .catch((err) => console.log(err))

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getBanners`)
      .then((res) => {
        if (res.status == 200) {

          setBanners(res.data.data)

          console.log('banners', banners)
        }
      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getBlogs`)
      .then((res) => {
        if (res.status == 200) {

          setBlogs(res.data.data)

          console.log('blogs', blogs)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
      .then((res) => {
        setProducts(res.data);

        console.log('products', products)



      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCategories`)
      .then((res) => {
        setCategories(res.data)
        console.log('categories', res)
      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getQueries`)
      .then((res) => setQueries(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,

        });
      })

  }, [])


  return (
    <div>

      <ToastContainer></ToastContainer>
      <Navbar categories={categories}  ></Navbar>
      <Outlet context={data}></Outlet>
      <Footer></Footer>



    </div>
  )
}
