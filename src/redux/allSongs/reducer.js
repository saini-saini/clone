import { ALL_SONGS_DATA , ALL_ALBUM_SONGS} from "./action"
import SingerData from "../../data/SingerData"
import SongsList from "../../data/SongsList"
const initialState = {
    allSongsData: SingerData,
    allAlbumSongs: SongsList

}

const allSongsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SONGS_DATA:
            return {
                ...state,
                allSongsData: action.payload,
            }
        case ALL_ALBUM_SONGS:
            return {
                ...state,
                allAlbumSongs: action.payload
            }
        default:
            return state
    }
}


// const options = {
//     method: 'GET',
//     url: 'https://spotify23.p.rapidapi.com/search/',
//     params: {
//       q: '<REQUIRED>',
//       type: 'multi',
//       offset: '0',
//       limit: '10',
//       numberOfTopResults: '5'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'eae7d5836fmsh444c16beec59258p15a7ffjsn5aa1608204c7',
//       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     }
//   };
  

// export const fetchSongsData = () => {
//     return dispatch => {
//         axios.request(options)
//             .then((res) => {
//                 dispatch({
//                     type: ALL_SONGS_DATA,
//                     payload: res.data
//                 });
//             })
//             .catch((err) => console.log(err));
//     };
// };

export  {allSongsReducer};
