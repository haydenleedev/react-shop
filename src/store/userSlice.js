import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "John " + state.name;
    },
    changeAge(state) {
      state.age = state.age + 1;
    },
  },
});

export let { changeName, changeAge } = user.actions;

export default user;
