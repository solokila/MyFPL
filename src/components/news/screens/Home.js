import {
    View, Text, StyleSheet, Image,
    TextInput, ScrollView, FlatList, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'

import { getNews } from '../NewsService'

import Trending from './hompage/Trending'
import Latest from './hompage/Latest'



const Home = (props) => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const { navigation } = props;

    const getNewsData = async () => {
        setLoading(true);
        const data = await getNews();
        setNews(data);
        setLoading(false);
    }

    //goi API
    //goi 1 lan duy nhat khi khoi tao
    useEffect(() => {
        getNewsData();
        return () => { }; //don rac bo nho (hien tai chua can dung nen de trong)
    }, [])

    //goi khi co su thay doi cua bien (news)
    // useEffect(() => {
    //     console.log('news:', news);
    // }, [news])

    //goi khi component render lai
    // useEffect(() => {
    //     console.log('render');
    // })

    //adapter
    const render = (value) => {
        const { item } = value;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(
                    'Detail', {
                    id: item._id
                })} //truyen id sang Detail
            >
                <Latest
                    thumb={{ uri: item.image }}
                    topic={item.topic}
                    title={item.title}
                    avatar={{ uri: item.createdBy.avatar }}
                    author={item.createdBy.name}
                    time={item.createdAt}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={myStyle.body} >
            <View style={myStyle.header}>
                <Image source={require('../../../media/kabar.png')} />
                <View style={myStyle.notifi_icon}>
                    <Image source={require('../../../media/notifi_icon.png')} />
                </View>
            </View>
            <View style={myStyle.searchContainer}>
                <TextInput style={myStyle.searchText} placeholder='Search' />
                <Image style={myStyle.searchIcon}
                    source={require('../../../media/search_icon.png')} />
                <Image style={myStyle.searchIcon2}
                    source={require('../../../media/search2_icon.png')} />
            </View>
            <View style={myStyle.trendingContainer}>
                <View style={myStyle.headerForTrending} >
                    <Text style={myStyle.fontTrending}>Trending</Text>
                    <Text style={myStyle.fontSeeall}>See all</Text>
                </View>
                <Trending
                    title="Russian warship: Moskva sinks in Black Sea"
                    thumb={require('../../../media/trending1.png')}
                    time="4h ago"
                    author="BBC News"
                    avatar={require('../../../media/logoBBC.png')}
                    country="Europe"
                />
            </View>

            <View style={myStyle.latestContainer}>
                <View style={myStyle.headerForTrending}>
                    <Text
                        style={myStyle.fontTrending}
                    >Latest</Text>
                    <Text style={myStyle.fontSeeall}>See all</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={myStyle.tabLatest}>
                    <Text style={myStyle.itemTabLatest}>All</Text>
                    <Text style={myStyle.itemTabLatest}>Sports</Text>
                    <Text style={myStyle.itemTabLatest}>Politics</Text>
                    <Text style={myStyle.itemTabLatest}>Bussiness</Text>
                    <Text style={myStyle.itemTabLatest}>Health</Text>
                    <Text style={myStyle.itemTabLatest}>Travel</Text>
                    <Text style={myStyle.itemTabLatest}>Science</Text>
                </ScrollView>
                <View
                    style={{ height: 180 }}
                >
                    <FlatList
                        onRefresh={getNewsData}
                        refreshing={loading}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={myStyle.listLatest}
                        data={news} //data
                        renderItem={render} //adapter
                        keyExtractor={(item, index) => item._id} />
                </View>
            </View>
        </View>
    )
}

export default Home

//css
const myStyle = StyleSheet.create({
    //latest


    listLatest: {
        // backgroundColor:"red",
        height: 120,
    },

    itemTabLatest: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000',
        marginBottom: 16,
        paddingRight: 15,
        // backgroundColor:'red'
    },

    tabLatest: {
        height: 40,
        marginTop: 16,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        flexWrap: 'wrap',
    },

    latestContainer: {
        height: 260,
        // backgroundColor: 'red',
    },

    fontSeeall: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66',
    },

    fontTrending: {
        fontFamily: 'Arial',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000',
    },

    headerForTrending: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red'
    },
    trendingContainer: {
        marginTop: 16,
        marginBottom: 16,
        // backgroundColor:'green',
    },
    searchContainer: {
        position: 'relative',
    },
    searchIcon2: {
        position: 'absolute',
        right: 14,
        top: 14,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: 14,
    },
    searchText: {
        borderWidth: 1,
        borderColor: '#4E4B66',
        borderRadius: 6,
        height: 48,
        paddingLeft: 44,
        backgroundColor: '#FFFFFF',
    },

    notifi_icon: {
        backgroundColor: '#FFFFFF',
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        // backgroundColor:'red'
    },
    body: {
        padding: 24,
        // backgroundColor:'red',
        width: '100%',
        height: '100%',
    }
})

//data
var DATA_NEWS = [
    {
        "_id": "6469ae77f046e80014a79fbc",
        "title": "Lãnh đạo Bộ Tứ họp thượng đỉnh bên lề G7, thống nhất nhiều nội dung",
        "content": "Lãnh đạo các nước thuộc Bộ Tứ (gồm Mỹ, Nhật Bản, Úc và Ấn Độ) đã nhất trí phản đối mạnh mẽ các ý đồ đơn phương nhằm thay đổi hiện trạng bằng vũ lực hoặc cưỡng ép.Các nhà lãnh đạo đạt được sự nhất trí như trên trong cuộc họp thượng đỉnh Bộ Tứ tại thành phố Hiroshima (Nhật) vào ngày 20.5, bên lề Hội nghị thượng đỉnh G7 mở rộng, diễn ra từ ngày 19-21.5.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/21/bo-tu-16846357397041437608387.jpg",
        "createdAt": "2023-05-21T05:39:03.336Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469ae46f046e80014a79fb8",
        "title": "Người Mỹ, EU, Nhật giảm ăn tôm, hộ nuôi Cà Mau bắt đầu 'treo ao' vì lỗ",
        "content": "Giá tôm nguyên liệu tại Cà Mau giảm mạnh, khiến người nuôi lo lắng, thu hoạch cũng lỗ, mà nuôi tiếp lại càng lỗ nặng...Ngày 20.5, Sở Công thương tỉnh Cà Mau cho biết, tổng kim ngạch xuất khẩu của tỉnh 3 tháng đầu năm giảm trên 26% so với cùng kỳ năm trước (đạt 275 triệu USD). Đồng thời, giá tôm nguyên liệu cũng giảm sâu liên tục nhiều tháng qua.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/20/thu-hoach-tom-ca-mau-trong-nghia-2-16845655093981842062192.jpg",
        "createdAt": "2023-05-21T05:38:14.249Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469ae18f046e80014a79fb4",
        "title": "Google sẽ không xóa các tài khoản không sử dụng có video YouTube",
        "content": "Google vừa giải thích rõ hơn về chính sách xóa tài khoản cá nhân không được sử dụng hoặc truy cập trong vòng 2 năm mà công ty vừa công bố.Theo Neowin, với thông báo vào đầu tuần, Google cho biết bắt đầu từ cuối năm nay, nếu một tài khoản Google không được sử dụng hoặc đăng nhập trong ít nhất 2 năm thì công ty có thể xóa tài khoản đó và nội dung của tài khoản đó, bao gồm cả nội dung trong Workspace, YouTube và Photos.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/19/youtube-1684467667789699346035.jpg",
        "createdAt": "2023-05-21T05:37:28.467Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469adbff046e80014a79fac",
        "title": "Quảng bá hình ảnh Việt Nam ra thế giới",
        "content": "Ngày 15.5 vừa qua, Thủ tướng Chính phủ đã ký Quyết định Phê duyệt chương trình tổng thể về phát triển văn hóa VN giai đoạn 2023 - 2025, trong đó có nêu nhiệm vụ và giải pháp để quảng bá hình ảnh đất nước, văn hóa và con người VN ra thế giới.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/20/co-vat-vn-tai-duc-16846064812471876643786.jpg",
        "createdAt": "2023-05-21T05:35:59.385Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469ad8af046e80014a79fa8",
        "title": "Nhiều dấu ấn tại Đại hội Hội Sinh viên ĐH Quốc gia Hà Nội",
        "content": "Với khẩu hiệu \"Sinh viên ĐH Quốc gia Hà Nội: bản lĩnh - trách nhiệm - sáng tạo\", Đại hội Hội Sinh viên ĐH Quốc gia Hà Nội lần thứ 5 ghi dấu ấn với nhiều điểm mới trong ứng dụng công nghệ.Trong 2 ngày 19 - 20.5, Đại hội Hội Sinh viên ĐH Quốc gia Hà Nội lần thứ 5, nhiệm kỳ 2023 - 2028 diễn ra với sự tham gia của 250 đại biểu là các cán bộ Hội, sinh viên tiêu biểu.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/20/vnuphien-thu-1-dh-hsv-2-1684570573524798932855.jpg",
        "createdAt": "2023-05-21T05:35:06.704Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469ad34f046e80014a79fa4",
        "title": "Nhiều người đi ô tô đến bốc thăm mua nhà ở xã hội",
        "content": "Do người dân đổ về Nhà thi đấu Q.Cầu Giấy (Hà Nội) bốc thăm suất mua nhà ở xã hội quá đông nên sáng nay 20.5, lượng phương tiện ô tô, xe máy xếp ở lòng đường, vỉa hè đường Trần Quý Kiên chật kín.",
        "image": "https://images2.thanhnien.vn/528068263637045248/2023/5/20/dh68001-1684569904237180091770.jpg",
        "createdAt": "2023-05-21T05:33:40.380Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469acfcf046e80014a79fa0",
        "title": "Ngừa nguy cơ đột quỵ do nắng nóng",
        "content": "Nắng nóng gay gắt dễ gây say nắng, say nóng hoặc đột quỵ. Theo Bộ Y tế, nguyên nhân chủ yếu là do tiếp xúc quá lâu hoặc làm việc trong môi trường nắng nóng, nhiệt độ cao hoặc cũng có thể do thay đổi nhiệt độ môi trường đột ngột, đặc biệt với những người có nguy cơ cao như: người già, trẻ nhỏ, phụ nữ có thai; những người làm việc, luyện tập với cường độ cao ở ngoài trời nắng lâu hoặc trong môi trường nóng bức; người mắc các bệnh mạn tính: tăng huyết áp, hen phế quản, đái tháo đường…",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/20/nang-nong-1684587682447165074016.png",
        "createdAt": "2023-05-21T05:32:44.836Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469acd8f046e80014a79f9c",
        "title": "Cơ hội nào cho lứa U.22 ở đội tuyển Việt Nam?",
        "content": "HLV Philippe Troussier có thể tạo điều kiện cho lứa U.22 ở đội tuyển Việt Nam, nhưng liệu học trò tận dụng cơ hội được hay không, đó lại là câu hỏi cần thời gian để giải đáp.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/3/van-tung-1-16831074206841664803153.jpg",
        "createdAt": "2023-05-21T05:32:08.104Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    },
    {
        "_id": "6469ac82f046e80014a79f98",
        "title": "Cán bộ học lý luận chính trị cao cấp sẽ được học về cơ yếu",
        "content": "Học viên học lý luận chính trị cao cấp sẽ được chính thức học về cơ yếu, được nâng cao ý thức bảo vệ bí mật quốc gia, theo ký kết giữa Ban Cơ yếu Chính phủ với Học viện Chính trị quốc gia Hồ Chí Minh.",
        "image": "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/5/20/dsc00963-1684573607190897318108.jpg",
        "createdAt": "2023-05-21T05:30:42.396Z",
        "createdBy": {
            "_id": "6469aa03f046e80014a79f88",
            "name": "Tuấn Kiệt",
            "avatar": "https://i.upanh.org/2023/05/21/image_processing20200227-2469-101xmqse23adfd2165a840f.jpeg"
        }
    }]