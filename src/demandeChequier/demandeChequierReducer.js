import {
  FETCH_LIST_DEMANDE_CHEQUIER_REQUEST,
  FETCH_LIST_DEMANDE_CHEQUIER_SUCCESS,
  FETCH_LIST_DEMANDE_CHEQUIER_FAILURE,
  FETCH_DEMANDE_CHEQUIER_REQUEST,
  SAVE_DEMANDE_CHEQUIER_REQUEST,
  UPDATE_DEMANDE_CHEQUIER_REQUEST,
  SIGN_DEMANDE_CHEQUIER_REQUEST,
  DEMANDE_CHEQUIER_SUCCESS,
  DEMANDE_CHEQUIER_FAILURE,
} from "./demandeChequierTypes";

const initialState = {
  demandeChequier: {},
  demandeChequiers: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_DEMANDE_CHEQUIER_REQUEST ||
      FETCH_DEMANDE_CHEQUIER_REQUEST ||
      SAVE_DEMANDE_CHEQUIER_REQUEST ||
      UPDATE_DEMANDE_CHEQUIER_REQUEST ||
      SIGN_DEMANDE_CHEQUIER_REQUEST:
      return {
        ...state,
      };
    case FETCH_LIST_DEMANDE_CHEQUIER_SUCCESS:
      return {
        demandeChequiers: action.payload,
        error: "",
      };
    case FETCH_LIST_DEMANDE_CHEQUIER_FAILURE:
      return {
        demandeChequiers: [],
        error: action.payload,
      };

    case DEMANDE_CHEQUIER_SUCCESS:
      return {
        demandeChequier: action.payload,
        error: "",
      };

    case DEMANDE_CHEQUIER_FAILURE:
      return {
        demandeChequier: {},
        error: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
