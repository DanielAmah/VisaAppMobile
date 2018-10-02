import React from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Footer, FooterTab,
  Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';
import Account from './Account';
import Supplier from './Supplier';
import Payment from './Payment';
import Requisition from './Requisition';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      isReady: false,
      index: 0,

    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  switchScreen(index) {
    this.setState({index: index})
 }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    let AppComponent = null;
    if (this.state.index == 0) {
      AppComponent =  Account
   } else if(this.state.index == 1) {
      AppComponent = Supplier
   }else if(this.state.index == 2) {
    AppComponent = Payment
   }else {
    AppComponent = Requisition
   }

    return (
      <Container>
      <Content style={styles.container}>
        <AppComponent />
      </Content>

      <Footer>
      <FooterTab>
        <Button vertical active={this.state.index == 0}
        onPress={() => this.switchScreen(0)}
        >
          <Icon name="card" />
          <Text>Account</Text>
        </Button>
        <Button vertical active={this.state.index == 1}
        onPress={() => this.switchScreen(1)}
        >
          <Icon name="person" />
          <Text>Supplier</Text>
        </Button>
        <Button vertical active active={this.state.index == 2}
        onPress={() => this.switchScreen(2)}
        >
          <Icon active name="cash" />
          <Text>Payment</Text>
        </Button>
        <Button vertical active={this.state.index == 3}
        onPress={() => this.switchScreen(3)}
        >
          <Icon name="paper" />
          <Text>Request</Text>
        </Button>
      </FooterTab>
    </Footer>

    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  //  height: 500
  },
});
