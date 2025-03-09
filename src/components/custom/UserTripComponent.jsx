import React from 'react'
import { Link } from 'react-router-dom'

const UserTripComponent = ({trip}) => {
  return (
    <Link to={`/Trip-detail/${trip.id}`}> 
        <div className='border rounded-lg flex flex-col gap-2 h-40 w-60 bg-gray-200 justify-center items-center hover:scale-105 transition-all'>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.Location}</h2>
            <h2 className='font-medium text-gray-600 text-center'>{trip?.userSelection?.NoOfDays} Days trip with {trip?.userSelection?.Budget}</h2>
        </div>
    </Link>
    
  )
}

export default UserTripComponent