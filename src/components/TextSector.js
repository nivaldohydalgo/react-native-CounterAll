import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { color, size } from '../models/Style'

export default props => {

    let stylesText = [styles.textName]
    if ( props.selected === props.id ) stylesText.push(styles.textSelected)

    let stylesValue = [styles.textValue]
    if ( props.selected === props.id ) stylesValue.push(styles.textSelected)

    return (
        <View>
                {/*-- Se for a tela de CONFIG --*/}
                { props.config ?
                    <View>
                        <Text style={stylesText}>
                            {props.id}
                        </Text>
                    </View>
                : null }
                { props.config && props.name ?
                    <View>
                        <Text style={stylesText}>
                            {props.name}
                        </Text>
                    </View>
                : null }
                {/*-- Se for a tela de HOME --*/}
                { !props.config && props.name ?
                    <View>
                        <Text style={stylesText}>
                            {props.name}
                        </Text>
                    </View>
                : null }
                { !props.config && !props.name ?
                    <View>
                        <Text style={stylesText}>
                            {props.id}
                        </Text>
                    </View>
                : null }
                {/*-- Mostra o Value ou o Maximum --*/}
                <View>
                    <Text style={stylesValue}>
                        {props.config ? props.maximum : props.value}
                    </Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textName: {
        color: color.textSector,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textValue: {
        color: color.valueSector,
        fontSize: size.valueSector,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textSelected: {
        color: color.textSelected,
    },
})

