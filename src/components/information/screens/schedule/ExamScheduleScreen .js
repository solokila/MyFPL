import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import MonthMenu from './MonthMenu';
// Import your API function to fetch schedule data from the database
// import { fetchScheduleData } from './api';
// sevice
import { getExamScheduleById, getAllSubjects } from '../../DataService';
import { UserContext } from '../../../users/UserContext';

// Fake data for testing
const FAKE_DATA = [
  {
    id: 1,
    roomNumber: 'Room 101',
    date: '2023-07-27',
    description: 'Description for item 1',
    teacher: 'Teacher A',
    class: 'Class X',
    exemption: 'Exempted',
    status: 'Active',
    shift: 'Morning',
    numberOfSession: 2,
  },
  {
    id: 2,
    roomNumber: 'Room 101',
    date: '2023-07-27',
    description: 'Description for item 1',
    teacher: 'Teacher A',
    class: 'Class X',
    exemption: 'Exempted',
    status: 'Active',
    shift: 'Morning',
    numberOfSession: 2,
  },
  {
    id: 3,
    roomNumber: 'Room 101',
    date: '2023-07-27',
    description: 'Description for item 1',
    teacher: 'Teacher A',
    class: 'Class X',
    exemption: 'Exempted',
    status: 'Active',
    shift: 'Morning',
    numberOfSession: 2,
  },
  {
    id: 4,
    roomNumber: 'Room 101',
    date: '2023-07-27',
    description: 'Description for item 1',
    teacher: 'Teacher A',
    class: 'Class X',
    exemption: 'Exempted',
    status: 'Active',
    shift: 'Morning',
    numberOfSession: 2,
  },
  // Add more items here...
];

const ExamScheduleScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState("tháng 7");
  const [selectedDay, setSelectedDay] = useState(18);
  const [scheduleData, setScheduleData] = useState(FAKE_DATA);
  const [showModal, setShowModal] = useState(false);
  const [selectedScheduleItem, setSelectedScheduleItem] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // lữu giữ ngày tháng được chọn
  const [dateChosen, setDateChosen] = useState('');


  //lấy danh sách môn học
  const [subjects, setSubjects] = useState([]);
  const getSubjects = async () => {
    const response = await getAllSubjects();
    if (response?.status === 200) {
      setSubjects(response?.data);
    }
  };

  // tìm tên môn học theo id
  const findSubject = (id) => {
    const subject = subjects.find((item) => {
      return item._id === id;
    });
    // console.log('subject:', subject);
    return subject;
  };

  const getData = async () => {
    const response = await getExamScheduleById(user._id);
    // console.log('response:', response);
    if (response?.status === 200) {
      setData(response?.data);
      setLoading(false);
    }
  };

  // get data when first render
  useEffect(() => {
    getData();
    getSubjects();
  }, []);


  // get data by month and day
  const fetchScheduleData = async (month, day) => {
    // console.log('data:', data);
    const monthNumber = month.split(' ')[1]; // Get the month number from the month name
    setDateChosen(`${day}/${monthNumber}/2023`);
    try {
      const newData = data.filter((item) => {
        const dateObject = new Date(item.date);
        return dateObject.getMonth() + 1 === monthNumber * 1 && dateObject.getDate() === day * 1;
      });
      return newData;
    } catch (error) {
      console.log('error:', error);
    }
  };




  // Fetch schedule data for the selected day whenever the month or day changes
  useEffect(() => {
    fetchScheduleData(selectedMonth, selectedDay)
      .then((data) => {
        setScheduleData(data);
        // console.log('data:', data);
      })
      .catch((error) => {
        console.error('Error fetching schedule data:', error);
        setScheduleData([]); // Set empty array in case of an error
      });
  }, [selectedMonth, selectedDay, loading]);

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

  // chuyển đổi giờ học từ ca học
  const convertShiftToTime = (shift) => {
    if (shift === 1) return '7:30 - 9:30';
    if (shift === 2) return '9:45 - 11:45';
    if (shift === 3) return '13:00 - 15:00';
    if (shift === 4) return '15:15 - 17:15';
    if (shift === 5) return '17:30 - 19:30';
    if (shift === 6) return '19:30 - 21:30';
  };
  // Render schedule details when a schedule item is clicked
  const renderScheduleDetails = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleScheduleItemClick(item)}>
        <View style={styles.scheduleItemContainer}>
          <View style={styles.leftInfo}>
            <Text style={styles.roomNumberText}>Phòng: {item.room}</Text>
            <Text style={styles.dateText}>Ca: {item.shift}</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.additionalInfo}>Ngày thi: {dateChosen}</Text>
            <Text style={styles.additionalInfo}>Môn: {findSubject(item.subject_id)?.name}</Text>
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
          <Text style={styles.popupTitle}>Chi Tiết Lịch Thi</Text>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Số phòng:</Text>
            <Text style={styles.popupValue}>{selectedScheduleItem.room}</Text>
          </View>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Ca:</Text>
            <Text style={styles.popupValue}>
              {selectedScheduleItem.shift + " (" + convertShiftToTime(selectedScheduleItem.shift) + ")"}
            </Text>
          </View>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Ngày:</Text>
            <Text style={styles.popupValue}>{dateChosen}</Text>
          </View>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Môn thi:</Text>
            <Text style={styles.popupValue}>{findSubject(selectedScheduleItem.subject_id)?.name}</Text>
          </View>
          <View style={styles.popupItem}>
            <Text style={styles.popupLabel}>Mã môn:</Text>
            <Text style={styles.popupValue}>{findSubject(selectedScheduleItem.subject_id)?.idSubject}</Text>
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
          <TouchableOpacity
            style={styles.dayItemContainer}
            key={item.toString()}
            onPress={() => handleDayPress(item)}>
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
        onRefresh={getData}
        refreshing={loading}
        keyExtractor={item => item._id}
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
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',
  },
  dayItemContainer: {
    width: 70,
    height: 80,
    marginVertical: 10,
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
    //chieu ngang
    width: '45%',
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
    paddingLeft: 20
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
