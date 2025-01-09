import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {
  boards: [],
  boardDetail: {
  }
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<any>) => {
      state.boardDetail = action.payload;
    },
    setBoards: (state, action: PayloadAction<any>) => {
      state.boards = action.payload;
    },
    updateGroups: (state, action: PayloadAction<any>) => {
      state.boardDetail.groups = action.payload.groups;
    },
    updateItems: (state, action: PayloadAction<any>) => {
      state.boardDetail.items = action.payload.items;
    },
  },
});

export const { setBoard, updateGroups, updateItems, setBoards } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;