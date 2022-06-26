import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements'

import { color, size } from '../models/Style'

export default props => {

    buttonStyle = [styles.container]
    if (props.green) buttonStyle.push(styles.buttonGreen)
    if (props.blue) buttonStyle.push(styles.buttonBlue)
    if (props.red) buttonStyle.push(styles.buttonRed)
    if (props.yellow) buttonStyle.push(styles.buttonYellow)

    if (props.operator === props.title)  buttonStyle.push(styles.activeOperator)

    textStyle = [styles.textButton]
    if (props.green) textStyle.push(styles.textGreen)
    if (props.blue) textStyle.push(styles.textBlue)
    if (props.red) textStyle.push(styles.textRed)
    if (props.yellow) textStyle.push(styles.textYellow)

    return (
        props.operator === props.title  
        ?
            <View style={buttonStyle} >
                <View>
                    { props.icon ?
                        <Icon style={styles.icon}
                            size={size.iconButton}
                            color={color.iconButton}
                            name={props.icon}
                        />
                    :
                        <Text style={textStyle}>
                            {props.title}
                        </Text>
                    }
                </View>
            </View>
        :
           <TouchableOpacity style={buttonStyle} onPress={() => props.onClick(props.title)}>
                <View>
                    { props.icon ?
                        <View style={styles.iconView}>
                            <Icon style={styles.icon}
                                size={size.iconButton}
                                color={color.iconButton}
                                name={props.icon}
                            /> 
                            { props.name ? 
                                <Text style={textStyle}>
                                    {props.name}
                                </Text>
                                : null 
                            }
                        </View>
                    :   
                        <Text style={textStyle}>
                            {props.title}
                        </Text>
                    }
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 2,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: '#37474F',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        color: '#000000',
        fontSize: size.fontButton,
        fontWeight: 'bold',
    },
    buttonGreen: {
        backgroundColor: '#00E676',
    },
    textGreen: {
        color: '#000000',
    },
    buttonYellow: {
        backgroundColor: '#FFD600',
    },
    textYellow: {
        color: '#000000',
    },
    buttonRed: {
        backgroundColor: '#D50000',
    },
    textRed: {
        color: '#FFFFFF',
    },
    buttonBlue: {
        backgroundColor: '#0277BD',
    },
    textBlue: {
        color: '#FFFFFF',
    },

    activeOperator: {
        margin: 1,
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },

    icon: {
        color: '#FFFFFF',
        margin: 4,
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'center',  
        alignItems: 'center', 
    }
})
