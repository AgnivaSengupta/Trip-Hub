import React from 'react'
import ItenaryCardItem from './ItenaryCardItem'

const DailyItenary = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl'>Places to visit</h2>

        <div>
            {trip?.tripData?.itinerary?.map((dayNo, index1)=>(
                <div className='mt-5 mb-10'>
                    <h2 className='font-medium text-lg'>Day {dayNo?.day}</h2>
                    {dayNo?.activities?.map((item, index2)=>(
                        <div>
                            {/* <h2>{item?.placeName}</h2>
                            <h2>{item?.placeDetails}</h2>
                            <h2>{item?.ticketPricing}</h2> */}
                            <ItenaryCardItem item={item}/>
                            
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default DailyItenary

// import React from 'react';

// const DailyItinerary = ({ trip }) => {
//   return (
//     <div>
//       <h2 className="font-bold text-xl">Places to visit</h2>

//       <div>
//         {trip?.tripData?.itinerary &&
//           Object.entries(trip.tripData.itinerary)
//             .sort(([a], [b]) => a.localeCompare(b)) // Sort keys in ascending order
//             .map(([key, value]) => (
//               <div key={key}>
//                 <h2 className='font-medium text-lg'>{key.toUpperCase()}</h2>

//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default DailyItinerary;

