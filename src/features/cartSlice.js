// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     carts: []
// }

// // card slice
// const cartSlice = createSlice({
//     name: "cartslice",
//     initialState,
//     reducers: {

//         // add to cart
//         addToCart: (state, action) => {
//             console.log(action.payload);
//             console.log(state.carts);

//             const IteamIndex = state.carts.findIndex((iteam) => iteam._id === action.payload._id);

//             if (IteamIndex >= 0) {
//                 state.carts[IteamIndex].qnty += 1
//             } else {
//                 const temp = { ...action.payload, qnty: 1 }
//                 state.carts = [...state.carts, temp]

//             }
//         },

//         // remove perticular iteams
//         removeToCart:(state,action)=>{
//             const data = state.carts.filter((ele)=>ele._id !== action.payload);
//             state.carts = data
//         },

//         // remove single iteams
//         removeSingleIteams:(state,action)=>{
//             const IteamIndex_dec = state.carts.findIndex((iteam) => iteam._id === action.payload._id);

//             if(state.carts[IteamIndex_dec].qnty >=1){
//                 state.carts[IteamIndex_dec].qnty -= 1
//             }

//         },

//         // clear cart
//         emptycartIteam:(state,action)=>{
//             state.carts = []
//         }
//     }
// });

// export const { addToCart,removeToCart,removeSingleIteams ,emptycartIteam} = cartSlice.actions;

// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     carts: []
// };

// const cartSlice = createSlice({
//     name: "cartslice",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const itemIndex = state.carts.findIndex((item) => item._id === action.payload._id);
//             if (itemIndex >= 0) {
//                 state.carts[itemIndex].qnty += 1;
//             } else {
//                 const temp = { ...action.payload, qnty: 1 };
//                 state.carts.push(temp);
//             }
//         },
//         removeFromCart: (state, action) => {
//             state.carts = state.carts.filter((ele) => ele._id !== action.payload);
//         },
//         removeSingleItem: (state, action) => {
//             const itemIndex = state.carts.findIndex((item) => item._id === action.payload._id);
//             if (state.carts[itemIndex].qnty > 1) {
//                 state.carts[itemIndex].qnty -= 1;
//             } else {
//                 state.carts.splice(itemIndex, 1);
//             }
//         },
//         emptyCart: (state) => {
//             state.carts = [];
//         }
//     }
// });

// export const { addToCart, removeFromCart, removeSingleItem, emptyCart } = cartSlice.actions;

// export const selectCartItems = (state) => state.cart.carts;
// export const selectIsInCart = (state, itemId) => state.cart.carts.some(item => item._id === itemId);

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.carts.findIndex((item) => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1;
            } else {
                state.carts.push({ ...action.payload, qnty: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter((item) => item._id !== action.payload);
        },
        removeSingleItem: (state, action) => {
            const itemIndex = state.carts.findIndex((item) => item._id === action.payload);
            if (state.carts[itemIndex].qnty > 1) {
                state.carts[itemIndex].qnty -= 1;
            } else {
                state.carts = state.carts.filter((item) => item._id !== action.payload);
            }
        },
        emptyCart: (state) => {
            state.carts = [];
        }
    }
});

export const { addToCart, removeFromCart, removeSingleItem, emptyCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.carts;
export const selectIsInCart = (state, itemId) => state.cart.carts?.some(item => item._id === itemId);

export default cartSlice.reducer;