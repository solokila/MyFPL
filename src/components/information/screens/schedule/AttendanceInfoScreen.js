import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const AttendanceInfoScreen = (props) => {
  const { route, navigation } = props;
  const { attendanceData } = route.params;

  const goBack = () => {
    navigation.goBack();
  };
  const customTheme = {
    // Customize the calendar theme here
    textDayFontFamily: 'Roboto-Regular',
    textMonthFontFamily: 'Roboto-Bold',
    textDayHeaderFontFamily: 'Roboto-Medium',
    todayTextColor: '#FF5252',
    arrowColor: '#FED36A',
    selectedDayBackgroundColor: '#FED36A',
    selectedDayTextColor: '#FFFFFF',
    textDisabledColor: '#B0B0B0',
  };
  const attendanceData1 = [
    { date: '2023-07-10', status: 'absent' },
    { date: '2023-07-12', status: 'off' },
    { date: '2023-07-15', status: 'off' },
    { date: '2023-07-18', status: 'absent' },
    // Add more attendance data with 'date' and 'status' properties
  ];

  const markedDatesData = {};
  attendanceData1.forEach((attendance) => {
    const { date, status } = attendance;
    markedDatesData[date] = { marked: true, dotColor: status === 'off' ? '#FF5252' : '#0bd40e' };
  });


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={goBack}>
        <Text style={styles.menuIcon}>{'◀'}</Text>
        <Text style={styles.menuText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.itemContainer}>
        <View style={styles.itemRow}>
          <View style={styles.itemColumn}>
            <Text style={styles.classNameText}>{attendanceData.NameClass}</Text>
            {attendanceData.Description ? (
              <Text style={styles.itemDescription}>{attendanceData.Description}</Text>
            ) : null}
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.missCount}>{attendanceData.MissUntilNow}</Text>
            <Text style={styles.itemSmallText}>Missed</Text>
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.allCount}>{attendanceData.AllCountMiss}</Text>
            <Text style={styles.itemSmallText}>Total</Text>
          </View>
        </View>
      </View>

      {/* Add the calendar */}
      <Calendar
        // onDayPress={(day) => {
        //   console.log('Selected day:', day);
        //   // You can handle the selected day here as needed
        // }}
       
      
        // Add other props here for further customization
        // For example, minDate, maxDate, markingType, etc.
        markedDates={markedDatesData}
        theme={customTheme}
        style={styles.calendarContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles remain the same) ...
  calendarContainer: {
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',
  },
  menuButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#455A64',
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuIcon: {
    color: '#FED36A',
    fontSize: 18,
    marginRight: 5,
  },
  itemContainer: {
    backgroundColor: '#455A64',
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  classNameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  itemSmallText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  missCount: {
    color: '#FF5252',
    fontSize: 18,
    fontWeight: 'bold',
  },
  allCount: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Adjust the calendar's position and style as needed

});

export default AttendanceInfoScreen;
