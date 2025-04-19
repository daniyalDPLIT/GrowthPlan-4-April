
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import Button from '../../component/button';
import { MediumText, SmallText } from '../../component/text';
import styles from './styles';

import { View as AnimatedView } from 'react-native-animatable';
import TextFInput from '../../component/input';
import { AppColors } from '../../utils/colors';
const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
interface List {
    id: number,
    number: number,
    title: string,
    cover: string
}
const App = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [interactiveObjects, setInteractiveObjects] = useState<List[]>([])

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true)
            setError(null);
            fetch('https://potterapi-fedeperin.vercel.app/en/books').then((response) => {
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
                return response.json()
            }).then((data) => {
                setInteractiveObjects(data);
                setLoading(false);

            }).catch((error) => {
                setError(error.message);
                setLoading(false);
            })
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
            setInteractiveObjects([]);
        }
        return () => {
            if (socket) {
                socket.close();// socket close on loggout
            }
        }
    }, [isLoggedIn])

    //seperate UseEffect for readable code for socket impelmenetation
    useEffect(() => {
        console.log(isLoggedIn && interactiveObjects?.length > 0, 'om here');
        if (isLoggedIn && interactiveObjects?.length > 0) {
            const ws = new WebSocket('wss://echo.websocket.events'); //socket connection
            ws.onopen = () => {
                console.log('connected');
                setSocket(ws);
            };
            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data); // socket data 
                    if (message && message.id && typeof message.interactionCount === 'number') {
                        setInteractiveObjects(prevObjects => prevObjects.map(obj => obj.id === message.id ? { ...obj, number: message.interactionCount } : obj));
                    }
                } catch (error) {
                }
            }
            ws.onerror = (error) => { console.error('WebSocket error:', error); };
            ws.onclose = () => { console.log('WebSocket disconnected'); setSocket(null); };
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }

        return () => {
            if (socket) {
                socket.close();
            }
        }
    }, [isLoggedIn, interactiveObjects])

    //custom animation
    const fadeIn = {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    };

    // Below is validation code for authentication
    const validation = () => {
        if (email === '') {
            //show alert on invalid fields
            Alert.alert('Email is requried', 'Email is requried to login.')
        }
        else if (!emailRegex.test(email)) {
            Alert.alert('Email is invalid', 'Email format is invalid.')

        }
        else if (password === '') {
            Alert.alert('Password is requried', 'Password is requried to login.')

        }
        else if (!passwordRegex.test(password)) {
            Alert.alert('Password is invalid', 'Password must be minimum eight characters, at least one letter, one number and one special character:')

        }
        else {
            setLoading(true)
            setTimeout(() => {
                setIsLoggedIn(true)
                setLoading(false)
            }, 3000);
        }

    }
    const _renderItem = ({ item, index }: { item: List, index: number }) => {
        return (
            <AnimatedView animation={fadeIn}//custom animation
                key={index} style={styles.interecationItem}>
                <Image source={{ uri: item?.cover }} resizeMode='cover' style={styles.cover} />
                <View style={styles.innerContent}>
                    <MediumText fontWeight='normal'>Title: {item?.title}</MediumText>
                    <AnimatedView key={item?.number} animation={'slideInDown'} //counter animation
                    >
                        <SmallText>Current InteractionCoun: {item?.number}</SmallText>    {/*interecation counter */}
                    </AnimatedView>
                </View>
            </AnimatedView>
        )
    }

    //conditional rendering of UI based on Login state
    if (!isLoggedIn) {
        return (<View style={styles.container}>
            <View style={styles.header}>
                <MediumText size={6} color={AppColors.white} fontWeight='bold' >{isLoggedIn ? 'Objects' : "Login"}</MediumText>
            </View>
            <AnimatedView //Animation for input Fields
                useNativeDriver={true}
                animation={'slideInLeft'} style={styles.inputContainer}>
                <TextFInput label='Email' value={email} onChange={setEmail} />
                <TextFInput label='Password' value={password} onChange={setPassword} />
                {
                    loading ?
                        <View style={styles.loaderContainer}>

                            <ActivityIndicator // loader aniamtion for login
                                size={'small'} color={AppColors.orange40} />
                        </View>
                        : <Button containerStyle={styles.button} onPress={validation}>Login</Button>

                }
            </AnimatedView>
        </View>)
    }
    else
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <MediumText size={6} color={AppColors.white} fontWeight='bold' >{'Listing'}</MediumText>
                </View>
                <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={styles.logout}>
                    <SmallText color={AppColors.white}>Logout</SmallText>
                </TouchableOpacity>
                {
                    loading ?
                        <ActivityIndicator // loader aniamtion for object
                            size={'small'} color={AppColors.orange40} />
                        : <FlatList
                            data={interactiveObjects}
                            renderItem={_renderItem}
                            contentContainerStyle={styles.flatListContainer}
                            ListEmptyComponent={() => {
                                return (
                                    <View>
                                        <SmallText color={AppColors.red} >{error ?? 'No content found'}</SmallText>
                                    </View>
                                )
                            }}
                        />
                }
            </View>
        )

}
export default App