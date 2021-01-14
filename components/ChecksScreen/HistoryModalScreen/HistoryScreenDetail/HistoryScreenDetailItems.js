import React from 'react';
import {View} from 'react-native';
import HistoryScreenDetailItem from './HistoryScreenDetailItem';

const HistoryScreenDetailItems = (props) => {
    return (
      <View>
        {props.item.items.map(item => (
          <HistoryScreenDetailItem item={item} />
        ))}
      </View>
    );
};

export default HistoryScreenDetailItems;
