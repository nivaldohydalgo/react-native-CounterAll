import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity, Button } from 'react-native';

import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

import Total from './components/Total'
import Mapa from './components/Mapa'
import Teclado from './components/Teclado'
import Menu from './components/Menu'

import { stateInitial } from './models/State'
import { color, size } from './models/Style'

const ws = {
    saveState: null,
    gdState: null,    
    total: 0,
    value: 0,
};

class HomeScreen extends Component {

    /*===========================================================
    /*                CONFIGURAÇÃO DO NAVIGATOR
    ===========================================================*/
/*
    static navigationOptions = ({ navigation }) => ({
        params: navigation.state,
        title: 'CounterAll',
        headerRight: (
            <View style={{ marginRight: 8, flexDirection: 'row' }}>
            <View style={{ margin: 8 }}>
                <Icon
                name='refresh'
                color='#fff'
                onPress={() => Alert.alert(
                    'REINICIALIZAÇÃO',
                    'Confirma reiniciar contagem?'
                )} />
            </View>
            <View style={{ margin: 8 }}>
                <Icon
                name='settings'
                color='#fff'
                onPress={() => navigation.navigate('Config')} />
            </View>
            <View style={{ margin: 8 }}>
                <Icon
          //      name='help'
                  name='menu'
                 color='#fff'
          //      onPress={() => navigation.navigate('Help', { parmPass: 'parametro passado...' } )} />
                onPress={() => params.clickMenu } />
            </View>
            </View>
        ),
    });

            <Button
            onPress={navigation.getParam('clickMenu')}
            title="+1"
            color="#fff"
            />


    <TouchableOpacity onPress={ navigation.getParam('clickMenu') }>
*/
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'CounterAll',
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('clickMenu')}>
                    <View style={{ margin: 8 }}>
                        <Icon
                            name='menu'
                            color='#fff'
                        />
                    </View>
                </TouchableOpacity>
            ),
        };
    };

    /*===========================================================
    /*                       CONSTRUCTOR
    ===========================================================*/
    constructor(props) {
        console.debug('*** Função: constructor - Home.js - v001 ***')
        super(props);
        this.state = { showMenu: false, showMap: false, ...stateInitial };
    }

    /*===========================================================
    /*         COMPONENTE DID MOUNT  E  DIDFOCUS
    ===========================================================*/
    componentDidMount() {
        console.debug('*** Função: componentDidMount - Home.js ***');
        this.props.navigation.setParams({ 
            clickMenu: this._clickMenu,
        });


        this.props.navigation.addListener("didFocus", () => {
            this.functionDidFocus();
        });
        this.props.navigation.addListener("didBlur", () => {
            console.debug('***** Dentro do didBlur *****')
        });
    }

    async functionDidFocus() {
        console.debug('*** Função: functionDidFocus - Home.js - V001 ***');
        console.debug('showMap: ' + this.state.showMap)
        ws.gdState = await AsyncStorage.getItem( '@storage_CounterAll_state' || null );
        console.debug('ws.gdState: ' + ws.gdState)
        if( ws.gdState !== null ) {
            ws.saveState = JSON.parse( ws.gdState );
            console.debug('ws.saveState: ' + ws.saveState)
            this.setState({ ...ws.saveState }); 
        };
        this.setState({ showMap: true }) 
    };

    /*===========================================================
    /*                  BOTAO MENU NA BARRA
    ===========================================================*/
    _clickMenu = () => {
        console.debug('*** Função: clickMenu - Home.js - V001 ***');
        this.setState({ showMenu: !this.state.showMenu });
    };    

    /*===========================================================
    /*               PRESSIONADO BOTAO DO MENU
    ===========================================================*/
    pressMenu = o => {
        console.debug("pressMenu...: " + o);

        switch (o) {
            case 'R':
                Alert.alert(
                    'REINICIALIZAÇÃO',
                    'Confirma reiniciar contagem?'
                )
                break;
            case 'C':
                this.props.navigation.navigate('Config')
                break;
            case 'H':
                this.props.navigation.navigate('Help')
                break;
            default: null
        }
    };

    /*===========================================================
    /*                  BOTAO SELEÇÃO DE SETOR
    ===========================================================*/
    selectSetor = s => {
        console.debug("selectSetor...: ", s);
        this.setState({ selected: s }, () => this.storeData() );
    };

    /*===========================================================
    /*             EXECUTA AÇÃO DO BOTÃO PRESSIONADO
    ===========================================================*/
    pressButton = b => {
        console.debug("pressButton...: ", b);
        ws.gdState = this.state;
        switch (b) {
        case 'C':
            //*=============== Clicou para resetar Setor ===============*/
            ws.value = 0;
            ws.total = 0;
            switch (this.state.selected) {
            case 'L1C1': ws.value = ws.gdState.rows.row1.col1.value; ws.gdState.rows.row1.col1.value = 0; break;
            case 'L1C2': ws.value = ws.gdState.rows.row1.col2.value; ws.gdState.rows.row1.col2.value = 0; break;
            case 'L1C3': ws.value = ws.gdState.rows.row1.col3.value; ws.gdState.rows.row1.col3.value = 0; break;
            case 'L2C1': ws.value = ws.gdState.rows.row2.col1.value; ws.gdState.rows.row2.col1.value = 0; break;
            case 'L2C2': ws.value = ws.gdState.rows.row2.col2.value; ws.gdState.rows.row2.col2.value = 0; break;
            case 'L2C3': ws.value = ws.gdState.rows.row2.col3.value; ws.gdState.rows.row2.col3.value = 0; break;
            case 'L3C1': ws.value = ws.gdState.rows.row3.col1.value; ws.gdState.rows.row3.col1.value = 0; break;
            case 'L3C2': ws.value = ws.gdState.rows.row3.col2.value; ws.gdState.rows.row3.col2.value = 0; break;
            case 'L3C3': ws.value = ws.gdState.rows.row3.col3.value; ws.gdState.rows.row3.col3.value = 0; break;
            default: null
            }
            ws.total = this.state.total -(ws.value);
            ws.gdState.total = ws.total;
            console.debug('ws.value.....:' + ws.value)
            console.debug('ws.total.....:' + ws.total)
            break;
        case '+':
            //*=============== Clicou em + (mais) ===============*/
            ws.gdState.operator = '+';
            break;
        case '-':
            //*=============== Clicou em - (menos) ===============*/
            ws.gdState.operator = '-';
            break;
        default:
            //*=============== Clicou em Numero ===============*/
            ws.value = 0;
            ws.total = 0;
            ws.value = parseInt(b)
            if ( this.state.operator === '-' ) {
                ws.value = -(ws.value)
            }
            ws.total = this.state.total + ws.value
            ws.gdState.total = ws.total
            console.debug('ws.value.....:' + ws.value)
            console.debug('ws.total.....:' + ws.total)
            switch (this.state.selected) {
                case 'L1C1': ws.gdState.rows.row1.col1.value += ws.value; break;
                case 'L1C2': ws.gdState.rows.row1.col2.value += ws.value; break;
                case 'L1C3': ws.gdState.rows.row1.col3.value += ws.value; break;
                case 'L2C1': ws.gdState.rows.row2.col1.value += ws.value; break;
                case 'L2C2': ws.gdState.rows.row2.col2.value += ws.value; break;
                case 'L2C3': ws.gdState.rows.row2.col3.value += ws.value; break;
                case 'L3C1': ws.gdState.rows.row3.col1.value += ws.value; break;
                case 'L3C2': ws.gdState.rows.row3.col2.value += ws.value; break;
                case 'L3C3': ws.gdState.rows.row3.col3.value += ws.value; break;
                default: null
            }
        }
        this.setState({ ...ws.gdState }, () => this.storeData() ); 
    };

    /*===========================================================
    /*            SALVA O STATE NO STORAGE LOCAL
    ===========================================================*/
    async storeData() {
        console.debug('*** Função: storeData ***')
        ws.gdState = await JSON.stringify( this.state );
        console.debug('ws.gdState: ' + ws.gdState)
        try {
            await AsyncStorage.setItem( '@storage_CounterAll_state' , ws.gdState )
        } catch (error) {
            console.debug('Não foi possível salvar: ' + error.message);
        }
    };

    /*===========================================================
    /*                  RENDERIZAÇÃO DA TELA
    ===========================================================*/
    render() {
        console.debug('HOME.JS ==> render')

        return (
        <View style={styles.container}>
            { this.state.showMenu ?
                <View style={styles.menu}>
                    <Menu onClick={this.pressMenu} />
                </View>
            : null
            }

            <View style={styles.total}>
                <Total valueTotal={this.state.total}/>
            </View>

            <View style={styles.mapa}>
                { this.state.showMap ?
                    <Mapa rows={this.state.rows}
                        config={this.state.config} 
                        selected={this.state.selected} 
                        onClick={this.selectSetor} 
                    />
                : null
                }
            </View>

            <View style={styles.teclado}>
                <Teclado operator={this.state.operator} onClick={this.pressButton} />
            </View>
        </View>
        );
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backScreen,
    },
    menu: {
        flex: size.flexMenu,
        marginTop: size.marginTopMenu,
        marginHorizontal: size.marginHorMenu,
        backgroundColor: color.backScreen,
    },
    total: {
        flex: size.flexTotal,
        marginTop: size.marginTopTotal,
        marginBottom: size.marginBotTotal,
        marginHorizontal: size.marginHorTotal,
        borderWidth: size.borderWidTotal,
        borderRadius: size.borderRadTotal,
        borderColor: color.borderTotal,
        backgroundColor: color.backTotal,
    },
    mapa: {
        flex: size.flexMapa,
        marginVertical: size.marginVerMapa,
        marginHorizontal: size.marginHorMapa,
        backgroundColor: color.backScreen,
    },
    teclado: {
        flex: size.flexTeclado,
        backgroundColor: color.backScreen,
    },
})
