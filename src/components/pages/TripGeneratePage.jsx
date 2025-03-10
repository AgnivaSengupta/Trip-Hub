import React, { useState } from 'react'
import { Input } from '../ui/input'
import { SelectBudgetOptions } from '@/options/BudgetOptions'
import { TravelPartnerOptions } from '@/options/TravelPartnerOptions'
import { Button } from '../ui/button'
import {Toaster, toast } from 'sonner'
import { prompt } from '@/options/ai_prompt'
import { chatSession } from '@/service/Ai_modal'
import logo from '../../assets/logo.png'
import { FcGoogle } from "react-icons/fc";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
  } from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firbaseConfig'
import { useNavigate } from 'react-router-dom'
  

const TripGeneratePage = () => {

    const [formData, setformData] = useState({});
    const [OpenDialog, setOpenDialog] = useState(false);
    const [loading, setloading] = useState(false);
    const navigate =  useNavigate();

    // collecting the input form data
    const handleInputChange = (name, value)=>{
        
        setformData((prevState)=>(
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    // getting user detail from GOOGLE
    const getUserDetail = (tokenResponse)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse?.access_token}`, {
            
            headers: {
                Authorization: `Bearer ${tokenResponse?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res)=>{
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpenDialog(false);
            generateTrip();

        })
    }
        
    const login = useGoogleLogin({
        onSuccess: tokenResponse => getUserDetail(tokenResponse),
        onError: (error)=>console.log(error)
    })

    const generateTrip = async ()=>{

        const user = localStorage.getItem('user');

        if (!user){
            setOpenDialog(true);
            return;
        }

        if (!formData?.Budget || !formData?.People || !formData?.Location || !formData?.NoOfDays){
            toast.error("Please enter all the fields.")
            return;
        }

        if (formData?.NoOfDays > 10 || formData?.NoOfDays < 0){
            toast.error("Invalid number of days",
                {
                    description: "Number of days should be between 0-10"
                },
            );
            return;
        }

        setloading(true);

        // generating the dynamic prompt
        const {Location, NoOfDays, Budget, People} = formData
        const final_prompt = prompt(Location, NoOfDays, Budget, People)
        console.log(final_prompt);

        //sending the request
        const result  = await chatSession.sendMessage(final_prompt);
        const TripData = result?.response?.text();
        console.log(TripData);

        setloading(false);

        // saving the response
        SaveTripDetails(TripData);
    }

    // function for saving the ai response in firebase
    const SaveTripDetails = async (TripData)=>{

        setloading(true);
        //generating the doc id
        const docId = Date.now().toString()
        const user = JSON.parse(localStorage.getItem('user'));
        await setDoc(doc(db, "Trip Hub", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
          });

        setloading(false);

        navigate('/Trip-detail/'+ docId);
    }

  return ( 
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-15 px-5 mt-15 flex flex-col items-center'>
        <div>
        <h2 className='font-bold text-4xl'>Tell us Your Travel Preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner will generate a customized itenary based on ypur preferences.</p>
        </div>
        
        <div className='mt-15 flex flex-col gap-10'>
            <div>
                <h2 className='text-xl my-3 font-medium'>Where you want to visit</h2>
                {/* google auto complete feature to be added. */}
                <Input placeholder='Destination' className='xl:w-250 h-10'
                    onChange = {(e)=> handleInputChange('Location', e.target.value)}
                />
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip for?</h2>
                <Input placeholder='Ex. 3' type='number' className='xl:w-250 h-10'
                    onChange = {(e)=> handleInputChange('NoOfDays', e.target.value)}
                />
            </div>

            <div className='xl:w-300'>
                <h2 className='text-xl my-3 font-medium'>What's your Budget?</h2>
                <p className='mt-3 text-gray-500 text-l'>The budget is exclusively allocated for acctivities and loding/dining purposes.</p>
                <div className='grid grid-cols-3 gap-5 mt-5 xl:gap-10'>
                    {SelectBudgetOptions.map((item, index)=>(
                        <div key={index} 
                        onClick={(e)=>handleInputChange('Budget', item.title)}
                        className={ `flex flex-col flex-wrap items-start gap-2 p-4 border rounded-xl cursor-pointer hover:shadow-lg
                            ${formData?.Budget == item.title && 'shadow-lg border-2'}`}>

                            <h2 className='text-3xl xl:text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-gray-500 text-l'>{item.description}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='xl:w-300'>
                <h2 className='text-xl my-3 font-medium'>Whom do you want to travel with?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5 xl:gap-10'>
                    {TravelPartnerOptions.map((item, index)=>(
                        <div key={index} 
                        onClick={(e)=>handleInputChange('People', item.people)}
                        className= {` flex flex-col flex-wrap items-start gap-2 p-4 border rounded-xl cursor-pointer hover:shadow-lg 
                        ${formData?.People == item.people && 'shadow-lg border-2'}`}>

                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2>{item.people}</h2>
                            <h2 className='text-gray-500 text-l'>{item.description}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className='my-10 flex justify-end'>
            <Toaster/>
            <Button  disabled={loading}
            onClick = {()=>generateTrip()}
            className='bg-zinc-950 text-white text-lg font-medium h-15 w-45 rounded-lg cursor-pointer'>Generate Trip</Button>
        </div>

        <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
            <DialogContent className='bg-white'>
                <DialogHeader>
                    <img src={logo} className='w-35 h-15' />
                    <h2 className='font-bold text-lg '>Sign In with Google</h2>
                <DialogDescription>
                    Sign in to the App with Google Authentication securely
                    <Button onClick={login}
                    className='w-full h-10 mt-5 bg-zinc-950 text-white text-md font-medium rounded-md cursor-pointer'>
                        <FcGoogle className='size-6'/>
                        Sign in with Google
                    </Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    </div>
  )
}



export default TripGeneratePage