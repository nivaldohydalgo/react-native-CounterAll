import React from 'react'
import { StyleSheet, View } from 'react-native'

import BotaoMenu from './BotaoMenu'

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.rowMenu}>
                <BotaoMenu title='R' name='INICIALIZAR' icon='refresh' onClick={props.onClick} />
                <BotaoMenu title='C' name='CONFIGURAR' icon='apps' onClick={props.onClick} />
                <BotaoMenu title='H' name='SOBRE O APP' icon='help' onClick={props.onClick} />
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
    rowMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',                
    },
})