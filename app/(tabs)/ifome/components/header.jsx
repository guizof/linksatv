import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

const Header = ({ link, header }) => {
    return (
        <View style={styles.container}>
            <Link href={link}>
                <Image style={styles.image} source={require('../assets/seta.png')} />
            </Link>
            <Text style={styles.text}>{header}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff0000',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50
    },
    image: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Header;