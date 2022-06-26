import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Mapa from './components/Mapa'
import Botao from './components/Botao'

import { stateInitial } from './models/State'
import { color, size } from './models/Style'

const ws = {
    gdState: null,       // para trabalhar com o state
    saveState: null,     // para trabalhar com o state    

    qtRow: 1,            // quantidade de linhas
    qtCol1: 1,           // quantidade de setores na linha 1
    qtCol2: 0,           // quantidade de setores na linha 2
    qtCol3: 0,           // quantidade de setores na linha 3
    rowSel: 1,           // linha selecionada
    //*-- Valores Iniciais --*//
    initQtRow: 1,        // quantidade de linhas
    initQtCol1: 1,       // quantidade de setores na linha 1
    initQtCol2: 0,       // quantidade de setores na linha 2
    initQtCol3: 0,       // quantidade de setores na linha 3

    inSave: false,       // indicador de salvar
    inValid: false,      // indicador de valido

    nameSector: null,    // nome do setor
    maximumSector: null, // máximo do setor em número
    maximumText: null,   // máximo do setor em texto
}

class ConfigScreen extends Component {

    /*===========================================================
    /*                CONFIGURAÇÃO DO NAVIGATOR
    ===========================================================*/
    static navigationOptions = {
        title: 'Configuração dos Setores',
    }

    /*===========================================================
    /*                       CONSTRUCTOR
    ===========================================================*/
    constructor(props) {
        console.debug('*** Função: constructor - Config.js - v001 ***')
        super(props);
        this.state = { showEdit: false, showMap: false, ...stateInitial };
    }

    /*===========================================================
    /*                   COMPONENTE DID MOUNT
    ===========================================================*/
    async componentDidMount() {
        console.debug('*** Função: componentDidMount ***');
        ws.gdState = await AsyncStorage.getItem( '@storage_CounterAll_state' || null );
        if( ws.gdState !== null ) {
            ws.saveState = JSON.parse( ws.gdState );
            this.setState({ ...ws.saveState }, 
                () => this.setState({ showMap: true }),
                () => this.verifyRowColActive(true) 
            ); 
        } else {
            this.setState({ showMap: true }) 
        }
    }

    /*===========================================================
    /*            SALVA O STATE NO STORAGE LOCAL
    ===========================================================*/
    configSave = () => {
        console.debug('*** Função: configSave - Config.js - V002 ***')
        console.debug('qtRow..: ' + ws.qtRow + '  initQtRow..: ' + ws.initQtRow)
        console.debug('qtCol1.: ' + ws.qtRow + '  initQtCol1.: ' + ws.initQtRow)
        console.debug('qtCol2.: ' + ws.qtRow + '  initQtCol2.: ' + ws.initQtRow)
        console.debug('qtCol3.: ' + ws.qtRow + '  initQtCol3.: ' + ws.initQtRow)
        if ( ws.qtRow.toFixed(0) == ws.initQtRow.toFixed(0)
            && ws.qtCol1.toFixed(0) == ws.initQtCol1.toFixed(0) 
            && ws.qtCol2.toFixed(0) == ws.initQtCol2.toFixed(0) 
            && ws.qtCol3.toFixed(0) == ws.initQtCol3.toFixed(0) ) {
            console.debug('==> NÃO HOUVE alteração nos setores')
        } else {
            console.debug('==> HOUVE alteração nos setores')

        }

        this.storeData();
    };
    
    storeData = async () => {
        console.debug('*** Função: storeData ***')
        ws.gdState = await JSON.stringify( this.state );
        try {
            await AsyncStorage.setItem( '@storage_CounterAll_state' , ws.gdState )
            Alert.alert( 'ATENÇÃO' , 'Configuração salva com sucesso!' ) 
        } catch (error) {
            let txError = 'Não foi possível salvar: ' + error.message
            Alert.alert( 'ALERTA DE ERRO' , txError )
        }
    };
    
    /*===========================================================
    /*           MARCA O SETOR SELECIONADO (onPress)
    ===========================================================*/
    selectSetor = s => {
        console.debug('*** Função: selectSetor ***')
        console.debug("Parametros => s: " +  s);
        this.setState({ selected: s })
        switch (s) {
            case 'L2C1':
            case 'L2C2':
            case 'L2C3':
                ws.rowSel = 2; 
                break;
            case 'L3C1':
            case 'L3C2':
            case 'L3C3':
                ws.rowSel = 3; 
                break;
            default: ws.rowSel = 1
        }
    };

    /*===========================================================
    /*              VERIFICA LINHAS E COLUNAS ATIVAS
    ===========================================================*/
    verifyRowColActive = (initial) => {
        console.debug('*** Função: verifyRowColActive ***');
        ws.qtRow = 0;
        ws.qtCol1 = 0;
        ws.qtCol2 = 0;
        ws.qtCol3 = 0;
        ws.rowSel = 0;
        ws.gdState = this.state;
        if ( ws.gdState.rows.row1.active ) { ws.qtRow++; console.debug('r1') };
        if ( ws.gdState.rows.row2.active ) { ws.qtRow++; console.debug('r2') };
        if ( ws.gdState.rows.row3.active ) { ws.qtRow++; console.debug('r3') };
        if ( ws.gdState.rows.row1.col1.active ) { ws.qtCol1++; console.debug('r1c1') };
        if ( ws.gdState.rows.row1.col2.active ) { ws.qtCol1++; console.debug('r1c2') };
        if ( ws.gdState.rows.row1.col3.active ) { ws.qtCol1++; console.debug('r1c3') };
        if ( ws.gdState.rows.row2.col1.active ) { ws.qtCol2++; console.debug('r2c1') };
        if ( ws.gdState.rows.row2.col2.active ) { ws.qtCol2++; console.debug('r2c2') };
        if ( ws.gdState.rows.row2.col3.active ) { ws.qtCol2++; console.debug('r2c3') };
        if ( ws.gdState.rows.row3.col1.active ) { ws.qtCol3++; console.debug('r3c1') };
        if ( ws.gdState.rows.row3.col2.active ) { ws.qtCol3++; console.debug('r3c2') };
        if ( ws.gdState.rows.row3.col3.active ) { ws.qtCol3++; console.debug('r3c3') };
        switch (ws.gdState.selected) {
            case 'L2C1':
            case 'L2C2':
            case 'L2C3':
                ws.rowSel = 2; 
                break;
            case 'L3C1':
            case 'L3C2':
            case 'L3C3':
                ws.rowSel = 3; 
                break;
            default: ws.rowSel = 1
        };
        console.debug('===> ws.qtRow.......: ' + ws.qtRow)
        console.debug('===> ws.qtCol1......: ' + ws.qtCol1)
        console.debug('===> ws.qtCol2......: ' + ws.qtCol2)
        console.debug('===> ws.qtCol3......: ' + ws.qtCol3)
        console.debug('===> ws.rowSel......: ' + ws.rowSel)
        console.debug('===> initial........: ' + initial)
        if ( initial ) {
            ws.initQtRow  = ws.qtRow;
            ws.initQtCol1 = ws.qtCol1;
            ws.initQtCol2 = ws.qtCol2;
            ws.initQtCol3 = ws.qtCol3;
        }
    }

    /*===========================================================
    /*          VALIDA SE SETOR SELECTED ESTÁ ATIVO
    ===========================================================*/
    validSectorActive = () => {
        console.debug('*** Função: validSectorActive ***');
        ws.gdState = this.state;
        ws.inValid = true;
        switch (ws.gdState.selected) {
            case 'L1C1': { if ( ws.gdState.rows.row1.col1.active == false ) { ws.inValid = false }; break; }
            case 'L1C2': { if ( ws.gdState.rows.row1.col2.active == false ) { ws.inValid = false }; break; }
            case 'L1C3': { if ( ws.gdState.rows.row1.col3.active == false ) { ws.inValid = false }; break; }
            case 'L2C1': { if ( ws.gdState.rows.row2.col1.active == false ) { ws.inValid = false }; break; }
            case 'L2C2': { if ( ws.gdState.rows.row2.col2.active == false ) { ws.inValid = false }; break; }
            case 'L2C3': { if ( ws.gdState.rows.row2.col3.active == false ) { ws.inValid = false }; break; }
            case 'L3C1': { if ( ws.gdState.rows.row3.col1.active == false ) { ws.inValid = false }; break; }
            case 'L3C2': { if ( ws.gdState.rows.row3.col2.active == false ) { ws.inValid = false }; break; }
            case 'L3C3': { if ( ws.gdState.rows.row3.col3.active == false ) { ws.inValid = false }; break; }
        };
        if ( !ws.inValid ) {
            this.selectSetor('L1C1') 
        };
    }

    /*===========================================================
    /*             INCLUSÃO E EXCLUSÃO DE LINHAS
    ===========================================================*/
    configRow = o => {
        console.debug('*** Função: configRow - V002 ***');
        console.debug("Parametros => o: ", o);
        ws.gdState = this.state;
        this.verifyRowColActive(false);
        ws.inSave = true
        if ( o == '+') {
            if ( ws.qtRow < 3 ) {
                ws.qtRow++
                switch (ws.qtRow) {
                    case 2: { 
                        ws.gdState.rows.row2.active = true;
                        ws.gdState.rows.row2.col1.active = true ; 
                        ws.qtCol2 = 1;
                        break;
                    }
                    case 3: { 
                        ws.gdState.rows.row3.active = true;
                        ws.gdState.rows.row3.col1.active = true; 
                        ws.qtCol3 = 1;
                        break;
                    }
                }
            } else {
                ws.inSave = false;
                Alert.alert( 'AVISO' , 'Não é possível incluir mais de 3 linhas de setores!' );                
            }
        }
        if ( o == '-') {
            if ( ws.qtRow > 1 ) {
                switch (ws.qtRow) {
                    case 2: { 
                        ws.gdState.rows.row2.active = false;
                        ws.gdState.rows.row2.col1.active = false; 
                        ws.gdState.rows.row2.col2.active = false; 
                        ws.gdState.rows.row2.col3.active = false; 
                        ws.qtCol2 = 0;
                        break;
                    }
                    case 3: { 
                        ws.gdState.rows.row3.active = false;
                        ws.gdState.rows.row3.col1.active = false; 
                        ws.gdState.rows.row3.col2.active = false; 
                        ws.gdState.rows.row3.col3.active = false; 
                        ws.qtCol3 = 0;
                        break;
                    }
                }
                ws.qtRow--
            } else {
                ws.inSave = false;
                Alert.alert( 'AVISO' , 'Não é possível excluir a primeira linha de setores!' );
            }                
        }
        if ( ws.inSave ) {
            this.setState({ ...ws.gdState })
            this.validSectorActive()
        }
    };
    
    /*===========================================================
    /*             INCLUSÃO E EXCLUSÃO DE COLUNAS
    ===========================================================*/
    configCol = o => {
        console.debug('*** Função: configCol ***')
        console.debug("Parametros => o: ", o);
        ws.gdState = this.state
        this.verifyRowColActive(false);
        ws.inSave = true
        if ( ws.rowSel >= 1 && ws.rowSel <= 3 ) {
            let qtCol = 0
            switch (ws.rowSel) {
                case 1: { qtCol = ws.qtCol1; break; }
                case 2: { qtCol = ws.qtCol2; break; }
                case 3: { qtCol = ws.qtCol3; break; }
            }
            if ( o == '+') {
                if ( qtCol < 3 ) {
                    qtCol++
                    switch (ws.rowSel) {
                        case 1: { 
                            ws.qtCol1 = qtCol;
                            switch (ws.qtCol1) {
                                case 2: { ws.gdState.rows.row1.col2.active = true; break; }                               
                                case 3: { ws.gdState.rows.row1.col3.active = true; break; }
                            }
                            break; 
                        }
                        case 2: { 
                            ws.qtCol2 = qtCol;
                            switch (ws.qtCol2) {
                                case 2: { ws.gdState.rows.row2.col2.active = true; break; }                               
                                case 3: { ws.gdState.rows.row2.col3.active = true; break; }
                            }
                            break; 
                        }
                        case 3: { 
                            ws.qtCol3 = qtCol;
                            switch (ws.qtCol3) {
                                case 2: { ws.gdState.rows.row3.col2.active = true; break; }                               
                                case 3: { ws.gdState.rows.row3.col3.active = true; break; }
                            }
                            break; 
                        }
                    }
                } else {
                    ws.inSave = false;
                    Alert.alert( 'AVISO' , 'Não é possível incluir mais de 3 colunas na linha de setores!' );                
                }
            }
            if ( o == '-') {
                if ( qtCol > 1 ) {
                    qtCol--
                    switch (ws.rowSel) {
                        case 1: { 
                            ws.qtCol1 = qtCol;
                            switch (ws.qtCol1) {
                                case 1: { ws.gdState.rows.row1.col2.active = false; break; }                               
                                case 2: { ws.gdState.rows.row1.col3.active = false; break; }
                            }
                            break; 
                        }
                        case 2: { 
                            ws.qtCol2 = qtCol;
                            switch (ws.qtCol2) {
                                case 1: { ws.gdState.rows.row2.col2.active = false; break; }                               
                                case 2: { ws.gdState.rows.row2.col3.active = false; break; }
                            }
                            break; 
                        }
                        case 3: { 
                            ws.qtCol3 = qtCol;
                            switch (ws.qtCol3) {
                                case 1: { ws.gdState.rows.row3.col2.active = false; break; }                               
                                case 2: { ws.gdState.rows.row3.col3.active = false; break; }
                            }
                            break; 
                        }
                    }
                } else {
                    ws.inSave = false;
                    Alert.alert( 'AVISO' , 'Não é possível excluir a única coluna da linha de setores!' );                
                }
            }
        } else {
            ws.inSave = false
            Alert.alert( 'AVISO' , 'Selecione um setor da linha em que deseja incluir/excluir colunas!' );
        }
        if ( ws.inSave ) {
            this.setState({ ...ws.gdState })
            this.validSectorActive()
        }
    };

    /*===========================================================
    /*              EDICAO DO NOME/QTDE DO SETOR
    ===========================================================*/
    editSector = () => {
        console.debug('*** Função: editSector ***')
        ws.gdState = this.state
        ws.nameSector = '';
        ws.maximumSector = 999;
        switch (this.state.selected) {
            case 'L1C1': { ws.nameSector    = this.state.rows.row1.col1.name;
                           ws.maximumSector = this.state.rows.row1.col1.maximum; break; }
            case 'L1C2': { ws.nameSector    = this.state.rows.row1.col2.name;
                           ws.maximumSector = this.state.rows.row1.col2.maximum; break; }
            case 'L1C3': { ws.nameSector    = this.state.rows.row1.col3.name;
                           ws.maximumSector = this.state.rows.row1.col3.maximum; break; }
            case 'L2C1': { ws.nameSector    = this.state.rows.row2.col1.name;
                           ws.maximumSector = this.state.rows.row2.col1.maximum; break; }
            case 'L2C2': { ws.nameSector    = this.state.rows.row2.col2.name;
                           ws.maximumSector = this.state.rows.row2.col2.maximum; break; }
            case 'L2C3': { ws.nameSector    = this.state.rows.row2.col3.name;
                           ws.maximumSector = this.state.rows.row2.col3.maximum; break; }
            case 'L3C1': { ws.nameSector    = this.state.rows.row3.col1.name;
                           ws.maximumSector = this.state.rows.row3.col1.maximum; break; }
            case 'L3C2': { ws.nameSector    = this.state.rows.row3.col2.name;
                           ws.maximumSector = this.state.rows.row3.col2.maximum; break; }
            case 'L3C3': { ws.nameSector    = this.state.rows.row3.col3.name;
                           ws.maximumSector = this.state.rows.row3.col3.maximum; break; }
        }
        ws.maximumText = ws.maximumSector.toString();
        console.debug('ws.nameSector........:' + ws.nameSector)
        console.debug('ws.maximumSector.....:' + ws.maximumSector)
        console.debug('ws.maximumText.......:' + ws.maximumText)
        this.setState({ showEdit: true })
    }

    handleName = (text) => {
        console.debug('*** Função: handleName ***')
        ws.nameSector = text;
        console.debug('ws.nameSector........:' + ws.nameSector)
    }

    handleMaximum = (text) => {
        console.debug('*** Função: handleMaximum ***')
        ws.maximumText = text;
        console.debug('ws.maximumText.......:' + ws.maximumText)
    }

    saveEdit = () => {
        console.debug('*** Função: saveEdit ***')
        ws.gdState = this.state
        console.debug('ws.nameSector........:' + ws.nameSector)
        console.debug('ws.maximumText.......:' + ws.maximumText)
        ws.maximumSector = parseInt(ws.maximumText)
        switch (ws.gdState.selected) {
            case 'L1C1': { ws.gdState.rows.row1.col1.name    = ws.nameSector; 
                           ws.gdState.rows.row1.col1.maximum = ws.maximumSector; break; }
            case 'L1C2': { ws.gdState.rows.row1.col2.name    = ws.nameSector; 
                           ws.gdState.rows.row1.col2.maximum = ws.maximumSector; break; }
            case 'L1C3': { ws.gdState.rows.row1.col3.name    = ws.nameSector; 
                           ws.gdState.rows.row1.col3.maximum = ws.maximumSector; break; }
            case 'L2C1': { ws.gdState.rows.row2.col1.name    = ws.nameSector; 
                           ws.gdState.rows.row2.col1.maximum = ws.maximumSector; break; }
            case 'L2C2': { ws.gdState.rows.row2.col2.name    = ws.nameSector; 
                           ws.gdState.rows.row2.col2.maximum = ws.maximumSector; break; }
            case 'L2C3': { ws.gdState.rows.row2.col3.name    = ws.nameSector; 
                           ws.gdState.rows.row2.col3.maximum = ws.maximumSector; break; }
            case 'L3C1': { ws.gdState.rows.row3.col1.name    = ws.nameSector; 
                           ws.gdState.rows.row3.col1.maximum = ws.maximumSector; break; }
            case 'L3C2': { ws.gdState.rows.row3.col2.name    = ws.nameSector; 
                           ws.gdState.rows.row3.col2.maximum = ws.maximumSector; break; }
            case 'L3C3': { ws.gdState.rows.row3.col3.name    = ws.nameSector; 
                           ws.gdState.rows.row3.col3.maximum = ws.maximumSector; break; }
        }
        console.debug('ws.maximumSector.....:' + ws.maximumSector)
        ws.gdState.showEdit = false;
        this.setState({ ...ws.gdState })
    }

    cancelEdit = () => {
        console.debug('*** Função: cancelEdit ***')
        this.setState({ showEdit: false })
    }

    /*===========================================================
    /*            RESETA A CONFIGURAÇÃO (stateInitial)
    ===========================================================*/
    resetConfig = () => {
        console.debug('*** Função: resetConfig ***')
        this.setState({ ...ws.saveState }, () => this.verifyRowColActive(false) ); 
    }

    /*===========================================================
    /*             RENDERIZAÇÃO DA TELA DE CONFIG
    ===========================================================*/
    render() {
        return (
            <View style={styles.container}>

                {/*=================================================
                **               EDICAO DADOS DO SETOR
                ***==============================================*/}
                { this.state.showEdit ?
                    <View style={styles.footerEdit}>
                        <View style={styles.footerEditText}>
                            <Text style={styles.titleEdit}>DADOS DO SETOR {this.state.selected}</Text>
                        </View>
                        <View style={styles.footerEditInput}>
                            <Text style={styles.inputLabel}>Nome</Text>
                            <TextInput style={styles.inputText}
                                maxLength = {10} 
                                placeholder = {ws.nameSector}
                                onChangeText ={(text)=> this.handleName(text)} 
                            />
                            <Text style={styles.inputLabel}>Quantidade máxima</Text>
                            <TextInput style={styles.inputText}
                                keyboardType = 'numeric'
                                maxLength = {3} 
                                placeholder = {ws.maximumText}
                                onChangeText = {(text)=> this.handleMaximum(text)}
                            />
                        </View>
                        <View style={styles.footerEditButtom}>
                            <Botao title='C' onClick={this.cancelEdit} red icon="close" />
                            <Botao title='S' onClick={this.saveEdit} blue icon="check" />
                        </View>
                    </View>            
                :
                    null
                }

                {/*=================================================
                **             HEADER DA TELA DE CONFIG
                ***==============================================*/}
                { !this.state.showEdit ?
                    <View style={styles.configHeader}>
                        <Text>Configuração do Aplicativo</Text>
                        <Text>Minimo: 1 setor  Máximo: 9 Setores (3x3)</Text>
                    </View>
                :
                    null
                }

                {/*=================================================
                **                MAPA DOS SETORES
                ***==============================================*/}
                { !this.state.showEdit ?
                    <View style={styles.containerMapa}>
                        <View style={styles.mapa}>
                            { this.state.showMap ?
                                <Mapa rows={this.state.rows}
                                        config={true} 
                                        selected={this.state.selected} 
                                        onClick={this.selectSetor} 
                                />
                                : null
                            }
                        </View>
                        <View style={styles.configCol}>
                                <Botao title='-' onClick={this.configCol} red icon="remove" />
                                <Botao title='+' onClick={this.configCol} blue icom="add" />
                        </View>
                    </View>
                :
                    null
                }

                {/*=================================================
                **            BOTOES DO RODAPE DO CONFIG
                ***==============================================*/}
                { !this.state.showEdit ?
                    <View style={styles.footerButton}>
                        <View style={styles.footerRow}>
                            <View style={styles.buttonConfigRow}>
                                <Botao title='-' onClick={this.configRow} yellow icon="remove" />
                                <Botao title='+' onClick={this.configRow} yellow icon="add" />
                            </View>
                            <View style={styles.buttonEdit}>
                                <Botao title='E' onClick={this.editSector} blue icon="create" />
                            </View>
                        </View>
                        <View style={styles.footerRow}>
                            <View style={styles.buttonReset}>
                                <Botao title='D' onClick={this.resetConfig} blue icon="delete" />
                            </View>
                            <View style={styles.buttonSave}>
                                <Botao title='S' onClick={this.configSave} blue icon="save" name="Salvar" />
                            </View>
                        </View>
                    </View>            
                :
                    null
                }

            </View>
        );
    }
}

export default ConfigScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backScreen,
    },

    configHeader: {
        flex: 2,
        backgroundColor: color.backScreen,
        justifyContent: 'center',
        alignItems: 'center',   
    },



    /*========================================================================*/


    containerMapa: {
        flex: 8,
        flexDirection: 'row',
        backgroundColor: color.backScreen,
    },
    mapa: {
        flex: 8,
        marginVertical: 5,
        marginHorizontal: 7,
        backgroundColor: color.backScreen,
    },
    configRow: {
        flex: 2,
        backgroundColor: color.backScreen,
    },
    configCol: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',        
        backgroundColor: color.backScreen,
    },





    /*---------------------------------------------- 
                BOTOES DA TELA DE CONFIG
    ----------------------------------------------*/
    footerButton: {
        flex: 4,
        backgroundColor: color.backScreen,
    },





    footerRow: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: color.backScreen,
    },
    buttonConfigRow: {
        flex: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',                
    },
    buttonEdit: {
        flex: 19,
        justifyContent: 'space-between',                
    },
    buttonReset: {
        flex: 19,
        justifyContent: 'space-between',                
    },
    buttonSave: {
        flex: 80,
        justifyContent: 'space-between',                
    },



    viewEdit: {
        flex: 1,
        justifyContent: 'space-between',                
    },


    /*---------------------------------------------- 
                BOTOES DA TELA DE EDICAO
    ----------------------------------------------*/
    footerEdit: {
        flex: 1,
        backgroundColor: color.backScreen,
    },
    footerEditText: {
        marginTop: 6,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.backScreen,
    },
    footerEditInput: {
        flex: 8,
        margin: 10,
        backgroundColor: color.backScreen,
    },
    inputLabel: {
        marginTop: 4,
        marginLeft: 8,
        fontSize: 16,
        color: '#ffffff',
    },
    inputText: {
        fontSize: 24,
        marginHorizontal: 5,
        height: 46,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: '#ffffff',
    },
    titleEdit: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerEditButtom: {
        flex: 1,
        minHeight: 46,
        backgroundColor: color.backScreen,
        flexDirection: 'row',
        justifyContent: 'space-between',                
    },
})  