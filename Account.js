import React from 'react';
import { StyleSheet, View, Alert, Dimensions } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title,
  Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      accountInfo: [],
      isReady: false

    }
    this.getAccountDetails = this.getAccountDetails.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  getAccountDetails(){
    axios.post('https://visa-app.herokuapp.com/account')
    .then((response) => {
      this.setState({ accountInfo: response.data.accountDetails });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    const AccountInformation = this.state.accountInfo[0];
    return (
      <Container>
      <Header>
      <Body style={{ flex: 1, alignItems:'center'}}>
        <Title>Account</Title>
      </Body>
      </Header>
      <Content>
      <View>
        <View style={styles.container}>
        <Text style={styles.accountDetailsText}> Account Details </Text>
        <Form>
          <Button onPress={this.getAccountDetails}
          primary style={styles.formButton}>
            <Text>Get Account Details</Text>
          </Button>
        </Form>
        { (AccountInformation != undefined || AccountInformation != null ) ?
        <View style={styles.result}>
        <Text>Account Number: {AccountInformation.accountNumber}</Text>
        <Text>Description: {AccountInformation.description}</Text>
        <Text>Expiration Date: {AccountInformation.expirationDate}</Text>
        </View>: null
        }
        </View>
        </View>
      </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200
  },

  result: {
    marginTop: 25,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#007bff',
  },

  formButton: {
    top: '5%',
    left: (Dimensions.get('window').width / 4) + 10
  },
  accountDetailsText: {
    fontSize: 30,
    left: (Dimensions.get('window').width / 4) - 10
  }
});
