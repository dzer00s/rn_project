import { TOGGLE_IS_MODAL } from '../actions/types';

let initialState = {
  isModalOpen: false,
};

let data = {};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_MODAL:
      return {
        ...state,
        isModalOpen: !action.isModalOpen,
      };

    default:
      return state;
  }
};

export default HistoryReducer;
