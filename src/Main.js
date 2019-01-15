import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Spinner } from 'native-base';
import steem from 'steem';

export default class Main extends Component {

  state = {
    ready: false,
    profile: {}
  }

  componentWillMount() {
    steem.api.getAccountsAsync(['anpigon']).then(result => {
      if(result && result.length) {
        console.log(result);
        const [ account ] = result;
        const { profile } = JSON.parse(account.json_metadata);
        this.setState({
          ready: true,
          profile
        })
        
      }
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{justifyContent:'center', alignItems:'center'}}>
          {
            this.state.ready 
            ?
            <Text>
              { 
                JSON.stringify(this.state.profile, 1, 1) 
              }
            </Text>
            :
            <Spinner />
          }
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}