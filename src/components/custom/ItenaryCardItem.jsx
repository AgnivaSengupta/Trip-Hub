import React from 'react'
import placeholder from '../../assets/placeholder.png'
import { Link } from 'react-router-dom'

const ItenaryCardItem = ({item}) => {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ item?.placeName} target='_blank'>
        <div className='border rounded-xl p-3 mt-3 flex gap-5 hover:scale-105 transition-all cursor-pointer'>
            <img src={placeholder} className='w-[140px] h-[140px] rounded-xl' />

            <div>
                <h2 className='font-bold text-lg'>{item?.placeName}</h2>
                <h2 className='font-medium text-gray-500'>{item?.placeDetails}</h2>
                <h2 className='font-medium text-sm text-orange-500'>{item?.timeTravel}</h2>
                <h2 className='mt-2 font-medium'>{item?.ticketPricing}</h2>

            </div>
        </div>
    </Link>
    
  )
}

export default ItenaryCardItem