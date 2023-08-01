import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TempState {
  temp: string;
}

const initialState: TempState = {
  temp: '',
};

const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    load: (state: TempState, action: PayloadAction<string>) => {
      state.temp = action.payload;
    },
  },
});

export const { load } = tempSlice.actions;
export default tempSlice.reducer;
