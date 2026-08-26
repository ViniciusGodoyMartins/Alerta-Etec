import { StatusBar } from 'expo-status-bar';
import {Alert,KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {ChoiceChip} from './src/components/ChoiceChip';
import { buildMessage, formatPhone, isValidBrazilianPhone, Occurrence, onlyDigits, smsUrl } from './src/utils/contact';
import { useState } from 'react';

const occurrence: Occurrence[] = [
    'Atraso no tranporte',
    'Problema no trajeto',
    'Consulta médica',
    'Problemas pessoais',
    'Outro'
];

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occurrenceSelected, setOccurrenceSelected] = useState<Occurrence>('Atraso no Transporte');
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});