import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(localStorage.getItem("user-threads")) || {
    status: "guest",
  },
});

export default userAtom;
