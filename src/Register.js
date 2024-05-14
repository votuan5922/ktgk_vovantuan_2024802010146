import '@react-native-firebase/app';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HelperText } from 'react-native-paper';
import styles from '../src/styles/styles';
import { signup } from './store/Index';

export default function RegistrationScreen({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [fullname, setFullname] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const [errorPassword, setErrorPassword] = React.useState('');
    const [errorFullname, setErrorFullname] = React.useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState('');
    const handleCreateAccount = () => {
        let regEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regEmail)) {
            setErrorEmail('Mật khẩu chưa đúng định dạng');
        } else if (fullname === '') {
            setErrorFullname('Vui lòng điền thông tin');
        } else if (password.length < 6) {
            setErrorPassword('Mật khẩu phải trên 6 kí tự');
        } else if (confirmPassword !== password) {
            setErrorConfirmPassword('Mật khẩu không trùng khớp');
        } else {
            signup(email, password, fullname)

        };
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
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    value={fullname}
                    onChangeText={setFullname}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {errorFullname && <HelperText type="error">{errorFullname}</HelperText>}
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
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {errorConfirmPassword && (
                    <HelperText type="error">{errorConfirmPassword}</HelperText>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateAccount}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text onPress={() => navigation.navigate('Login')} style={styles.footerText}>Already got an account? Sign up</Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}