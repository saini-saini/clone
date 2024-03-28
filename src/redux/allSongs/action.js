export const ALL_SONGS_DATA = "ALL_SONGS_DATA";
export const ALL_ALBUM_SONGS = "ALL_ALBUM_SONGS"
export const AllSongsData = (data) => ({
    type: ALL_SONGS_DATA,
    payload: data
})

export const AllAlbumSongs = (data) => ({
    type: ALL_ALBUM_SONGS,
    payload: data
})


