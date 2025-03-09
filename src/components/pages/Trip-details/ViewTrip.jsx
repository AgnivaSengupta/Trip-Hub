import InfoSection from '@/components/custom/InfoSection';
import { db } from '@/service/firbaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Hotel from '@/components/custom/Hotel';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import DailyItenary from '@/components/custom/DailyItenary';
import Footer from '@/components/custom/Footer';

const ViewTrip = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([])

    /** executing the function only when tripId exists
     *  and if the tripId gets changed
     * */ 
    useEffect(()=>{
        tripId && getTripdata();
    }, [tripId]);

    // getting data from firebase
    const getTripdata = async ()=>{
        const docReference = doc(db, 'Trip Hub', tripId);
        const docSnap = await getDoc(docReference);

        if (docSnap){
            console.log("Document: ", docSnap.data())
            setTrip(docSnap.data());
        }
        else{
            console.error("NO such log exists");
            toast('No Trip Found.')
        }
    }
    return (
        <div className=' flex flex-col gap-10 p-10 md:px-20 lg:px-44 xl:px-56'>
                {/* Information section */}
                <InfoSection trip={trip}/>

                {/* Recomended hotel */}
                <Hotel trip={trip}/>

                {/* Daily Itenary */}
                <DailyItenary trip={trip}/>

                {/* Footer */}
                <Footer/>
                
        </div>
    )
}

export default ViewTrip