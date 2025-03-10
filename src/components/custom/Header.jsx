import React, { useEffect, useState } from 'react'
import logo_transparent from '../../assets/logo.png'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
  } from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FcGoogle } from "react-icons/fc";
import logo from '../../assets/logo.png'


const Header = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const userImg = user?.picture;
    const [OpenDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        console.log(user)
    }, [])

    const login = useGoogleLogin({
        onSuccess: tokenResponse => getUserDetail(tokenResponse),
        onError: (error)=>console.log(error)
    })

    const getUserDetail = (tokenResponse)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse?.access_token}`, {
            
            headers: {
                Authorization: `Bearer ${tokenResponse?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res)=>{
            localStorage.setItem('user', JSON.stringify(res.data))
            setOpenDialog(false);
            window.location.reload();
        })
    }

    return (
        <div className='flex justify-between items-center m-5'>
            <img src={logo_transparent} alt="Trip Hub" className='h-22 wi-50' />
            {user ?
                <div className='flex items-center gap-5'>
                    <a href="/trip-generator">
                        <Button variant='outline' className='rounded-full cursor-pointer'>+ Create trip</Button>
                    </a>

                    <a href="/my-trips">
                        <Button variant='outline' className='rounded-full cursor-pointer'>My Trip</Button>

                    </a>

                    <Popover>
                        <PopoverTrigger>
                            <img src={userImg} className='rounded-full size-10 cursor-pointer' />
                        </PopoverTrigger>
                        <PopoverContent>
                            <h2 className='cursor-pointer'
                                onClick={() => {
                                    googleLogout();
                                    localStorage.clear();
                                    window.location.reload();
                                }}>LogOut</h2>
                        </PopoverContent>
                    </Popover>

                </div>

                : <Button onClick={()=>setOpenDialog(true)}variant='outline' className='bg-zinc-900 text-white font-bold text-lg h-12 w-30 rounded-md'>Sign in</Button>
            }

            <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <img src={logo} className='w-35 h-15' />
                        <h2 className='font-bold text-lg '>Sign In with Google</h2>
                        <DialogDescription>
                            Sign in to the App with Google Authentication securely
                            <Button onClick={login}
                                className='w-full h-10 mt-5 bg-zinc-950 text-white text-md font-medium rounded-md cursor-pointer'>
                                <FcGoogle className='size-6' />
                                Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>

    )
}

export default Header