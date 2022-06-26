import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


class HelpScreen extends Component {



    static navigationOptions = {
      title: 'Help',
    };
    render() {

      const { navigation } = this.props;
      const parmPass = navigation.getParam('parmPass', 'parm???');
      console.debug('parmPass...: ' + JSON.stringify(parmPass))
      
    
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Help Screen Nova: {JSON.stringify(parmPass)}</Text>

        <Button
        title="Go to Home"
        onPress={() => this.props.navigation.navigate('Home', { inParamSent: 'S'} )}
        />

        </View>
      );
    }
}

export default HelpScreen
  
