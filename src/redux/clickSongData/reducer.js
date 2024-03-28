import { CLICK_SONG_DATA, TABLE_DATA, CLICKED_TABLE_SONG,CLICKED_ADD_SONG,REMOVE_SONG } from "./action";

const initialState = {
    clickSongData: {},
    tableData: {},
    clickedTableSong: {},
    // clickedAddSong: []
}

const clickSongDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICK_SONG_DATA:
            return {
                ...state,
                clickSongData: action.payload
            }
        case TABLE_DATA:
            return {
                ...state,
                tableData: action.payload
            }
        case CLICKED_TABLE_SONG:
            return {
                ...state,
                clickedTableSong: action.payload
            }
        // case CLICKED_ADD_SONG:
        //     return {
        //         ...state,
        //         clickedAddSong: [...state.clickedAddSong, action.payload]            }
        //     case REMOVE_SONG:
        //         return {
        //             ...state,
        //             clickedAddSong: state?.clickedAddSong?.filter(id => id !== action.payload)
        //         }
        default:
            return state
    }
}

export  {clickSongDataReducer}