import {
    StyleSheet, Text, View, ScrollView,
    Image, Pressable, Dimensions, TouchableHighlight
} from 'react-native'
import React, {
    useState, useEffect
} from 'react'
import { getNewsById } from '../NewsService'
import AppLoader from '../../../utils/AppLoader'


// {avatar, name, time, national, title, content}

const DefaultAvatar = () => {
    return (
        <Image
            style={detailStyles.bbcnewIcon}
            source={require('../../../media/eye.jpg')}
        />
    )
}

const Detail = (props) => {
    const { navigation, route } = props
    const { id } = route?.params

    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(false)

    const getNewsData = async (id) => {
        if (!id) return
        setLoading(true)
        const data = await getNewsById(id)
        // console.log('getNewsById data:', data)
        setNews(data[0])
        setLoading(false)
    }

    useEffect(() => {
        getNewsData(id)
    }, [])

    if (!news) return <AppLoader />

    return (
        <ScrollView style={detailStyles.container}>
            <View style={detailStyles.body}>
                <View style={detailStyles.toolbar}>
                    <TouchableHighlight
                        onPress={() => navigation.goBack()}
                        underlayColor='transparent'
                    >
                        <Image
                            style={detailStyles.backIcon}
                            source={require('../../../media/backpress.png')} />
                    </TouchableHighlight>
                    <View style={detailStyles.shareContainer}>
                        <Image
                            style={detailStyles.shareIcon}
                            source={require('../../../media/link_icon.png')} />
                        <Image
                            style={detailStyles.backIcon}
                            source={require('../../../media/dot_icon_vertical.png')} />
                    </View>
                </View>
                <View style={detailStyles.followContainer}>
                    <View style={detailStyles.followTitleContainer}>
                        {news.createdBy.avatar ?
                            <Image
                                style={detailStyles.bbcnewIcon}
                                source={{ uri: news.createdBy.avatar }} />
                            : <DefaultAvatar />
                        }
                        <View style={detailStyles.followTitle}>
                            <Text style={detailStyles.followTitleBBC}>
                                {news.createdBy.name}</Text>
                            <Text style={detailStyles.followTitleTime}>
                                {news.createdAt}</Text>
                        </View>
                    </View>
                    <Pressable style={detailStyles.buttonFollowing}>
                        <Text style={detailStyles.buttonFollowingLabel}>
                            Following
                        </Text>
                    </Pressable>
                </View >
                <Image
                    style={detailStyles.imgDetail}
                    source={{ uri: news.image }}></Image>
                <View style={detailStyles.titleContainer}>
                    <Text style={detailStyles.titleEurope}>
                        {news.national ? news.national : 'no national'}
                    </Text>
                    <Text style={detailStyles.titleUkraine}>
                        {news.title}
                    </Text>
                </View>
                <Text style={detailStyles.content}>
                    {news.content}
                </Text>
                <View style={detailStyles.bottomContainer}>
                    <View style={detailStyles.likeContainer}>
                        <View style={detailStyles.like}>
                            <Image
                                style={detailStyles.backIcon}
                                source={require('../../../media/heart_icon.png')}></Image>
                            <Text style={detailStyles.likeNumber}>24.5k</Text>
                        </View>
                        <View style={detailStyles.like}>
                            <Image
                                style={detailStyles.backIcon}
                                source={require('../../../media/comment_icon.png')}></Image>
                            <Text style={detailStyles.likeNumber}>1k</Text>
                        </View>
                    </View>
                    <View style={detailStyles.like}>
                        <Image
                            style={detailStyles.backIcon}
                            source={require('../../../media/bookmark_icon.png')}></Image>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Detail

const detailStyles = StyleSheet.create({
    content: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#4E4B66'
    },
    likeNumber: {
        marginLeft: 5,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#050505'
    },
    like: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,

    },
    titleUkraine: {
        fontWeight: '400',
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: 0.12,
        color: '#000000'
    },
    titleEurope: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66',
        marginBottom: 4,
        marginTop: 16
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    imgDetail: {
        marginTop: 20,
        width: Dimensions.get('window').width - 48,
        height: (Dimensions.get('window').width - 48) * 0.65,
        borderRadius: 6,
        backgroundColor: '#E5E5E5'
    },
    buttonFollowingLabel: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#FFFFFF'
    },
    buttonFollowing: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 12,
        height: 34,
        backgroundColor: '#1877F2',
        borderRadius: 6,
    },
    followTitleTime: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66'
    },
    followTitleBBC: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000'
    },
    followTitle: {
        marginLeft: 5,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    followTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bbcnewIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'gray'
    },
    followContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    shareIcon: {
        marginRight: 10,
        // width: 24,
        // height: 24
    },
    shareContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 24,
    },
    backIcon: {
        // width: 24,
        // height: 24
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body: {
        padding: 24,
        backgroundColor: 'while',
        width: '100%',
        height: '100%'
    },
})