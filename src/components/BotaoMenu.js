import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements'
import { color, size } from '../models/Style'

export default props => {

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.onClick(props.title)}>
            <View>
                <View style={styles.iconView}>
                    <Icon style={styles.icon}
                                size={size.iconMenu}
                                color={color.iconMenu}
                                name={props.icon}
                    /> 
                </View>
                <Text style={styles.textButton}>
                    {props.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#B00020',
        margin: 2,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        color: '#FFFFFF',
        fontSize: size.fontMenu,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
    //    color: '#000000',
        margin: 2,
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',  
        alignItems: 'center', 
    }
})
