import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null,
    loading: false,
    error: null,
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action) => {
            state.value = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setBalance, setLoading, setError } = balanceSlice.actions;

export default balanceSlice.reducer;
