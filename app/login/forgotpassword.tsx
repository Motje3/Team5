import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';


export default function ForgotPassword() {
    const router = useRouter();
    const { accentColor } = useApp();

    const [email, setEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');

    // hardware back → login
    useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        router.replace('/login');
        return true;
    });
    return () => sub.remove();
    }, [router]);

    const submit = async () => {
    if (!email || !newPass || newPass !== confirm) {
        return Alert.alert('Controleer je invoer', 'Vul e-mail in en 2x hetzelfde nieuw wachtwoord');
    }
    try {
        const res = await fetch('http://192.168.1.198:5070/api/PasswordReset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: newPass }),
        });
        if (!res.ok) throw new Error();
        Alert.alert('Verzoek ingediend', 'De administrator zal je wachtwoord aanpassen.');
        router.replace('/login');
    } catch {
        Alert.alert('Fout', 'Kon verzoek niet versturen');
    }
    };

}