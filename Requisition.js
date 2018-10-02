import React from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title,
  Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      firstName: '',
      lastName: '',
      employeeId: '',
      requisitionInfo: {},
      isReady: false,
    }

    this.getRequisition = this.getRequisition.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  getRequisition() {
    const { firstName, lastName, employeeId }  = this.state ;
    axios.post('https://visa-app.herokuapp.com/requisition', {
      firstName: firstName,
      lastName: lastName,
      employeeId: employeeId
    })
    .then((response) => {
      console.log(response.data);
      this.setState({ requisitionInfo: response.data })
    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    const { requisitionInfo } = this.state;
    return (
      <Container>
      <Header>
      <Body style={{ flex: 1, alignItems:'center'}}>
        <Title>Requisition</Title>
      </Body>
      </Header>
      <Content>

        <View>
        <View style={styles.container}>
        <Text style={styles.accountDetailsText}> Requisition </Text>
            <Text style={styles.labelText}>Client Id</Text>
            <TextInput value={"RESTAPISupp-007"}
            editable={false}
            selectTextOnFocus={false}
            style={styles.inputText}
            />
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
            onChangeText={firstName => this.setState({firstName})}
            placeholder="First Name"
            style={styles.inputText}
            />
          <Text style={styles.labelText}>Last Name</Text>
          <TextInput
          onChangeText={lastName => this.setState({lastName})}
          placeholder="Last Name"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Employee ID</Text>
          <TextInput
          onChangeText={employeeId => this.setState({employeeId})}
          placeholder="Employee ID e.g AB123"
          style={styles.inputText}
          />
          <Button onPress={this.getRequisition}
          primary style={styles.formButton}>
            <Text>Get Requisition</Text>
          </Button>
        { ( Object.keys(requisitionInfo).length > 0 && requisitionInfo.constructor === Object && requisitionInfo != undefined) ?
          (<View style={styles.result}>
          <Text>Message ID: {requisitionInfo.messageId}</Text>
          <Text>Requisition ID: {requisitionInfo.requisitionId}</Text>
          <Text>Account Number: {requisitionInfo.accountNumber}</Text>
          <Text>Expiration Date: {requisitionInfo.expirationDate}</Text>
          <Text>Requisition Description: {"Virtual Card Requisition request processed successfully"}</Text>
          </View>): null
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
