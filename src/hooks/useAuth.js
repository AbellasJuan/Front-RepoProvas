import { useContext } from "react";
import AuthContext from "../contexts/authContext.js";

export default function useAuth() {
  return useContext(AuthContext);
}