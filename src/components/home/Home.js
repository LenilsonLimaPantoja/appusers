import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import imgErro from '../../img/erro.gif';
import imgSucesso from '../../img/sucesso.gif';
const Item = ({ item, handleModal }) => (
    <TouchableOpacity activeOpacity={0.5} style={styles.botaoLista}>
        <Text style={{ color: '#174c4f', textAlign: 'center' }}>{item.name}</Text>
        <MaterialIcons name="delete" size={30} color="red" onPress={() => handleModal(item)} />
    </TouchableOpacity>
);
const Home = () => {
    const renderItem = ({ item }) => (
        <Item item={item} handleModal={handleModal} />
    );
    const [dados, setDados] = useState([]);
    const [itemExcluir, setItemExcluir] = useState('');
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalResposta, setOpenModalResposta] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModal = (item) => {
        setItemExcluir(item)
        setOpenModalExcluir(!openModalExcluir)

    }

    const handleDelete = (item) => {
        setDados(dados.filter((itemFilter) => itemFilter.id != item.id));
        setOpenModalExcluir(false)
        setOpenModalResposta(true)
    }

    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((result) => {
                setDados(result);
                setLoading(false)
            });
    }, [reload])
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#174c4f', padding: 20, alignItems: 'center', elevation: 1 }}>
                    <Text style={{ color: 'white' }}>USERS</Text>
                    <Ionicons name="reload" onPress={() => setReload(!reload)} size={25} color="white" />
                </View>
                {dados?.length > 0 ?
                    <SafeAreaView style={{ width: '100%', padding: 10 }}>
                        <FlatList
                            data={dados}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                    :
                    <Text style={{ color: 'white' }}>Nenhum usuário disponivel</Text>
                }

                {/* modal excluir */}
                <Modal visible={openModalExcluir} onRequestClose={() => setOpenModalExcluir(false)} transparent={true} animationType='fade'>
                    <View style={styles.areaModal}>
                        <TouchableOpacity activeOpacity={0} style={{ flex: 1, backgroundColor: 'black', opacity: 0.7 }} onPress={() => setOpenModalExcluir(false)}></TouchableOpacity>
                        <View style={{ backgroundColor: '#fff', padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imgErro} resizeMode='contain' style={{ width: 180, height: 180 }} />
                            <Text style={{ color: '#174c4f', textTransform: 'uppercase', marginTop: 30 }}>
                                Deseja excluir o usuário {itemExcluir.name}?
                            </Text>
                            <View style={{ width: '100%', marginTop: 30 }}>
                                <TouchableOpacity onPress={() => setOpenModalExcluir(false)} style={{ backgroundColor: '#174c4f', width: '100%', marginBottom: 20, padding: 10, borderRadius: 5 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>CANCELAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(itemExcluir)} style={{ backgroundColor: 'red', width: '100%', marginBottom: 20, padding: 10, borderRadius: 5 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>CONFIRMAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* modal excluir */}

                {/* modal excluir */}
                <Modal visible={openModalResposta} onRequestClose={() => setOpenModalResposta(false)} transparent={true} animationType='fade'>
                    <View style={styles.areaModal}>
                        <TouchableOpacity activeOpacity={0} style={{ flex: 1, backgroundColor: 'black', opacity: 0.7 }} onPress={() => setOpenModalResposta(false)}></TouchableOpacity>
                        <View style={{ backgroundColor: '#fff', padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imgSucesso} resizeMode='contain' style={{ width: 180, height: 180 }} />
                            <Text style={{ color: '#174c4f', textTransform: 'uppercase', marginTop: 30 }}>
                                Usuário {itemExcluir.name} foi excluido com sucesso!
                            </Text>
                            <View style={{ width: '100%', marginTop: 30 }}>
                                <TouchableOpacity onPress={() => setOpenModalResposta(false)} style={{ backgroundColor: '#174c4f', width: '100%', marginBottom: 20, padding: 10, borderRadius: 5 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>ENTENDI</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* modal excluir */}

            </View>
        );
    }
}

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#174c4f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoLista: {
        elevation: 1,
        backgroundColor: '#fff',
        marginBottom: 10, width: '100%',
        padding: 20,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#174c4f',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    areaModal: {
        flex: 1,
    }
});
