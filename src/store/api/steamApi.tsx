import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_STEAM_WEB_API_KEY;

export const steamApi = createApi({
  //reducerPath: "games",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store.steampowered.com/",
    //baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getGameDetails: builder.query<any, number>({
      query: (appids) => {
        return {
          url: `api/appdetails`,
          params: { appids },
        };
      }, //key=${apiKey}`,
      //query: (appId) => `steamProxy?appId=${appId}`,
    }),
  }),
});
export const { useGetGameDetailsQuery } = steamApi;

//---直接在components內
// import React, { useEffect, useState } from 'react';
// //import SteamAPI from 'node-steamapi';

// const steam = new SteamAPI('YOUR_STEAM_WEB_API_KEY');

// const GameInfo: React.FC = () => {
//     const [gameDetails, setGameDetails] = useState<any>(null);

//     useEffect(() => {
//         async function fetchGameDetails() {
//             const details = await steam.getGameDetails(730);  // 730 是 CS:GO 的 appid
//             setGameDetails(details);
//         }

//         fetchGameDetails();
//     }, []);

//     return (
//         <div>
//             {gameDetails ? (
//                 <>
//                     <h1>{gameDetails.name}</h1>
//                     <img src={gameDetails.header_image} alt={gameDetails.name} />
//                 </>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }

// export default GameInfo;
