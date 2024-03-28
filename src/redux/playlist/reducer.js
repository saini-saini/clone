import { CREATE_PLAYLIST, CLICKED_ADD_SONG, CLICKED_REMOVE_SONG, DELETE_PLAYLIST, UPDATE_PLAYLIST } from "./action";

const initialState = {
    playlists: []
}

function generateUniqueRandomId(existingIds) {
    let id;
    do {
        id = Math.floor(10000 + Math.random() * 90000);
    } while (existingIds.includes(id));
    return id;
}

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PLAYLIST:
            const existingIds = state.playlists.map(user => user.id);
            const newUserId = generateUniqueRandomId(existingIds);
            const newPlaylist = {
                ...action.payload,
                songs: [],
                id: newUserId,
            };
            return {
                ...state,
                playlists: [...state.playlists, newPlaylist]
            };
            case UPDATE_PLAYLIST:
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === action.payload.id) {
                        return {
                            ...playlist,
                            ...action.payload
                        };
                    }
                    return playlist;
                })
            };
            case DELETE_PLAYLIST:
                return {
                    ...state,
                    playlists: state.playlists.filter(playlist => playlist.id !== action.payload)
                }
        case CLICKED_ADD_SONG:
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === action.payload.playlistId) {
                        return {
                            ...playlist,
                            songs: [...playlist.songs, action.payload.songId]
                        };
                    }
                    return playlist;
                })
            };
        case CLICKED_REMOVE_SONG:
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.id === action.payload.playlistId) {
                        return {
                            ...playlist,
                            songs: playlist.songs.filter(songId => songId !== action.payload.songId)
                        };
                    }
                    return playlist;
                })
            };
        default:
            return state;
    }
}


export { playlistReducer };
