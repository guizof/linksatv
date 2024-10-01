import React, { createContext, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native';
import Header from './components/header';
import { Link } from 'expo-router';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [lanches, setLanches] = useState([
        { id: 1, nome: 'Hamburguer', local: 'Burgao Top', preco: 30.00, img: 'https://tr.rbxcdn.com/ad584b0a92d6c11125eb7749e7dcad9d/420/420/Image/Png' },
        { id: 2, nome: 'Pizza', local: 'Pizzaiolo', preco: 20.00, img: 'https://tr.rbxcdn.com/3a93cc9f53dc18e7c3cdd5774effb684/420/420/Gear/Png' },
    ]);

    const [carrinho, setCarrinho] = useState([]);

    return (
        <AppContext.Provider value={{ lanches, carrinho, setCarrinho }}>
            {children}
        </AppContext.Provider>
    );
};

const Item = ({ nome, local, preco, img, id }) => {
    const { carrinho, setCarrinho } = useContext(AppContext);

    const adicionar = () => {
        setCarrinho([...carrinho, { id, nome, local, preco }]);
    };

    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: img }} style={styles.img} />
            <View style={styles.itemDetails}>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.local}>{local}</Text>
                <Text style={styles.preco}>R$ {preco}</Text>
                <Pressable style={styles.buy} onPress={adicionar}>
                    <Text style={styles.buyTxt}>Adicionar ao carrinho</Text>
                </Pressable>
            </View>
        </View>
    );
};

const App = () => {
    const { lanches, carrinho } = useContext(AppContext);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Header link='../' header='iFome' />
                <View style={styles.cartArea}>
                    <Image source={require('./assets/carrinho.png')} style={styles.cartImg} />
                    <Text style={styles.txtCart}>{carrinho.length} itens</Text>
                    {carrinho.length > 0 && (
                        <Link href='./cart' style={styles.link}>
                            <Text>Carrinho</Text>
                        </Link>
                    )}
                </View>
            </View>
            <View style={styles.carts}>
                <FlatList
                    data={lanches}
                    renderItem={({ item }) => (
                        <Item {...item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </ScrollView>
    );
};

const Main = () => {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 20,
    },
    cartArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    txtCart: {
        marginRight: 20,
    },
    carts: {
        padding: 10
    },
    link: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 20,
    },
    img: {
        width: 150,
        height: 150,
        marginRight: 20,
    },
    itemDetails: {
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    local: {
        fontSize: 14,
        marginBottom: 5,
    },
    preco: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    buy: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buyTxt: {
        color: '#fff',
    },
    cartImg: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
});

export default Main;
