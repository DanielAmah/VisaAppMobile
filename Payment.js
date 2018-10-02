import React from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title,
  Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      accountNumber: '',
      accountType: '',
      cardAccountExpiryDate: '',
      paymentGrossAmount: '',
      currencyCode: '',
      paymentInfo: {},
      isReady: false,

    }
    this.makePayments = this.makePayments.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  makePayments() {
    const { accountNumber, accountType, cardAccountExpiryDate, paymentGrossAmount, currencyCode }  = this.state ;
    axios.post('https://visa-app.herokuapp.com/payment', {
      accountNumber: accountNumber,
      accountType: accountType,
      cardAccountExpiryDate: cardAccountExpiryDate,
      paymentGrossAmount: paymentGrossAmount,
      currencyCode: currencyCode
    })
    .then((response) => {
      console.log(response.data);
      this.setState({ paymentInfo: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    const { paymentInfo } = this.state;
    return (
      <Container>
      <Header>
      <Body style={{ flex: 1, alignItems:'center'}}>
        <Title>Payment</Title>
      </Body>
      </Header>
      <Content>
        <View>
        <View style={styles.container}>
        <Text style={styles.accountDetailsText}> Payments </Text>
          <Text style={styles.labelText}>Supplier Id</Text>
            <TextInput value={"RESTAPISupp-007"}
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputText}
            />
            <Text style={styles.labelText}>Account Number</Text>
            <TextInput
            onChangeText={accountNumber => this.setState({accountNumber})}
            placeholder="Account Number"
            style={styles.inputText}
            />
            <Text style={styles.labelText}>Account Type</Text>
          <TextInput
          onChangeText={accountType => this.setState({accountType})}
          placeholder="Account Type e.g 1 or 2"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Card Account Expiry Date</Text>
          <TextInput
          onChangeText={cardAccountExpiryDate => this.setState({cardAccountExpiryDate})}
          placeholder="Card Account Expiry Date e.g 01/2021"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Payment Gross Account</Text>
        <TextInput
        onChangeText={paymentGrossAmount => this.setState({paymentGrossAmount})}
        placeholder="Payment Gross Account e.g 400"
        style={styles.inputText}
        />
        <Text style={styles.labelText}>Currency Code</Text>
        <TextInput
          onChangeText={currencyCode => this.setState({currencyCode})}
          placeholder="Currency Code e.g USD"
          style={styles.inputText}
        />
          <Button onPress={this.makePayments}
          primary style={styles.formButton}>
            <Text>Make Payments</Text>
          </Button>
        { (paymentInfo != undefined && Object.keys(paymentInfo).length > 0 && requisitionInfo.constructor === Object) ? (
          <View style={styles.result}>
          <Text>Message ID: {paymentInfo.messageId}</Text>
          <Text>Status Code: {paymentInfo.statusCode}</Text>
          <Text>Status Description: {paymentInfo.statusDesc}</Text>
          <Text>Account Number: {paymentInfo.accountNumber}</Text>
          <Text>Expiration Date: {paymentInfo.expirationDate}</Text>
          </View>) : null
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
    // height: 400
    marginBottom: 20
  },

  result: {
    marginTop: 25,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#007bff',
  },

  formButton: {
    top: '5%',
    left: (Dimensions.get('window').width / 4) + 10
  },
  accountDetailsText: {
    fontSize: 30,
    left: (Dimensions.get('window').width / 4) - 10
  },

  inputText: {
    height: 35,
    borderColor: Platform.OS === 'ios' ? 'gray' : 'none',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 'none',
    fontSize: 18,
    marginTop: 5
  },
  labelText: {
    marginTop: 10
  }
});
