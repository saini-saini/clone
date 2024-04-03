export const SIGNUP_USER_DATA = "SIGNUP_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_USER_DATA = "LOGIN_USER_DATA";
export  const CREATE_PLAYLIST = "CREATE_PLAYLIST"
export const CLICKED_ADD_SONG = "CLICKED_ADD_SONG";
export const REMOVE_SONG = "REMOVE_SONG";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const SignUpUserData = (data) => ({
    type: SIGNUP_USER_DATA,
    payload: data
});


export const LoginUserData = (data) => ({
    type: LOGIN_USER_DATA,
    payload: data
});

export const LogoutUserData = (data) => ({
    type: LOGOUT_USER,
    payload: data
});

export const createPlaylist = (data) => {
    return {
        type: CREATE_PLAYLIST,
        payload: data
    }
}

export const updateUserData = (data) => ({
    type: UPDATE_USER_DATA,
    payload: data
});

export const ClickedAddSong = (data) => ({
    type: "CLICKED_ADD_SONG",
    payload: data
})

export const ClickedRemoveSong = (data) => ({
    type: "REMOVE_SONG",
    payload: data
})