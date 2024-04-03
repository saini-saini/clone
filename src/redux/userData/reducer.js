import {
    SIGNUP_USER_DATA,
    LOGIN_USER_DATA,
    LOGOUT_USER,
    UPDATE_USER_DATA,
} from "./action";

const initialState = {
    signUpUserData: [],
    loggedInUser: null,
    error: ""
};

function generateUniqueRandomId(existingIds) {
    let id;
    do {
        id = Math.floor(10000 + Math.random() * 90000);
    } while (existingIds.includes(id));
    return id;
}

const userDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER_DATA:
            const existingIds = state.signUpUserData.map(user => user.id);
            const newUserId = generateUniqueRandomId(existingIds);
            const newUser = {
                id: newUserId,
                username: action.payload.username,
                email: action.payload.email,
                number: action.payload.number,
                password: action.payload.password,
                confirmpassword: action.payload.confirmpassword
            };
            return {
                ...state,
                signUpUserData: [...state.signUpUserData, newUser],
                loggedInUser: newUser
            };
        case LOGIN_USER_DATA:
            const { email, password } = action.payload;
            const matchedUser = state.signUpUserData.find(user => user.email === email && user.password === password);
            if (matchedUser) {
                return {
                    ...state,
                    loggedInUser: matchedUser,
                    error: ""
                };
            } else {
                return {
                    ...state,
                    error: "Can't find account with this email and password"
                };
            }
        case LOGOUT_USER:
            return {
                ...state,
                loggedInUser: null,
                error: ""
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                signUpUserData: state.signUpUserData.map(user => {
                    if (user.id === action.payload.id) {
                        return {
                            ...user,
                            ...action.payload
                        };
                    }
                    return user;
                }),
                loggedInUser: {
                    ...state.loggedInUser,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};

export default userDetailReducer;
