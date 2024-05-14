import '@react-native-firebase/app';
import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HelperText } from 'react-native-paper';
import styles from '../src/styles/styles';
import { login, useMyContextController } from './store/Index'


export default function LoginScreen({ navigation }) {
    const [errorEmail, setErrorEmail] = React.useState('');
    const [errorPassword, setErrorPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [controller, dispatch] = useMyContextController()
    const [pass, setPass] = React.useState('');
    const { userLogin } = controller;

    React.useEffect(() => {
        if (userLogin != null) {
            navigation.navigate('Home');
        }
        console.log(userLogin);
    }, [navigation, userLogin]);

    const handleLogin = () => {
        let regEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regEmail)) {
            setErrorEmail('Invalid Email Address');
        } else if (password.length < 6) {
            setErrorPassword('Password need 6 keywords or more');
        } else login(dispatch, email, password);
    };


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../src/Image/LOGO.jpg')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    value={email}
                    onChangeText={setEmail}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {errorEmail && <HelperText type="error">{errorEmail}</HelperText>}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {errorPassword && <HelperText type="error">{errorPassword}</HelperText>}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate('Register')} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}