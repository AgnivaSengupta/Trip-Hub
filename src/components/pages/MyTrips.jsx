
import { db } from '@/service/firbaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripComponent from '../custom/UserTripComponent';

const MyTrips = () => {
    const navigate = useNavigate(); 
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        GetUserTrips();
    }, []); 

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/'); 
            return;
        }

        try {
            const q = query(collection(db, 'Trip Hub'), where('userEmail', '==', user.email));
            const querySnapshot = await getDocs(q);

            const trips = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log("Fetched Trips:", trips);
            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching user trips:", error);
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-15 px-5 mt-15'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            {loading ? ( 
                <p>Loading trips...</p> 
            ) : userTrips.length > 0 ? (
                <div className='flex flex-wrap gap-10 mt-10'>
                    {userTrips.map((trip) => (
                        <UserTripComponent key={trip.id} trip={trip} />
                    ))}
                </div>
            ) : (
                <p>No trips found.</p> 
            )}
        </div>
    );
};

export default MyTrips;

