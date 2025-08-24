import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export type Business = {
  id: string;
  name: string | null;
  code: string | null;
};

const business: Business[] = [
  {
    id: "09a0ae23-8f26-483c-87a9-d4216d3414d7",
    name: "test production",
    code: "test",
  },
  {
    id: "40aa7390-4461-4b12-9d13-18ad26f1d928",
    name: "new",
    code: "new BU",
  },
  {
    id: "6b84110b-f789-43c1-a865-61d802f5a67f",
    name: "testBU",
    code: "testBU",
  },
  {
    id: "c0f1b2d3-4e5f-6a7b-8c9d-e0f1a2b3c4d5",
    name: "test",
    code: "test",
  },
  {
    id: "d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8g9",
    name: "test1",
    code: "test1",
  },
];

const businessSlice = createSlice({
  name: "business",
  initialState: business, // just load array directly
  reducers: {
    addBusiness: (state, action: PayloadAction<Business>) => {
      state.push(action.payload);
    },
    updateBusiness: (state, action: PayloadAction<Business>) => {
      const index = state.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBusiness: (state, action: PayloadAction<string>) => {
      toast.success("Deleted successfully");
      return state.filter((u) => u.id !== action.payload);
    },
  },
});

export const selectBusinessNameById = (state: Business[], id: string) => {
  return state.find((b) => b.id === id)?.name ?? null;
};

export const { addBusiness, updateBusiness, deleteBusiness } =
  businessSlice.actions;
export default businessSlice.reducer;
