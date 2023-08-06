import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const AttendanceInfoScreen = (props) => {
  const { route, navigation } = props;
  const { attendanceData, subjectName } = route.params;


  const goBack = () => {
    navigation.goBack();
  };
  const customTheme = {
    // Customize the calendar theme here
    todayTextColor: '#800000',
    calendarBackground: '#FFFFFF', //background color

    monthTextColor: '#FED36A', //month text color
    textMonthFontWeight: 'bold', //month text font weight
    textMonthFontSize: 18,

    arrowColor: '#00FF00', //arrow color

    dayTextColor: '#000000', //day text color
    textDayFontSize: 16, //day text font size
    textDisabledColor: '#BBBBBB', //disable text color
    textDayFontWeight: '300',

    textSectionTitleColor: '#FED36A', // title color
    textDayHeaderFontSize: 16, //week text font size

  
  };

  // format date to yyyy-mm-dd
  const dateAbsent = attendanceData.dateAbsent.map((date) => {
    return date.substring(0, 10);
  });

  const datePresent = attendanceData.datePresent.map((date) => {
    return date.substring(0, 10);
  });

  const markedDatesData = {};

  dateAbsent.forEach((date) => {
    markedDatesData[date] = { 
      // marked: true, dotColor: '#FF5252',
      customStyles: {
        container: {
          backgroundColor: 'red'
        },
        text: {
          color: 'black',
          fontWeight: 'bold'
        }
      }
      
      };
  });

  datePresent.forEach((date) => {
    markedDatesData[date] = { 
      customStyles: {
        container: {
          backgroundColor: '#00FF00'
        },
        text: {
          color: 'black',
          fontWeight: 'bold'
        }
      } 
    };
  });

  // console.log(markedDatesData);



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={goBack}>
        <Text style={styles.menuIcon}>{'◀'}</Text>
        <Text style={styles.menuText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.itemContainer}>
        <View style={styles.itemRow}>
          <View style={styles.itemColumnleft}>
            <Text
              numberOfLines={2}
              style={styles.classNameText}
            >{subjectName}</Text>
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.missCount}>{attendanceData.dateAbsent.length}</Text>
            <Text style={styles.itemSmallText}>Vắng mặt</Text>
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.allCount}>{attendanceData.dateAbsent.length + attendanceData.datePresent.length}</Text>
            <Text style={styles.itemSmallText}>Tổng số buổi</Text>
          </View>
        </View>
      </View>

      {/* Add the calendar */}
      <Calendar
        markingType={'custom'}
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
    backgroundColor: '#455A64',
    borderRadius: 10,
    borderColor: '#FED36A',
    borderWidth: 1,
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
  itemColumnleft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 2, // Each itemColumn takes equal space
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
    color: '#00FF66',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Adjust the calendar's position and style as needed

});

export default AttendanceInfoScreen;
