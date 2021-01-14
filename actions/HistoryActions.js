import { RECEIVE_DATA } from "./types"
import { TOGGLE_IS_MODAL } from "./types"

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