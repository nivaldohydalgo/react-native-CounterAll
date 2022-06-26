import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import TextSector from './TextSector'
import { color, size } from '../models/Style'

export default props => {
    let styleButton = [styles.sector]
    if ( props.selected === props.id ) styleButton.push(styles.selectedSector)

    const touchableButton = 
        <TouchableOpacity style={styleButton} onPress={() => props.onClick(props.id)} >
            <TextSector {...props} />
        </TouchableOpacity>

    const viewButton = 
        <View style={styleButton}>
            <TextSector {...props} />
        </View>

    let typeSelected = null
    if (props.selected === props.id) {
        typeSelected = viewButton
    } else {
        typeSelected = touchableButton
    }

    return typeSelected
}

const styles = StyleSheet.create({
    sector: {
        flex: 1,
        backgroundColor: color.backSector,
        margin: size.marginSector,
        borderWidth: size.borderSector,
        borderRadius: size.radiusSector,
        borderColor: color.borderSector,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedSector: {
        backgroundColor: color.backSelected,
        margin: size.marginSelected,
        borderWidth: size.borderSelected,
        borderColor: color.borderSector,
    },
})

