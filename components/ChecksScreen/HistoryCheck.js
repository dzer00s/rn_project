import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, View, RefreshControl, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';
import Realm from 'realm';
import {realm, Receipt} from '../../constants/database';
import {
  updData,
  toggleIsModal,
  receiveData,
} from './../../redux/Actions/HistoryActions';
import {
  deleteInDB,
} from './../../redux/Actions/InputActions';
import HistoryEl from './HistoryCard/HistoryEl';
import HistoryModal from './HistoryModalScreen/HistoryModal';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const HistoryCheck = (props) => {
  useEffect(() => {
    props.receiveData();
  }, []);

  // let [HistoryList, updFlatListItems] = useState();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     props.receiveData();
  //     console.log('updData');
  //     updFlatListItems(props.ScansList);
  //     // return () => updFlatListItems(props.ScansList);
  //   },
  //   )
  // )

  const onSubmitButton = () => {
    let status_none = Receipt.filtered('status_app contains "inProcess"');
    let status_before = '';
    for (let status of status_none) {
      status_before = status_before.concat(status.id, ',');
    }
    let status_after = status_before.slice(0, -1);
    console.log(status_after);
    props.updData(status_after);
  };

  const [pickItem, setPickItem] = useState([{}]);
  const _onPress = (isModalOpen, item) => (
    setPickItem(item), props.toggleIsModal(isModalOpen)
  );

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onSubmitButton();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const RightItem = () => {
    return (
      <View style={styles.containerElSwipe}>
        <Text style={{fontSize: 20}}>Удалить</Text>
      </View>
    );
  };

  const DeleteDB = (item) => {
    props.deleteInDB(item);
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
        extraData={props}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
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
  // scans: state.ScanScreen.scans,
  isModalOpen: state.HistoryScreen.isModalOpen,
  ScansList: state.InputScreen.ScansList,
});

export default connect(mapStateToProps, {
  updData,
  toggleIsModal,
  receiveData,
  deleteInDB,
})(HistoryCheck);
