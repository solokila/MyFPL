import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const StudyStack = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('navigation');
        }}></TouchableOpacity>
      <Text style={styles.text}>THÔNG BÁO NHẬN BẰNG TỐT NGHIỆP</Text>
    </View>
  );
};

export default StudyStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
    padding: 10,
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
