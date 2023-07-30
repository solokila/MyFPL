import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import MonthMenu from './MonthMenu';
// Import your API function to fetch schedule data from the database
// import { fetchScheduleData } from './api';

// Fake data for testing
const FAKE_DATA = [
  {
    id: 1,
    roomNumber: 'Room 967',
    date: '2023-07-27',
    class: 'Class X',
    shift: '11:34 AM',
  },
  {
    id: 2,
    roomNumber: 'Room 48',
    date: '2023-07-27',
    class: 'Class X',
    shift: '11:34 PM',
  },
  {
    id: 3,
    roomNumber: 'Room 82',
    date: '2023-07-27',
    class: 'Class X',
    shift: '11:34 PM',
  },
  {
    id: 4,
    roomNumber: 'Room 121',
    date: '2023-07-27',
    class: 'Class X',
    shift: '11:34 AM',
  },
];

const ExamScheduleScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDay, setSelectedDay] = useState(1);
  const [scheduleData, setScheduleData] = useState(FAKE_DATA);
  const [showModal, setShowModal] = useState(false);
  const [selectedScheduleItem, setSelectedScheduleItem] = useState(null);

  // Fetch schedule data for the selected day whenever the month or day changes
  useEffect(() => {
    // Replace this with your API call to fetch data from the database
    // fetchScheduleData(selectedMonth, selectedDay)
    //   .then((data) => {
    //     setScheduleData(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching schedule data:', error);
    //     setScheduleData([]); // Set empty array in case of an error
    //   });
    // For testing, we are using the fake data defined above
  }, [selectedMonth, selectedDay]);

  // Generate data for the days in the selected month (e.g., 1 to 31)
  const daysInSelectedMonth = Array.from({ length: 31 }, (_, index) => index + 1);

  // Handler for month change from MonthMenu
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // Handler for day selection in the horizontal FlatList
  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  // Handler for clicking on a schedule item
  const handleScheduleItemClick = (scheduleItem) => {
    setSelectedScheduleItem(scheduleItem);
    setShowModal(true);
  };

  // Render schedule details when a schedule item is clicked
  const renderScheduleDetails = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleScheduleItemClick(item)}>
        <View style={styles.scheduleItemContainer}>
          <View style={styles.leftInfo}>
            <Text style={styles.roomNumberText}>{item.roomNumber}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.scheduleDescription}>{item.description}</Text>
            
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  // Render detailed schedule information in modal
  const renderPopupContent = () => {
    if (!selectedScheduleItem) return null;

    return (
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Lịch Thi Chi Tiết</Text>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Số phòng:</Text>
            <Text style={styles.popupValue}>{selectedScheduleItem.roomNumber}</Text>
          </View>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Ngày:</Text>
            <Text style={styles.popupValue}>{selectedScheduleItem.date}</Text>
          </View>
        
         
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Lớp:</Text>
            <Text style={styles.popupValue}>{selectedScheduleItem.class}</Text>
          </View>
          {/* Add more schedule details here */}
          <Pressable style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Dropdown menu to select the month */}
      <MonthMenu menuOptions={menuOptions} selectedOption={selectedMonth} onOptionPress={handleMonthChange} />

      {/* Horizontal FlatList to display the days */}
      <FlatList
        data={daysInSelectedMonth}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDayPress(item)}>
            <View style={[styles.dayItem, item === selectedDay && styles.selectedDayItem]}>
              <Text style={[styles.dayText, item === selectedDay && styles.selectedDayText]}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayListContainer}
      />

      {/* Vertical FlatList to display the schedule for the selected day */}
      <FlatList
        data={scheduleData}
        renderItem={renderScheduleDetails}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scheduleListContainer}
      />

      {/* Modal for displaying detailed schedule information */}
      <Modal visible={showModal} animationType="slide" transparent>
        {renderPopupContent()}
      </Modal>
    </View>
  );
};

const menuOptions = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',
  },
  dayItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#455A64',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedDayItem: {
    backgroundColor: '#FED36A',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: '#000000',
  },
  dayListContainer: {
    marginBottom: 10,
  },
  scheduleItemContainer: {
    backgroundColor: '#455A64',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
 
  scheduleListContainer: {
    flexGrow: 1, // Make the FlatList take the available space to align it closely with the days view
  },
  scheduleItemContainer: {
    flexDirection: 'row', // To have roomNumber and date on the left side, and description on the right side
    justifyContent: 'space-between', // To push description to the right
    alignItems: 'center', // To align items vertically within each row
    backgroundColor: '#455A64',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Add elevation to create a shadow effect
  },
  leftInfo: {
    alignItems: 'flex-start', // Align items to the left side
  },
  roomNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FED36A', // Customize the color to stand out
  },
  dateText: {
    fontSize: 16,
    color: '#ffffff', // Customize the color to stand out
  },
  rightInfo: {
    flex: 1, // To allow description to take the remaining space on the right side
    paddingLeft: 20,
  },
  scheduleDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ffffff', // Customize the color to stand out
  },
  additionalInfo: {
    fontSize: 14,
    color: '#a9a9a9', // Customize the color for additional information
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popupContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  popupItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  popupLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  popupValue: {
    flex: 2,
  },
  closeButton: {
    backgroundColor: '#FED36A',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExamScheduleScreen;
