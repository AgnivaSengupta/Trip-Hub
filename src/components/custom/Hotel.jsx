import React from 'react'
import placeholder from '../../assets/placeholder.png'
import { Link } from 'react-router-dom'

const Hotel = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl my-5'>Hotel Recomendations</h2>

        <div className='grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
            {trip?.tripData?.hotelOptions?.map((hotel, index)=>(
                <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank'>
                     <div className='hover:scale-105 transition-all cursor-pointer'>
                        <img src={placeholder} className='rounded-xl'/>
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel?.hotelName}</h2>
                            <h2 className='text-sm text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                            <h2 className='text-sm font-medium'>💰 {hotel?.price}</h2>
                            <h2 className='text-sm font-medium'>⭐ {hotel?.rating}/5</h2>
                        </div>
                    </div>
                
                </Link>
                
            ))}
        </div>
    </div>
  )
}

export default Hotel