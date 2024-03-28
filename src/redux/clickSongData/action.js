export const CLICK_SONG_DATA = "CLICK_SONG_DATA";
export const TABLE_DATA = "TABLE_DATA";
export const CLICKED_TABLE_SONG = "CLICKED_TABLE_SONG";
export const CLICKED_ADD_SONG = "CLICKED_ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";
export const ClickedSongsData = (data) => ({
    type: CLICK_SONG_DATA,
    payload: data
})

export const tableData = (data) => ({
    type: "TABLE_DATA",
    payload: data
})

export const ClickedTableSong = (data) => ({
    type: "CLICKED_TABLE_SONG",
    payload: data
})

// export const ClickedAddSong = (data) => ({
//     type: "CLICKED_ADD_SONG",
//     payload: data
// })

// export const ClickedRemoveSong = (data) => ({
//     type: "REMOVE_SONG",
//     payload: data
// })