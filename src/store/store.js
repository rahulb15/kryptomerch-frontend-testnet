// /* eslint-disable */
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//     FLUSH,
//     PAUSE,
//     PERSIST,
//     persistReducer,
//     persistStore,
//     PURGE,
//     REGISTER,
//     REHYDRATE,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "src/features/authSlice";
// import launchpadReducer from "src/features/launchpadSlice";
// import searchReducer from "src/features/searchSlice";
// import { launchpadApi } from "src/services/launchpad.service";
// import { marketplaceApi } from "src/services/marketplace.service";
// import { priorityPassApi } from "src/services/prioritypass.service";
// import { nftApi } from "src/services/nft.service";
// import balanceReducer from "src/features/balanceSlice";
// import cartReducer from "src/features/cartSlice";
// import notificationReducer from "src/features/notificationSlice";

// const rootReducer = combineReducers({
//     auth: authReducer,
//     search: searchReducer,
//     launchpad: launchpadReducer,
//     balance: balanceReducer,
//     cart: cartReducer,
//     notification: notificationReducer,
//     [launchpadApi.reducerPath]: launchpadApi.reducer,
//     [marketplaceApi.reducerPath]: marketplaceApi.reducer,
//     [nftApi.reducerPath]: nftApi.reducer,
//     [priorityPassApi.reducerPath]: priorityPassApi.reducer,
// });

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage,
//     whitelist: ["auth", "search", "launchpad", "balance"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const loggerMiddleware = () => (next) => (action) => {
//     const result = next(action);
//     return result;
// };

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [
//                     FLUSH,
//                     REHYDRATE,
//                     PAUSE,
//                     PERSIST,
//                     PURGE,
//                     REGISTER,
//                 ],
//             },
//         }).concat(
//             loggerMiddleware,
//             launchpadApi.middleware,
//             marketplaceApi.middleware,
//             nftApi.middleware,
//             priorityPassApi.middleware
//         ),
// });

// export const persistor = persistStore(store);


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "src/features/authSlice";
import launchpadReducer from "src/features/launchpadSlice";
import searchReducer from "src/features/searchSlice";
import { launchpadApi } from "src/services/launchpad.service";
import { marketplaceApi } from "src/services/marketplace.service";
import { priorityPassApi } from "src/services/prioritypass.service";
import { nftApi } from "src/services/nft.service";
import balanceReducer from "src/features/balanceSlice";
import cartReducer from "src/features/cartSlice";
import notificationReducer from "src/features/notificationSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    launchpad: launchpadReducer,
    balance: balanceReducer,
    cart: cartReducer,
    notification: notificationReducer,
    [launchpadApi.reducerPath]: launchpadApi.reducer,
    [marketplaceApi.reducerPath]: marketplaceApi.reducer,
    [nftApi.reducerPath]: nftApi.reducer,
    [priorityPassApi.reducerPath]: priorityPassApi.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth", "search", "launchpad", "balance", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = () => (next) => (action) => {
    const result = next(action);
    return result;
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(
            loggerMiddleware,
            launchpadApi.middleware,
            marketplaceApi.middleware,
            nftApi.middleware,
            priorityPassApi.middleware
        ),
});

export const persistor = persistStore(store);
