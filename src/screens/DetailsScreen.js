import { Dimensions, Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const { height, width } = Dimensions.get('window')
import Feather from 'react-native-vector-icons/Feather';

const DetailsScreen = ({ navigation, route }) => {

    const [onIndex, setOnIndex] = useState('')
    console.log(route.params.props, "props")
    const data = route.params.props
    const IMAGE_SIZE = 80;
    const imageData = data.images;
    const SPACING = 10;
    const topRef = React.useRef();
    const bottomRef = React.useRef();
    const goToCart = () => {
        navigation.navigate("AddToCart")
    }

    const setActiveIndex = (index) => {
        setOnIndex(index);
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        })
        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            bottomRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            bottomRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
    }

    const RenderImage = (url) => {
        return (
            <View
                key={url.index}>
                <Image source={{ uri: url.item }} style={styles.imageView} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <FlatList
                    ref={topRef}
                    bounces={false}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={imageData}
                    horizontal
                    onMomentumScrollEnd={ev => {
                        setActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width))
                    }}
                    keyExtractor={(_, index) => { index.toString() }}
                    renderItem={RenderImage}
                />
                <Text style={styles.prizeText}>{data.price}$</Text>
            </View>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={[styles.descriptionText, { color: '#FF75D8' }]}>Brand: {data.brand}</Text>
            <Text style={[styles.descriptionText, { color: '#FF75D8', }]}>Stock: {data.stock}</Text>
            <Text style={[styles.descriptionText, { color: '#000', }]}>{data.description}</Text>
            <View style={styles.cartStyle}>
                <Text style={[styles.descriptionText, { color: 'blue', }]} onPress={() => goToCart()}>Add to cart</Text>
                <Feather name="shopping-cart" size={20} color="blue" />
            </View>
            {/* <RenderImage /> */}
            <FlatList
                ref={bottomRef}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                data={imageData}
                horizontal
                keyExtractor={(_, index) => { index.toString() }}
                style={{ position: 'absolute', bottom: 80 }}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({ item, index }) => {
                    console.log(item, index)
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setActiveIndex(index)}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: 12,
                                    marginRight: SPACING,
                                    borderWidth: 2,
                                    borderColor: onIndex === index ? "red" : 'transparent'
                                }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageView: {
        minHeight: 200,
        width: width,
        resizeMode: 'cover'
    },
    imageContainer: {
        alignItems: 'center',
    },
    prizeText: {
        position: 'absolute',
        color: "red",
        letterSpacing: .1,
        fontSize: 20,
        textAlign: 'center',
        bottom: 10,
        left: 20
    },
    title: {
        color: "green",
        paddingVertical: 4,
        fontSize: 22,
        letterSpacing: .6,
        textDecorationLine: 'underline',
        paddingHorizontal: 8,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 3,
        paddingHorizontal: 8,
    },
    cartStyle: {
        flexDirection: "row",
        alignSelf: 'center',
        maxWidth: 150,
        paddingHorizontal: 8,
        marginTop: 25,
        paddingVertical: 8,
        borderRadius: 1,
        justifyContent: 'center',
        backgroundColor: '#B4F8C8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: .25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})