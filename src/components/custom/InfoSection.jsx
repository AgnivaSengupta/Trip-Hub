import React from 'react'
import placeholder from '../../assets/placeholder.png'
import { Button } from '../ui/button'
import { IoIosSend } from "react-icons/io";

const InfoSection = ({trip}) => {
  return (
    <div >
        <img src={placeholder} className='h-[350px] w-full object-cover rounded-xl' />

        <div className='my-5 flex flex-col gap-3'>
            <h2 className='font-bold text-xl'>
                {trip?.userSelection?.Location}
            </h2>

            <div className='flex justify-between'>
                <div className='flex gap-5'>
                    <h2 className='py-2 px-3 bg-[#FF01E6] rounded-full text-white text-sm font-medium '>
                    📅 {trip?.userSelection?.NoOfDays} Day
                    </h2>
                    <h2 className='py-2 px-3 bg-[#FE7236] rounded-full text-white text-sm font-medium'>
                    💰 Budget: {trip?.userSelection?.Budget}
                    </h2>
                    <h2 className='py-2 px-3 bg-[#23CC71] rounded-full  text-white text-sm font-medium'>
                    🖐️ {trip?.userSelection?.People}
                    </h2>
                </div>

                <Button variant='outline' className='rounded-lg mr-3 cursor-pointer transition-colors hover:bg-gray-100'><IoIosSend className='size-6'/></Button>
            </div>
            
        </div>
    </div>
  )
}

export default InfoSection