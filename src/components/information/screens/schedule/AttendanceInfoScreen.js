import { StyleSheet, View, Text } from 'react-native';
//them usestate
import React, {useState} from 'react';


const AttendanceInfoScreen = (props) => {
  const {navigation, route} = props;

  const { attendanceData } = route.params;

  // const [attendanceData, setAttendanceData] = useState([
  //   // Replace this with your actual attendance data
  //   {
  //     id: '1',
  //     NameClass: 'Math Class',
  //     MissUntilNow: '5',
  //     AllCountMiss: '10',
  //   },
  //   {
  //     id: '2',
  //     NameClass: 'Math Class',
  //     MissUntilNow: '5',
  //     AllCountMiss: '10',
  //   },
  //   {
  //     id: '3',
  //     NameClass: 'Math Class',
  //     MissUntilNow: '5',
  //     AllCountMiss: '10',
  //   },
  //   // More attendance items here
  // ]);

  return (
    <View style={styles.container}>
      <Text>NameClass: {attendanceData.NameClass}</Text>
      <Text>MissUntilNow: {attendanceData.MissUntilNow}</Text>
      <Text>AllCountMiss: {attendanceData.AllCountMiss}</Text>
      {/* Add more attendance information here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AttendanceInfoScreen;
