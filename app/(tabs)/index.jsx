import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.titulo}>Atividades</Text>
            <Link href="/banco" style={styles.link}>- Banco</Link>
            <Link href="/calculadorabonita" style={styles.link}>- Calculadora</Link>
            <Link href="/pokemon" style={styles.link}>- Pokémon</Link>
            <Link href="/teladelogin" style={styles.link}>- Tela Login</Link>
            <Link href="/ifome" style={styles.link}>- Ifome</Link>
            <Link href="/camera" style={styles.link}>- Câmera</Link>
            <Link href="/memorias" style={styles.link}>- Memories</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        
    },
    link: {
        fontSize: 16,
        margin: 8,
        color: 'white',
       
    },
    box:{ 
       padding: 60,
       borderRadius:5,
       backgroundColor: 'black',  
    },
    titulo:{
        fontSize: 30,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Calibri',
        fontWeight: '800',
        color: 'white'
    }
});