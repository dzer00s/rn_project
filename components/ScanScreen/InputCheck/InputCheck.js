import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {TimeUtc} from '../../../constants/time';
import {addCheckThunk} from '../../../redux/Actions/InputActions';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const InputCheckValidationSchema = yup.object().shape({
  timestamp: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Выберите время'),
  fd: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),
  fn: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),
  fp: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),
  sum: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),
});

const InputCheck = (props) => {
  const onSubmitInput = (inputqrvalue) => {
    props.addCheckThunk(inputqrvalue);
  };

  return (
    <ScrollView style={styles.loginContainer}>
      <Formik
        validationSchema={InputCheckValidationSchema}
        initialValues={{fd: '', fn: '', fp: '', timestamp: '', sum: ''}}
        onSubmit={(values, {resetForm}) => {
          onSubmitInput(values);
          resetForm({values: ''});
        }}>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => {
          const [isDatePickerVisible, setDatePickerVisibility] = useState(
            false,
          );

          const showDatePicker = () => {
            setDatePickerVisibility(true);
          };

          const hideDatePicker = () => {
            setDatePickerVisibility(false);
          };

          const handleConfirm = (value) => {
            setFieldValue('timestamp', dayjs(value).format(TimeUtc));
            hideDatePicker();
          };

          return (
            <>
              <View>
                {props.isFetching ? (
                  <View style={{paddingTop: 10}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                  </View>
                ) : null}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  display="spinner"
                  // timeZoneOffsetInMinutes={0}
                  // locale="ru"
                  is24Hour={true}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  // value={values.timestamp}
                />
              </View>
              <View style={styles.textInputContainer}>
                <View style={styles.textInput}>
                  <TextInput
                    name="dateTime"
                    placeholder="Выберите время"
                    style={styles.textInputTimeInfo}
                    onChangeText={handleChange('timestamp')}
                    onBlur={handleBlur('timestamp')}
                    value={values.timestamp}
                  />
                  <Button
                    style={styles.textInputTimeButton}
                    title="Нажми"
                    onPress={showDatePicker}
                  />
                </View>
                {errors.timestamp && touched.timestamp && (
                  <Text style={styles.errorTouched}>{errors.timestamp}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  name="fd"
                  placeholder="Введите Фискальные данные"
                  style={styles.textInput}
                  onChangeText={handleChange('fd')}
                  onBlur={handleBlur('fd')}
                  value={values.fd}
                  keyboardType="number-pad"
                />
                {errors.fd && touched.fd && (
                  <Text style={styles.errorTouched}>{errors.fd}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  name="fn"
                  placeholder="Введите Фискальный накопитель"
                  style={styles.textInput}
                  onChangeText={handleChange('fn')}
                  onBlur={handleBlur('fn')}
                  value={values.fn}
                  keyboardType="number-pad"
                />
                {errors.fn && touched.fn && (
                  <Text style={styles.errorTouched}>{errors.fn}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  name="fp"
                  placeholder="Введите Фискальный признак"
                  style={styles.textInput}
                  onChangeText={handleChange('fp')}
                  onBlur={handleBlur('fp')}
                  value={values.fp}
                  keyboardType="number-pad"
                />
                {errors.fp && touched.fp && (
                  <Text style={styles.errorTouched}>{errors.fp}</Text>
                )}
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  name="sum"
                  placeholder="Введите Сумму"
                  style={styles.textInput}
                  onChangeText={handleChange('sum')}
                  onBlur={handleBlur('sum')}
                  value={values.sum}
                  keyboardType="number-pad"
                />
                {errors.sum && touched.sum && (
                  <Text style={styles.errorTouched}>{errors.sum}</Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.buttonSubmit}
                  onPress={handleSubmit}
                  title="Отправить"
                  disabled={!isValid}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

let mapStateToProps = (state) => ({
  isFetching: state.InputScreen.isFetching,
});

export default connect(mapStateToProps, {addCheckThunk})(InputCheck);
