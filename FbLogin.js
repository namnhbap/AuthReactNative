import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Image
} from 'react-native';
import FBSDK, {LoginManager} from 'react-native-fbsdk';
import {User} from "./User";
import LineLogin from "./LineLogin";

const {
    LoginButton,
    AccessToken,
} = FBSDK;

export default class FbLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: new User()
        }
    }

    _fbAuth = () => {
        let temp = this;
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log('Token-' + data.accessToken);
                            temp._initUser(data.accessToken);
                        }
                    )
                }
            }, function (error) {
                alert('An error: ' + error);
            })
    }

    _initUser = (accessToken) => {
        console.log('------------------------------');
        console.log('init user');
        fetch('https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token=' + accessToken)
            .then((response) => response.json())
            .then((json) => {
                // Some user object has been set up somewhere, build that user here
                let user = new User();
                user.id = json.id;
                user.name = json.name;
                user.email = json.email;
                user.image = `https://graph.facebook.com/${json.id}/picture?return_ssl_resources=1`
                this.setState({
                    isLoggedIn: true,
                    user: user
                });
            })
            .catch(() => {
                alert('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    _logOut = () => {
        this.setState({
            isLoggedIn: false,
            user: new User()
        });
        LoginManager.logOut()
    }

    render() {
        const {isLoggedIn, user} = this.state;
        let buttonFacebook = null;
        let viewInfo = null;
        if (isLoggedIn) {
            buttonFacebook = this._logoutButton();
            viewInfo = this._information(user)
        } else {
            buttonFacebook = this._loginButton();
            viewInfo = null;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: user.image}}
                />
                {viewInfo}
                {buttonFacebook}
                <LineLogin/>
            </View>
        );
    }

    _logoutButton() {
        return (
            <TouchableOpacity onPress={this._logOut}>
                <Text style={styles.FacebookLogin}>Logout</Text>
            </TouchableOpacity>
        );
    }

    _loginButton() {
        return (
            <TouchableOpacity onPress={this._fbAuth}>
                <Text style={styles.FacebookLogin}>Login with Facebook</Text>
            </TouchableOpacity>
        );
    }

    _information = (user) => {
        return (
            <View>
                <Text>ID: {user.id}</Text>
                <Text>Name: {user.name}</Text>
                <Text>Email: {user.email}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    FacebookLogin: {
        textAlignVertical: 'center',
        height: 30,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#3b5998',
        fontSize: 14,
        color: 'white',
        borderRadius: 3,
        fontWeight: 'bold',
        marginVertical: 20
    }
});


//Login Facebook Button
{/*<LoginButton*/
}
{/*readPermissions={['public_profile', 'email']}*/
}
{/*onLoginFinished={*/
}
{/*(error, result) => {*/
}
{/*if (error) {*/
}
{/*alert("login has error: " + result.error);*/
}
{/*} else if (result.isCancelled) {*/
}
{/*alert("login is cancelled.");*/
}
{/*} else {*/
}
{/*AccessToken.getCurrentAccessToken().then(*/
}
{/*(data) => {*/
}
{/*console.log('Token-' + data.accessToken);*/
}
{/*this._initUser(data.accessToken)*/
}
{/*}*/
}
{/*)*/
}
{/*}*/
}
{/*}*/
}
{/*}*/
}
{/*onLogoutFinished={() => {*/
}
{/*let user = new User();*/
}
{/*this.setState({user})*/
}
{/*}}/>*/
}