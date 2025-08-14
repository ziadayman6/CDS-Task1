import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export type Active = {
  id: number;
  name: string | null;
  description: string | null;
};

const active: Active[] = [
  {
    id: 4,
    name: "Dashi",
    description: "Active Directory for Dashi",
  },
  {
    id: 1005,
    name: "AD_124",
    description: "Active Directory for AD_124",
  },
  {
    id: 55,
    name: "AD_125",
    description: "Active Directory for AD_125",
  },
  {
    id: 56,
    name: "AD_126",
    description: "Active Directory for AD_126",
  },
];

const activeSlice = createSlice({
  name: "active",
  initialState: active,
  reducers: {
    addActive: (state, action: PayloadAction<Active>) => {
      toast.success("Added successfully");
      state.push(action.payload);
    },
    updateActive: (state, action: PayloadAction<Active>) => {
      const index = state.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        toast.success("Edited successfully");
        state[index] = action.payload;
      }
    },
    deleteActive: (state, action: PayloadAction<number>) => {
      toast.success("Deleted successfully");
      return state.filter((u) => u.id !== action.payload);
    },
  },
});

export const selectActiveNameById = (state: Active[], id: number) => {
  return state.find((b) => b.id === id)?.name ?? null;
};

export const { addActive, updateActive, deleteActive } = activeSlice.actions;
export default activeSlice.reducer;
