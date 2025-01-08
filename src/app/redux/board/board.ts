import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
  boardDetail: {}
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<any>) => {
      state.boardDetail = action.payload;
    },
    updateGroups: (state, action: PayloadAction<any>) => {
      state.boardDetail.groups = action.payload.groups;
    },
    updateItems: (state, action: PayloadAction<any>) => {
      state.boardDetail.items = action.payload.items;
    },
  },
});

export const { setBoard, updateGroups, updateItems } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;