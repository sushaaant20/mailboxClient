import { createSlice } from "@reduxjs/toolkit";

const initalEmailState = { sent: [], receive: [] };

const manageEmailSlice = createSlice({
  name: "email-manager",
  initialState: initalEmailState,
  reducers: {
    setSendMail(state, action) {},
    setReceiveMail(state, action) {
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
    deleteMail(state, action) {
      let arr = state.receive.filter((arr) => arr.id !== action.payload);
      state.receive = arr;
    },
    setSentServerMail(state, action) {
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
      state.sent = arr;
    },
    seenSentMessageHandler(state, action) {
      let message = state.sent.find((data) => data.id === action.payload);
      message.seen = true;
    },
  },
});

export const manageEmailActions = manageEmailSlice.actions;
export default manageEmailSlice.reducer;
