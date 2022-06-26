import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.viewTotal}>
                <Text style={styles.total}>Total</Text>
            </View>
            <View style={styles.viewValor}>
                <Text style={styles.valor}>{props.valueTotal}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    viewTotal: {
        marginLeft: 3,
    },
    viewValor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',          
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#424242',
        textAlign: 'left',
    },
    valor: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#01579B',
        textAlign: 'center',
    },
})
