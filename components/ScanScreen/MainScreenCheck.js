import React from 'react';
import {connect} from 'react-redux';
import HistoryModal from '../ChecksScreen/HistoryModalScreen/HistoryModal';
import ScanScreen from './ScanScreen/ScanScreen';
import {toggleIsCheckAdded, toggleIsScanner} from './../../redux/Actions/InputActions'

const MainScreenCheck = (props) => {
  const _onPress = (isModalOpen, openScanner) => (
    props.toggleIsCheckAdded(isModalOpen),
    props.toggleIsScanner(openScanner),
    console.log(openScanner)
  );
  return (
    <>
      <ScanScreen />
      <HistoryModal
        isModalOpen={props.CheckIsAdded}
        _onPress={_onPress}
        item={props.currentCheck}
      />
    </>
  );
};

let mapStateToProps = (state) => ({
  CheckIsAdded: state.InputScreen.CheckIsAdded,
  currentCheck: state.InputScreen.currentCheck,
});

export default connect(mapStateToProps, {toggleIsCheckAdded, toggleIsScanner})(MainScreenCheck);
