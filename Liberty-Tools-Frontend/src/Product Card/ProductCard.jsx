
import { useLocation, useNavigate, useOutletContext } from 'react-router'

import axios from 'axios'
import Swal from 'sweetalert2'
import { capitalizeWords } from '../Functions/functions'
import { ProductUpdate } from '../Dashboard/Update/ProductUpdate'


export const ProductCard = ({ item }) => {
  const navigate = useNavigate()
  const { products, categories, setProducts } = useOutletContext()
  const location = useLocation()
  const handleDelete = () => {

    if (item) {
      const formData = {
        id: item._id
      }


      Swal.fire({
        title: `Do you want Delete ${item.mdoel}?`,
        showDenyButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, { data: { id: item._id } })
            .then((res) => {

              Swal.fire({
                icon: "success",
                title: `${item.model} got deleted`,
                text: "Deletion successful!",

              });

              setProducts(res.data.data);



            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: error.message

              });
            })

        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

    } else {
      Swal.fire("Changes are not saved", "", "info");
    }



  }

  return (
    <div className='w-[250px]'>
      <div className='border-2 border-orange-500 group relative flex items-center justify-center font-semibold p-5 cursor-pointer rounded-xl'>
        <div onClick={() => navigate(`/products/${item?.model}`)} className='relative' >
          <img loading="lazy" src={item?.imageUrl[0]} className='w-[250px] h-[200px] rounded-xl ' alt="" />
          <p className='tooltip max-sm:hidden absolute bottom-0 right-1 bg-orange-500 text-white px-3 py-1 rounded font-semibold text-sm' data-tip={item?.model}>{item?.model?.slice(0, 10).toUpperCase()} {item?.model.length > 20 && (
            <span>
              ...
            </span>
          )} </p>

          <span className="absolute top-0 left-1 bg-orange-500 text-white px-3 py-1 rounded font-semibold text-sm ">
            {item?.category.toUpperCase()}
          </span>

        </div>


        {
          location.pathname.startsWith('/dashboard') &&
          (
            <div className='absolute md:group-hover:opacity-100 md:opacity-0 opacity-100 space-x-2 transition-all duration-150 ease-in-out right-2 top-2'>

              {
                !item ?
                  (
                    <button className='btn btn-primary btn-dash px-2 rounded-sm' disabled={true}>Update</button>
                  )
                  :
                  (
                    <label htmlFor={`ProductUpdate-${item?._id}`} className='btn btn-primary btn-dash px-2 rounded-sm'>Update</label>
                  )

              }

              <button className='btn btn-error btn-dash px-2 rounded-sm' onClick={handleDelete}  >Delete?</button>
            </div>

          )
        }
        <ProductUpdate item={item} ></ProductUpdate>

      </div>
    </div>

  )
}
