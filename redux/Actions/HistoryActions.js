import { GET_HISTORY, RECEIVE_DATA } from "./../types"
import { UPD_DATA } from "./../types"
import { TOGGLE_IS_MODAL } from "./../types"

export const getHistory = (values) => (
    {
        type: GET_HISTORY,
        values
    }
);

export const updData = (ids) => (
    {
        type: UPD_DATA,
        ids
    }
);

export const toggleIsModal = (isModalOpen) => (
    {
        type: TOGGLE_IS_MODAL,
        isModalOpen
    }
);

export const receiveData = () => (
    {
        type: RECEIVE_DATA,
        
    }
);