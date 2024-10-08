import { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library"; 
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Camera() {
    const [permissao, pedirPermissao] = useCameraPermissions();
    const [foto, setFoto] = useState(null);
    const cameraRef = useRef(null);
    const [ladoCamera, setLadoCamera] = useState('back');
    const [permissaoSalvar, pedirPermissaoSalvar] = MediaLibrary.usePermissions();
    const [scanear, setScanear] = useState(false);
    const [codigoScaneado, setCodigoScaneado] = useState(null);

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

    const handleBarCodeScanned = ({ type, data }) => {
        setCodigoScaneado(data);
        setScanear(false);
        Alert.alert('Código de barras escaneado!', `Tipo: ${type}\nCódigo: ${data}`);
    };

    return (
        <View style={styles.container}>
            {foto ? (
                <View>
                    <Image style={styles.image} source={{ uri: foto.uri }} />
                    <Button title='descartar imagem' onPress={() => setFoto(null)} />
                    <Button title='salvar foto' onPress={salvarFoto} />
                </View>
            ) : scanear ? (
                <BarCodeScanner
                    onBarCodeScanned={codigoScaneado ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            ) : (
                <CameraView style={styles.camera} facing={ladoCamera} ref={cameraRef}>
                    <View style={styles.botaosalvar}>
                        <Button title="tirar foto" onPress={tirarFoto} />
                        <Button title="trocar lado" onPress={inverterLadoCamera} />
                        <Button title="escaneador de código" onPress={() => setScanear(true)} />
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
    botaosalvar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
