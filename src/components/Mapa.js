import React from 'react';
import { StyleSheet, View } from 'react-native';

import Setor from './Setor'

export default props => {

    return (

        <View style={styles.container}>

            {props.rows.row1.active
              ? <View style={styles.rowView}>
                  {props.rows.row1.col1.active
                      ? <Setor {...props.rows.row1.col1} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                  {props.rows.row1.col2.active
                      ? <Setor {...props.rows.row1.col2} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                  {props.rows.row1.col3.active
                      ? <Setor {...props.rows.row1.col3} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                </View> : null
            }

            {props.rows.row2.active
              ? <View style={styles.rowView}>
                  {props.rows.row2.col1.active
                      ? <Setor {...props.rows.row2.col1} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                  {props.rows.row2.col2.active
                      ? <Setor {...props.rows.row2.col2} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                  {props.rows.row2.col3.active
                      ? <Setor {...props.rows.row2.col3} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                </View> : null
            }

            {props.rows.row3.active
              ? <View style={styles.rowView}>
                  {props.rows.row3.col1.active
                      ? <Setor {...props.rows.row3.col1} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                  {props.rows.row3.col2.active
                      ? <Setor {...props.rows.row3.col2} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                  {props.rows.row3.col3.active
                      ? <Setor {...props.rows.row3.col3} config={props.config} 
                        selected={props.selected} onClick={props.onClick} /> : null }
                </View> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',        
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',        
    },
    texto: {
        flex: 1,
    },
})

