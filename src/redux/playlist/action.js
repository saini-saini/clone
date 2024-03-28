export  const CREATE_PLAYLIST = "CREATE_PLAYLIST"
export const CLICKED_ADD_SONG = 'CLICKED_ADD_SONG';
export const CLICKED_REMOVE_SONG = 'CLICKED_REMOVE_SONG';
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST"
export const createPlaylist = (data) => {
    return {
        type: CREATE_PLAYLIST,
        payload: data
    }
}

export const updatePlaylist = (data) => ({
    type: UPDATE_PLAYLIST,
    payload: data
});


export const deletePlaylist = (data) => {
    return {
        type: DELETE_PLAYLIST,
        payload: data
    }
}

export const ClickedAddSong = (playlistId, songId) => ({
    type: CLICKED_ADD_SONG,
    payload: { playlistId, songId }
});

export const ClickedRemoveSong = (playlistId, songId) => ({
    type: CLICKED_REMOVE_SONG,
    payload: { playlistId, songId }
});

