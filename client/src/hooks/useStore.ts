import { useContext } from "react";
import { Context } from "../../src/main";

export default function useStore(){ return useContext(Context).store }