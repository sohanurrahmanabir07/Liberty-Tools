import { capitalizeWords } from "../Functions/functions"
import banner from "../assets/img/Cordless tools banner.jpg"

export const DynamicBanner = ({ item }) => {
  return (
    <div>
      {

        !item ?
          (
            <div className="skeleton min-h-[500px] w-full " ></div>
          )
          :

          (
            <div className='relative overflow-hidden shadow-sm shadow-gray-400 -mt-20'>

              {/* <img loading="lazy" src={item?.imageUrl || banner} className='brightness-50 w-full ' alt="" /> */}
              <img loading="lazy" src={ item?.bannerImgUrl[0]} className='brightness-50 w-full max-sm:h-[200px] ' alt="" />
              <div className='absolute  bottom-5 left-5'>
                <p className='font-semibold text-3xl text-gray-300 text-shadow-xl text-shadow-yellow-600'>
                  {capitalizeWords(item?.name)}
                </p>
              </div>

            </div>
          )
      }
    </div>

  )

}

