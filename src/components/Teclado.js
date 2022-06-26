import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Botao from './Botao'

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.rowTeclado}>
                <Botao title='C' onClick={props.onClick} green icon="refresh" />
                <Botao title='-' operator={props.operator} onClick={props.onClick} red icon="remove" />
                <Botao title='+' operator={props.operator} onClick={props.onClick} blue icon="add" />
            </View>
            <View style={styles.rowTeclado}>
                <Botao title='1' onClick={props.onClick} yellow />
                <Botao title='2' onClick={props.onClick} yellow />
                <Botao title='3' onClick={props.onClick} yellow />
                <Botao title='4' onClick={props.onClick} yellow />
                <Botao title='5' onClick={props.onClick} yellow />
            </View>
            <View style={styles.rowTeclado}>
                <Botao title='6' onClick={props.onClick} yellow />
                <Botao title='7' onClick={props.onClick} yellow />
                <Botao title='8' onClick={props.onClick} yellow />
                <Botao title='9' onClick={props.onClick} yellow />
                <Botao title='10' onClick={props.onClick} yellow />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',                
    },
    rowTeclado: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',                
    },
})