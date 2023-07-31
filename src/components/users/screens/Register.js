import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
} from 'react-native';

const data = [
    { id: '1', name: 'Mục 1111111111' },
    { id: '2', name: 'Mục 2' },
    { id: '3', name: 'Mục 3' },
    { id: '4', name: 'Mục 4' },
    { id: '5', name: 'Mục 5' },
    { id: '6', name: 'Mục 6' },
    { id: '7', name: 'Mục 7' },
    { id: '8', name: 'Mục 8' },
    { id: '9', name: 'Mục 9' },
    // Thêm các mục khác nếu cần
];

const Register = (props) => {

    const { navigation } = props;

    const [selectedItem, setSelectedItem] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleItemPress = (item) => {
        setSelectedItem(item);
    };

    const handleRegister = () => {
        // Thực hiện logic đăng ký ở đây
        // Bạn có thể sử dụng selectedItem và giá trị email/password
        console.log('Mục đã chọn:', selectedItem);
        console.log('Email:', email);
        console.log('Mật khẩu:', password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('../../../media/img/polytechnic.png')}
                />
            </View>

            <View style={styles.formContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Chọn cơ sở đào tạo</Text>
                </TouchableOpacity>

                {/* Dòng "Or continue with" */}
                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Hoặc tiếp tục với</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.googleButton}>
                    <Image source={require('../../../media/img/google.png')} style={styles.buttonLogo} />
                    <Text style={styles.googleButtonText}>Google</Text>
                </TouchableOpacity>

                {/* Các trường đăng ký */}
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor="#8CAAB9"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#8CAAB9"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Quay lại đăng nhập</Text>
                </TouchableOpacity>
            </View>

            {/*phan modal*/}
            <Modal visible={isModalVisible}
                animationType="fade" //fade: hieu ung mo dan
                transparent //de modal trong suot
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}
                        style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Đóng</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.listItem,
                                    selectedItem?.id === item.id && styles.highlightedItem,
                                ]}
                                onPress={() => handleItemPress(item)}
                            >
                                <Text
                                    style={[
                                        styles.listItemText,
                                        selectedItem?.id === item.id && styles.highlightedItemText,
                                    ]}
                                >{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </Modal>

        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212832',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        width: 150,
        height: 50,
    },
    formContainer: {
        flex: 1,
        marginTop: 30,
    },
    button: {
        backgroundColor: '#FED36A',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 30,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    orText: {
        fontSize: 16,
        color: '#8CAAB9',
        marginHorizontal: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#8CAAB9',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#212832',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        justifyContent: 'center',
        marginTop: 20,
    },
    googleButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonLogo: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#8CAAB9',
        color: 'white',
        fontSize: 16,
        marginTop: 20,
    },
    registerButton: {
        backgroundColor: '#FED36A',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 40,
    },
    registerButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    //phan modal
    modalContainer: {
        width: 320, // Kích thước chiều rộng của modal
        height: 400, // Kích thước chiều cao của modal
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212832', // Màu nền của modal với độ mờ
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: "50%", // Khoảng cách giữa modal và ảnh
    },
    closeButton: {
        backgroundColor: '#FED36A', // Màu nền của nút "Đóng"
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 20, // Khoảng cách giữa danh sách và nút "Đóng"
    },
    closeButtonText: {
        color: '#000000', // Màu chữ của nút "Đóng"
        fontSize: 18,
        fontWeight: 'bold',
    },
    listItem: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: 'gray', // Màu viền của danh sách
    },
    listItemText: {
        fontSize: 18,
        color: '#FF9900', // Màu chữ của danh sách
        marginHorizontal: 50,
    },
    highlightedItem: {
        backgroundColor: '#FED36A', // Màu highlight khi chọn
        borderRadius: 50,
    },
    highlightedItemText: {
        color: '#000000', // Màu chữ của highlight khi chọn
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Mở rộng phần tử để chiếm toàn bộ không gian của màn hình
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền overlay với độ mờ
    },

    //nut quay lai dang nhap
    loginButton: {
        backgroundColor: '#FED36A',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginTop: 20,
    },
    loginButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


