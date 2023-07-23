import {
    StyleSheet, Text, View, Image
} from 'react-native'
import React from 'react'

const DefaultAvatar = () => {
    return (
        <Image style={myStyle.logoNews}
            source={require('../../../../media/eye.jpg')} />
    )
}

const Latest = ({ thumb, topic, title, avatar, author, time }) => {
    return (
            <View style={myStyle.itemLatest}>
                <Image style={myStyle.newsImage}
                    source={thumb} />
                <View style={myStyle.contentLatest}>
                    <Text style={myStyle.fontNationality}>
                        {topic ? topic : "No topic"}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={myStyle.fontTitleTrending}>
                        {title}
                    </Text>
                    <View style={myStyle.infomation}>
                        <View style={myStyle.infomationA}>
                            {avatar.uri ?
                                <Image style={myStyle.logoNews} source={avatar} />
                                : <DefaultAvatar />
                            }
                            <Text style={myStyle.fontNewsName}>{author}</Text>
                            <Image style={myStyle.logoTime}
                                source={require('../../../../media/logoTime.png')} />
                            <Text
                                numberOfLines={1}
                                style={myStyle.fontTime}>{time}</Text>
                        </View>
                        <Image style={myStyle.dotIcon}
                            source={require('../../../../media/3dot_Icon.png')} />
                    </View>
                </View>
            </View>
    )
}

export default Latest

const myStyle = StyleSheet.create({
    contentLatest: {
        // backgroundColor:'red',
        width: '70%',
    },

    newsImage: {
        width: 96,
        height: 96,
        borderColor: '#C4C4C4',
        borderRadius: 6,
        backgroundColor: '#C4C4C4',
        marginRight: 4,
    },
    itemLatest: {
        marginBottom: 16,
        flexDirection: 'row',
        // width:'100%',
    },
    dotIcon: {
        // height:1.75,
        marginTop: 3,
        marginRight: 1.75,
        // backgroundColor:'red',
    },

    fontTime: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: '#4E4B66',
        marginLeft: 5.17,
        width: 80,
        // backgroundColor:'red'
    },

    logoTime: {
        marginTop: 4.17,
    },

    fontNewsName: {
        fontFamily: 'Arial',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: '#4E4B66',
        marginLeft: 4,
        marginRight: 13.17,
        // backgroundColor:'red'
    },

    logoNews: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'gray',
    },

    infomationA: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // backgroundColor:'red'
    },

    infomation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red'
    },
    fontTitleTrending: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000',
        paddingBottom: 4,
        // backgroundColor:'red'
    },

    fontNationality: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 20,
        letterSpacing: 0.12,
        color: '#4E4B66',
        paddingBottom: 4,
        // backgroundColor:'red'
    },

    imageforTrending: {
        width: '100%',
        height: 183,
        borderWidth: 1,
        borderColor: '#4E4B66',
        borderRadius: 6,
        backgroundColor: '#C4C4C4',
        marginBottom: 8,
    },
})