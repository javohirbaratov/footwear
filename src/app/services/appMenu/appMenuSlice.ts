import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAppMenuState = {
  isOpen: boolean;
};

const initialState: TAppMenuState = {
  isOpen: false,
};

const slice = createSlice({
  name: "appMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export default slice.reducer;

export const { toggleMenu } = slice.actions;

export const selectedAppMenuIsOpen = (state: RootState) => state.appMenu.isOpen;
