import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, View, RefreshControl, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {Receipt} from '../../constants/database';
import {
  toggleIsModal,
  receiveData,
} from './../../actions/HistoryActions';
import {
  deleteCheckThunk, updCheckLocalyThunk, getUpdDataCheckThunk,
} from './../../actions/ScanActions';
import HistoryEl from './HistoryCard/HistoryEl';
import HistoryModal from './HistoryModalScreen/HistoryModal';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { wait } from '../../constants/app_env';

const HistoryCheck = (props) => {
  useEffect(() => {
    props.receiveData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  const onUpdateInfo = () => {
    let status_none = Receipt.filtered('status_app contains "inProcess"');
    let status_before = '';
    for (let status of status_none) {
      status_before = status_before.concat(status.id, ',');
    }
    let status_after = status_before.slice(0, -1);
    console.log(status_after);
    if (status_after.length) {
      props.getUpdDataCheckThunk(status_after);
    } else { null }
  };

  const onUpdateInfoLocaly = () => {
    let status_none = Receipt.filtered('status_app contains "localy"');
    for (let status of status_none) {
      props.updCheckLocalyThunk(status);
    }
  }

  const [pickItem, setPickItem] = useState([{}]);
  const _onPress = (isModalOpen, item) => (
    setPickItem(item), props.toggleIsModal(isModalOpen)
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onUpdateInfoLocaly();
    onUpdateInfo();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const RightItem = () => {
    return (
      <View style={styles.containerElSwipe}>
        <Text style={styles.deleteEl}>Удалить</Text>
      </View>
    );
  };

  const DeleteDB = (item) => {
    props.deleteCheckThunk(item);
    onRefresh();
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerHeaderBackground}>
        <View style={styles.containerHeader}>
          <Text style={styles.containerHeaderText}>Мои чеки</Text>
        </View>
      </View>

      <FlatList
        // inverted
        // removeClippedSubviews={false}
        data={props.ScansList}
        extraData={props.ScansList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item.hash}
        refreshing={true}
        renderItem={({item}) => (
          <Swipeable
            onSwipeableRightOpen={() => DeleteDB(item)}
            renderRightActions={(progress, dragx) => <RightItem/>}>
            <Pressable onPress={() => _onPress(props.isModalOpen, item)}>
              <View style={styles.containerEl}>
                <HistoryEl item={item} />
              </View>
            </Pressable>
          </Swipeable>
        )}
      />

      {/* Modal */}
      <HistoryModal
        isModalOpen={props.isModalOpen}
        _onPress={_onPress}
        item={pickItem}
      />
    </View>
  );
};

let mapStateToProps = (state) => ({
  isModalOpen: state.HistoryScreen.isModalOpen,
  ScansList: state.ScanScreen.ScansList,
  currentCheck: state.ScanScreen.currentCheck,
});

export default connect(mapStateToProps, {
  toggleIsModal,
  receiveData,
  deleteCheckThunk,
  updCheckLocalyThunk,
  getUpdDataCheckThunk,
})(HistoryCheck);
