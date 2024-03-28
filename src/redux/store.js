import { configureStore } from '@reduxjs/toolkit'
import reducer from "./parentReducer"



import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: storage,
    version:"1.0"
}


const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
});


const persistor = persistStore(store);

export  {store  , persistor};
