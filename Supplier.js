import React from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title,
  Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      supplierName: '',
      supplierAddress: '',
      supplierCity: '',
      countryCode: '',
      supplierDate: '',
      supplierInfo: {},
      isReady: false

    }
    this.createSupplier = this.createSupplier.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  createSupplier() {
    const { supplierName, supplierAddress, supplierCity, countryCode, supplierDate }  = this.state ;
    axios.post('https://visa-app.herokuapp.com/supplier', {
      supplierName: supplierName,
      supplierAddressLine1: supplierAddress,
      supplierCity: supplierCity,
      supplierCountryCode: countryCode,
      supplierDate: supplierDate,
    })
    .then((response) => {
      this.setState({ supplierInfo: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }




  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }


    const { supplierInfo } = this.state;
    return (
      <Container>
      <Header>
      <Body style={{ flex: 1, alignItems:'center'}}>
        <Title>Supplier</Title>
      </Body>
      </Header>
      <Content>

        <View>
        <View style={styles.container}>
        <Text style={styles.accountDetailsText}> Get Suppliers </Text>
          <Text style={styles.labelText}>Client Id</Text>
            <TextInput value={"B2BWS_1_1_9999"}
            editable={false}
            selectTextOnFocus={false}
            placeholder="Client Id"
            style={styles.inputText}
            />
            <Text style={styles.labelText}>Supplier Name</Text>
            <TextInput
            onChangeText={supplierName => this.setState({supplierName})}
            placeholder="Supplier Name"
            style={styles.inputText}
            />
            <Text style={styles.labelText}>Supplier Address</Text>
          <TextInput
          onChangeText={supplierAddress => this.setState({supplierAddress})}
          placeholder="Supplier Address"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Supplier City</Text>
          <TextInput
          onChangeText={supplierCity => this.setState({supplierCity})}
          placeholder="Supplier City e.g LG"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Country Code</Text>
        <TextInput
        onChangeText={countryCode => this.setState({countryCode})}
        placeholder="Country Code e.g NGA"
        style={styles.inputText}
        />
        <Text style={styles.labelText}>Supplier Date</Text>
        <TextInput
          onChangeText={supplierDate => this.setState({supplierDate})}
          placeholder="Supplier Date e.g MMDDYYYY"
          style={styles.inputText}
        />
          <Button onPress={this.createSupplier}
          primary style={styles.formButton}>
            <Text>Get Account Details</Text>
          </Button>
        { (Object.keys(supplierInfo).length > 0  && supplierInfo != undefined) ?
          <View style={styles.result}>
          <Text>Message ID: {supplierInfo.messageId}</Text>
          <Text>Status Code: {supplierInfo.statusCode}</Text>
          <Text>Status Description: {supplierInfo.statusDesc}</Text>
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
