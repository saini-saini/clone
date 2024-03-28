import { combineReducers } from "redux";
import {allSongsReducer} from "./allSongs/reducer"
import userDetailReducer from "./userData/reducer";
import { clickSongDataReducer } from "./clickSongData/reducer";
import { playlistReducer } from "./playlist/reducer";

export default combineReducers({
    data: allSongsReducer,
    userDetail : userDetailReducer,
    clickSong : clickSongDataReducer,
    playlistData: playlistReducer,
})

