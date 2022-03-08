import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ViewServer = ({navigation}) => {


    const state = {
        modules: [
            {
                id: 1,
                title: 'iniciando com react',
                lessons: [
                    { id: 1, title: 'primeira aula' },
                    { id: 2, title: 'segunda aula' }
                ]
            },
            {
                id: 2,
                title: 'Aprendendo redux',
                lessons: [
                    { id: 1, title: 'terceira aula' },
                    { id: 2, title: 'quarta aula' }
                ]
            }
        ]
    }


    const { modules } = state;

    return (
        <View>
            {modules.map(module => (
                <Text>
                    {module.title}
                </Text>
            ))}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Register')
                }}
                style={styles.registrar}>
                <Text style={styles.version}>Adicionar Servidor</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    registrar: {
        height: 42,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        color: '#ffffff',
        width: 200,
    },
})