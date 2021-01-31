// import {
//   FETCH_LIST_DEMANDE_CHEQUIER_REQUEST,
//   FETCH_LIST_DEMANDE_CHEQUIER_SUCCESS,
//   FETCH_LIST_DEMANDE_CHEQUIER_FAILURE,
//   FETCH_DEMANDE_CHEQUIER_REQUEST,
//   SAVE_DEMANDE_CHEQUIER_REQUEST,
//   UPDATE_DEMANDE_CHEQUIER_REQUEST,
//   SIGN_DEMANDE_CHEQUIER_REQUEST,
//   DEMANDE_CHEQUIER_SUCCESS,
//   DEMANDE_CHEQUIER_FAILURE,
// } from "./demandeChequierTypes";

// import axios from "axios";

// export const fetchListDemandeChequiers = () => {
//   return (dispatch) => {
//     dispatch(fetchListDemandeChequierRequest());
//     axios
//       .get("http://localhost:8081/demandeChequier/abonne/1/demandeChequiers")
//       .then((response) => {
//         dispatch(fetchListDemandeChequierSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(fetchListDemandeChequierFailure(error.message));
//       });
//   };
// };

// export const fetchDemandeChequier = (id) => {
//   return (dispatch) => {
//     dispatch(fetchDemandeChequierRequest());
//     axios
//       .get("http://localhost:8081/demandeChequier/demandeChequier?id=" + id)
//       .then((response) => {
//         dispatch(demandeChequierSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(demandeChequierFailure(error.message));
//       });
//   };
// };

// export const saveDemandeChequier = (demandeChequier) => {
//   return (dispatch) => {
//     dispatch(saveDemandeChequierRequest());
//     axios
//       .post(
//         "http://localhost:8081/demandeChequier/demandeChequier",
//         demandeChequier
//       )
//       .then((response) => {
//         dispatch(demandeChequierSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(demandeChequierFailure(error.message));
//       });
//   };
// };

// export const updateDemandeChequier = (id, demandeChequier) => {
//   return (dispatch) => {
//     dispatch(updateDemandeChequierRequest());
//     axios
//       .put(
//         "http://localhost:8081/demandeChequier/demandeChequier/" + id,
//         demandeChequier
//       )
//       .then((response) => {
//         dispatch(demandeChequierSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(demandeChequierFailure(error.message));
//       });
//   };
// };

// export const signDemandeChequier = (id, password) => {
//   return (dispatch) => {
//     dispatch(signDemandeChequierRequest());
//     axios
//       .put(
//         "http://localhost:8081/demandeChequier/demandeChequier/signer/" + id,
//         password
//       )
//       .then((response) => {
//         dispatch(demandeChequierSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(demandeChequierFailure(error.message));
//       });
//   };
// };

// const fetchListDemandeChequierRequest = () => {
//   return {
//     type: FETCH_LIST_DEMANDE_CHEQUIER_REQUEST,
//   };
// };

// const fetchListDemandeChequierSuccess = (listDemandeChequiers) => {
//   return {
//     type: FETCH_LIST_DEMANDE_CHEQUIER_SUCCESS,
//     payload: listDemandeChequiers,
//   };
// };

// const fetchListDemandeChequierFailure = (error) => {
//   return {
//     type: FETCH_LIST_DEMANDE_CHEQUIER_FAILURE,
//     payload: error,
//   };
// };

// const fetchDemandeChequierRequest = () => {
//   return {
//     type: FETCH_DEMANDE_CHEQUIER_REQUEST,
//   };
// };

// const saveDemandeChequierRequest = () => {
//   return {
//     type: SAVE_DEMANDE_CHEQUIER_REQUEST,
//   };
// };

// const updateDemandeChequierRequest = () => {
//   return {
//     type: UPDATE_DEMANDE_CHEQUIER_REQUEST,
//   };
// };

// const signDemandeChequierRequest = () => {
//   return {
//     type: SIGN_DEMANDE_CHEQUIER_REQUEST,
//   };
// };

// const demandeChequierSuccess = (demandeChequier) => {
//   return {
//     type: DEMANDE_CHEQUIER_SUCCESS,
//     payload: demandeChequier,
//   };
// };

// const demandeChequierFailure = (error) => {
//   return {
//     type: DEMANDE_CHEQUIER_FAILURE,
//     payload: error,
//   };
// };
