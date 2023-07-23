import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';

const ScheduleScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1 next day'); // Default selection
  const [scheduleData, setScheduleData] = useState([
    // Replace this with your actual schedule data
    {
      id: '1',
      RoomNumber: '101',
      date: '2023-07-22',
      Description: 'Some description',
      Teacher: 'John Doe',
      Class: 'Math',
      exemption: 'No',
      Status: 'Active',
      Shift: 'Morning',
      NumberOfSession: '3',
    }, {
      id: '2',
      RoomNumber: '101',
      date: '2023-07-22',
      Description: 'Some description',
      Teacher: 'John Doe',
      Class: 'Math',
      exemption: 'No',
      Status: 'Active',
      Shift: 'Morning',
      NumberOfSession: '3',
    },
    {
      id: '3',
      RoomNumber: '101',
      date: '2023-07-22',
      Description: 'Some description',
      Teacher: 'John Doe',
      Class: 'Math',
      exemption: 'No',
      Status: 'Active',
      Shift: 'Morning',
      NumberOfSession: '3',
    },
    {
      id: '4',
      RoomNumber: '101',
      date: '2023-07-22',
      Description: 'Some description',
      Teacher: 'John Doe',
      Class: 'Math',
      exemption: 'No',
      Status: 'Active',
      Shift: 'Morning',
      NumberOfSession: '3',
    },
    {
      id: '5',
      RoomNumber: '101',
      date: '2023-07-22',
      Description: 'Some description',
      Teacher: 'John Doe',
      Class: 'Math',
      exemption: 'No',
      Status: 'Active',
      Shift: 'Morning',
      NumberOfSession: '3',
    },
    // More schedule items here
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const menuOptions = ['1 next day', '7 next days', '30 next days', '2 months next days', '3 months next days'];

  //text cho menu
  const [text, setText] = useState('1 next day');

  const handleMenuItemPress = (option) => {
    setSelectedMenuItem(option);
    setShowMenu(false);
    // Fetch new data based on the selected option here if required
    // For simplicity, we're using dummy data.
    setText(option);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => setSelectedItem(item)}>
        <Text style={styles.itemText}>Phòng: {item.RoomNumber}</Text>
        <Text style={styles.itemText}>Ngày: {item.date} =&gt; Ca : {item.Shift}</Text>
        <Text style={styles.itemText}>Mô tả: {item.Description}</Text>
      </TouchableOpacity>
    );
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const renderMoreInfoPopup = () => {
    if (!selectedItem) return null;

    return (
      <Modal visible={true} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={closePopup}>
          <View style={styles.popupContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <Text style={styles.popupTitle}>Lịch học chi tiết</Text>


                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Số phòng:</Text>
                  <Text style={styles.popupValue}>{selectedItem.RoomNumber}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Ngày:</Text>
                  <Text style={styles.popupValue}>{selectedItem.date}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Mô tả:</Text>
                  <Text style={styles.popupValue}>{selectedItem.Description}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Giảng viên:</Text>
                  <Text style={styles.popupValue}>{selectedItem.Teacher}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Lớp:</Text>
                  <Text style={styles.popupValue}>{selectedItem.Class}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Miễn giảm:</Text>
                  <Text style={styles.popupValue}>{selectedItem.exemption}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Trạng thái:</Text>
                  <Text style={styles.popupValue}>{selectedItem.Status}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Ca:</Text>
                  <Text style={styles.popupValue}>{selectedItem.Shift}</Text>
                </View>
                <View style={styles.popupRow}>
                  <Text style={styles.popupLabel}>Số buổi học:</Text>
                  <Text style={styles.popupValue}>{selectedItem.NumberOfSession}</Text>
                </View>
                {/* Add more schedule details here */}
                <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(!showMenu)}>
        <Text style={styles.menuText}>{text}</Text>
      </TouchableOpacity>

      <Modal visible={showMenu} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.menuModal}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.menuOption}
                onPress={() => handleMenuItemPress(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={scheduleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />

      {renderMoreInfoPopup()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212832',
  },
  menuButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#455A64',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#FED36A',
    borderWidth: 2,
  },
  menuText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  menuOption: {
    paddingVertical: 5,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#455A64',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    marginBottom: 10,
  },
  itemText: {
    color: '#FFFFFF',
    // fontWeight: 'bold',
    fontSize: 14,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#FED36A',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: '70%',
    maxWidth: '80%',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000000',
  },
  popupRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  popupLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000000',
  },
  popupValue: {
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
  },
  closeButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  
  
});

export default ScheduleScreen;
