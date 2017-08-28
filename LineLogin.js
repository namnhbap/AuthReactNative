import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {LoginManager} from 'react-native-line-login'
import {UserLine} from "./UserLine";

export default class LineLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: new UserLine()
        }
    }

    _getDisplayName = () => {
        LoginManager.getUserProfile()
            .then((profile) => {
                console.log(profile);
                let user = new UserLine();
                user.id = profile.mid;
                user.name = profile.displayName;
                this.setState({user})
            });
    }

    _lineAuth = () => {
        LoginManager.login()
            .then((result) => {
                console.log(result);
                this._getDisplayName();
                this.setState({
                    isLoggedIn: true,
                });
            })
            .catch((err) => {
                console.log(err);
                alert('Error')

            })
    }

    _logOut = () => {
        this.setState({isLoggedIn: false});
        LoginManager.logout()
    }

    loginButton() {
        return (
            <TouchableOpacity onPress={this._lineAuth}>
                <Text style={styles.LineLogin}>Login with Line</Text>
            </TouchableOpacity>
        );
    }

    logoutButton() {
        return (
            <TouchableOpacity onPress={this._logOut}>
                <Text style={styles.LineLogin}>Logout</Text>
            </TouchableOpacity>
        );
    }

    infomation = (id, name) => {
        return (
            <View style={{marginTop: 10}}>
                <Text>ID: {id}</Text>
                <Text>Name: {name}</Text>
            </View>
        );
    };

    render() {
        const {isLoggedIn, user} = this.state;
        let buttonLine = null;
        let viewName = null;
        if (isLoggedIn) {
            buttonLine = this.logoutButton();
            viewName = this.infomation(user.id, user.name)
        } else {
            buttonLine = this.loginButton();
            viewName = null;
        }
        return (
            <View style={styles.Container}>
                {viewName}
                {buttonLine}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    LineLogin: {
        textAlignVertical: 'center',
        height: 30,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#41c000',
        fontSize: 14,
        color: 'white',
        borderRadius: 3,
        fontWeight: 'bold'
    }
});