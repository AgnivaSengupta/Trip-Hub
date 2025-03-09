import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import illustration from '../../assets/traveller.png'

const LandingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-auto'>
        <h1 className='font-extrabold text-[70px] text-center'>
            <span className='text-[#F75D39]'> Map your next <span className='bg-amber-300 text-amber-50 px-1.5 rounded-md '> Adventure</span> using AI:</span>
            <br/>
            Personalized Itenaries
        </h1>
        <p className='text-center font-bold text-2xl mt-10'>Your personal trip planner and travel curator, creating custom itenaries tailored to your preferences.</p>

        <Link to={'/trip-generator'}>
        <Button className='bg-zinc-950 text-lg text-bold text-white h-15 w-40 rounded-2xl mt-10 hover:cursor-pointer'>Get Started</Button>
        </Link>
        

        <div className='h-100 w-200 my-10 rounded-2xl'>
            <img src={illustration}  />
        </div>
    </div>
  )
}

export default LandingPage