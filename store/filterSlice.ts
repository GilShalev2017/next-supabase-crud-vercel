import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: "all" | "active" | "completed";
  search: string;
}

const initialState: FilterState = { filter: "all", search: "" };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">,
    ) => {
      state.filter = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setFilter, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
