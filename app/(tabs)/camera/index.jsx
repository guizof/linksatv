import { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library"; 
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Linking } from 'react-native';

export default function Camera() {
    const [permissao, pedirPermissao] = useCameraPermissions();
    const [foto, setFoto] = useState(null);
    const cameraRef = useRef(null);
    const [ladoCamera, setLadoCamera] = useState('back');
    const [permissaoSalvar, pedirPermissaoSalvar] = MediaLibrary.usePermissions();
    const [scanear, setScanear] = useState(false);
    const [zoom, setZoom] = useState(0);

    if (!permissao) {
        return <View />;
    }

    if (!permissao.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.textopermissao}>Você precisa permitir o aplicativo acessar sua câmera</Text>
                <Button title="pedir permissão" onPress={pedirPermissao} />
            </View>
        );
    }

    const tirarFoto = async () => {
        const foto = await cameraRef.current?.takePictureAsync({
            quality: 0.5,
            base64: true,
        });
        setFoto(foto);
        console.log(foto);
    };

    const inverterLadoCamera = () => {
        setLadoCamera(ladoCamera === 'back' ? 'front' : 'back');
    };

    const salvarFoto = async () => {
        if (permissaoSalvar.status !== 'granted') {
            await pedirPermissaoSalvar();
        }
        if (foto && foto.uri) {
            await MediaLibrary.saveToLibraryAsync(foto.uri);
            setFoto(null);
        }
    };

    const descartarFoto = () => {
        setFoto(null);
    };

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanear(false);
        const supported = await Linking.canOpenURL(data);
        if (supported) {
            await Linking.openURL(data);
        } else {
            Alert.alert("Não foi possível abrir o link.");
        }
    };

    const aumentarZoom = () => {
        if (zoom < 1) {
            setZoom(zoom + 0.1);
        }
    };

    const diminuirZoom = () => {
        if (zoom > 0) {
            setZoom(zoom - 0.1);
        }
    };

    return (
        <View style={styles.container}>
            {foto ? (
                <View style={styles.previewContainer}>
                    <Image style={styles.image} source={{ uri: foto.uri }} />
                    <View style={styles.buttonContainer}>
                        <Button title='descartar imagem' onPress={descartarFoto} />
                        <Button title='salvar foto' onPress={salvarFoto} />
                    </View>
                </View>
            ) : scanear ? (
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            ) : (
                <CameraView 
                    style={styles.camera} 
                    facing={ladoCamera} 
                    ref={cameraRef} 
                    zoom={zoom}
                >
                    <View style={styles.botaosalvar}>
                        <Button title="tirar foto" onPress={tirarFoto} />
                        <Button title="trocar lado" onPress={inverterLadoCamera} />
                        <Button title="escaneador de código" onPress={() => setScanear(true)} />
                        <View style={styles.zoomContainer}>
                            <Button title="+" onPress={aumentarZoom} />
                            <Button title="-" onPress={diminuirZoom} />
                        </View>
                    </View>
                </CameraView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textopermissao: {
        textAlign: 'center',
    },
    camera: {
        flex: 1,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '100%',
    },
    botaosalvar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    zoomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        width: '50%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
