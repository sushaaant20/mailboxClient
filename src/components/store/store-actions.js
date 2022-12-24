import { manageEmailActions } from "../store/manage-email-reducer";
import axios from "axios";
export const ActionCreater = (userEmail) => {
  console.log("ACTION");
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        let res = await axios.get(
          `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/receive${userEmail}.json`
        );
        console.log(res, "==>ACTIONS");
        dispatch(manageEmailActions.setReceiveMail(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
};

export const ActionForSentMail = (userEmail) => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        let res = await axios.get(
          `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/sent${userEmail}.json`
        );
        dispatch(manageEmailActions.setSentServerMail(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  };
};
