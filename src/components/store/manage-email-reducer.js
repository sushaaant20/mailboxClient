import { createSlice } from "@reduxjs/toolkit";

const initalEmailState = { sent: [], receive: [] };

const manageEmailSlice = createSlice({
  name: "email-manager",
  initialState: initalEmailState,
  reducers: {
    setSendMail(state, action) {
      state.sent.push(action.payload);
      console.log(action.payload, "==>inside redux");
    },
    setReceiveMail(state, action) {
      state.receive = state.receive.push("hloooo");
      let arr = [];
      let obj = action.payload;
      for (let id in obj) {
        arr.push({
          id: id,
          message: obj[id].message,
          subject: obj[id].subject,
          seen: obj[id].seen,
        });
      }
      console.log(arr, "==>INSIDE  MANAGER");
      state.receive = arr;
    },
    seenMessage(state, action) {
      let message = state.receive.find((data) => data.id === action.payload);
      message.seen = true;
    },
  },
});

console.log(initalEmailState.receive, "==>inside redux");

export const manageEmailActions = manageEmailSlice.actions;
export default manageEmailSlice.reducer;
