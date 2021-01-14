import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {TimeUtc} from '../../../constants/time';
import {addCheckThunk} from '../../../actions/ScanActions';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const InputCheckValidationSchema = yup.object().shape({
  t: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Выберите время'),
  s: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),
  fn: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),
  i: yup
    .string()
    .min(1, ({min}) => `Поле должно содержать ${min} символов`)
    .required('Заполните поле'),

  fp: yup
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
        initialValues={{t: '', s: '', fn: '', i: '', fp: ''}}
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
            setFieldValue('t', dayjs(value).format(TimeUtc));
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
                />
              </View>
              <View style={styles.textInputContainer}>
                <View style={styles.textInput}>
                  <TextInput
                    name="timestamp"
                    placeholder="Выберите время"
                    style={styles.textInputTimeInfo}
                    onChangeText={handleChange('t')}
                    onBlur={handleBlur('t')}
                    value={values.t}
                  />
                  <Button
                    style={styles.textInputTimeButton}
                    title="Нажми"
                    onPress={showDatePicker}
                  />
                </View>
                {errors.t && touched.t && (
                  <Text style={styles.errorTouched}>{errors.t}</Text>
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
                  name="fd"
                  placeholder="Введите Фискальные данные"
                  style={styles.textInput}
                  onChangeText={handleChange('i')}
                  onBlur={handleBlur('i')}
                  value={values.i}
                  keyboardType="number-pad"
                />
                {errors.i && touched.i && (
                  <Text style={styles.errorTouched}>{errors.i}</Text>
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
                  onChangeText={handleChange('s')}
                  onBlur={handleBlur('s')}
                  value={values.s}
                  keyboardType="number-pad"
                />
                {errors.s && touched.s && (
                  <Text style={styles.errorTouched}>{errors.s}</Text>
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
  isFetching: state.ScanScreen.isFetching,
});

export default connect(mapStateToProps, {addCheckThunk})(InputCheck);
