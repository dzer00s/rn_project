import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HistoryEl from '../../HistoryCard/HistoryEl';
import HistoryScreenDetailData from './HistoryScreenDetailData';
import HistoryScreenDetailInfo from './HistoryScreenDetailInfo';
import HistoryScreenDetailItems from './HistoryScreenDetailItems';
import HistoryScreenDetailTotal from './HistoryScreenDetailTotal';
import styles from './styles';

const HistoryScreenDetail = (props) => {
  return (
    <View style={styles.modal}>
      {/* Card with Info */}
      <View style={styles.modalScreenDetail}>
        <HistoryEl item={props.item} />
      </View>
      {/* Scroll Info */}
      <View style={styles.modalScroll}>
        <ScrollView>
          {/* 1 Row */}
          <HistoryScreenDetailInfo item={props.item} />
          <View style={styles.separatorHr} />
          {/* 2 Row */}
          <HistoryScreenDetailItems item={props.item} />
          <View style={styles.separatorHr} />
          {/* 3 Row */}
          <HistoryScreenDetailTotal item={props.item} />
          <View style={styles.separatorHr} />
          {/* 4 Row */}
          <HistoryScreenDetailData item={props.item} />
          <View style={styles.separatorHr} />
        </ScrollView>
      </View>
    </View>
  );
};
export default HistoryScreenDetail;
