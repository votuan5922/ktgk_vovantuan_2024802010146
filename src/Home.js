import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, List } from 'react-native-paper';
import { addJod, fetchjob, logout, useMyContextController } from './store/Index';
import { log } from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [newJob, setNewJob] = React.useState('');
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [jobLst, setJobLst] = React.useState([]);
    const [jobId, setJobId] = React.useState(0);
    const ref = firestore().collection('JOBS').orderBy('idJob', 'asc');
    useEffect(() => {
        if (userLogin == null) navigation.navigate('Login');
        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, idJob } = doc.data();
                list.push({
                    id: doc.id,
                    idJob,
                    title,
                });
            });
            setJobLst(list);
            AsyncStorage.getItem('jobId').then(value => {
                if (value !== null) {
                    setJobId(parseInt(value));
                }
            });
        });
    }, [navigation, userLogin]);

    const handleLogout = () => {
        logout(dispatch);
    };

    const Divider = () => {
        return <View style={styles.divider} />;
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button textColor="#000" onPress={handleLogout}>
                    Logout
                </Button>
            ),
        });
    });
    //   const [id, setID] = React.useState(0);
    const handleAddJob = () => {
        // setJobId(prevJobId => prevJobIdx + 1);
        const nextJobId = jobId + 1;

        addJod(jobId, newJob);

        setJobId(nextJobId);
        AsyncStorage.setItem('jobId', nextJobId.toString());
        // setJobId(jobId + 1);
    };
    const renderItem = ({ item }) => {
        return (
            <List.Item
                titleStyle={{ fontSize: 20 }}
                title={item.idJob + '. ' + item.title}
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <TextInput
                    label={'New job'}
                    value={newJob}
                    onChangeText={setNewJob}
                    underlineColor="#fff"
                    style={{ width: 300, marginRight: 10, backgroundColor: '#fff' }}
                />
                <Button
                    style={{
                        borderRadius: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        borderRadius: 5,
                    }}
                    mode="contained"
                    onPress={handleAddJob}>
                    Add
                </Button>
            </View>
            <FlatList
                style={{ padding: 20 }}
                data={jobLst}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: 'grey',
    },
});