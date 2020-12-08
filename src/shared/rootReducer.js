import { combineReducers } from "redux";
import demandeChequierReducer from "../demandeChequier/demandeChequierReducer";

const rootReducer = combineReducers({
  demandeChequier: demandeChequierReducer,
});

export default rootReducer;
