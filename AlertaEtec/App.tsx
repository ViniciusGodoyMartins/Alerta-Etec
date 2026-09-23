import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    Alert,
    KeyboardAvoidingView, 
    StyleSheet,
    Text,
    TextInput,
    View,
    Linking,
    Platform,
    Pressable,
    ScrollView
   } from 'react-native';
import { ChoiceChip } from './src/components/ChoiceChip';
import { buildMessage, formatPhone, isValidBrazilianPhone, Occurrence, onlyDigits, smsUrl } from './src/utils/contact';

const OCURRENCES: Occurrence[] = [
  'Atraso no transporte',
  'Problema no trajeto',
  'Consulta médica',
  'Problemas pessoais',
  'Outro'
];

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occurrence, setOccurrence] = useState<Occurrence>('Atraso no transporte');
  const [note, setNote] = useState('');

  const message = useMemo(
    () => buildMessage(name, occurrence, note),
    [name, occurrence, note]
  )

  function validate() {
    if (name.trim().length < 2) {
      Alert.alert('Revise o nome', 'Informe o nome do estudante.');
      return false;
    }

    if (!isValidBrazilianPhone(phone)) {
      Alert.alert('Revise o telefone', 'Informe um telefone com DDD e 10 ou 11 dígitos.');
      return false;
    }

    return true;
  }

  function confirmSms() {
    if (!validate()) return;

    Alert.alert(
      'Preparar SMS?',
      'Revise o destinatário e confirme o envio no aplicativo de mensagens.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Abrir mensagens', 
          onPress: async () => {
            try {
              await Linking.openURL(smsUrl(phone, message));
            } catch {
              Alert.alert('SMS indisponível.');
            };
        }}
      ]
    );
  }

  function confirmCall() {
    if (!validate()) return;

    Alert.alert(
      'Abrir discador?',
      `O número ${formatPhone(phone)} será preparado.`,
      [
        { 
          text: 'Cancelar', style: 'cancel',
          onPress: () => Linking.openURL(`tel:${onlyDigits(phone)}`)
        }
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style='light' />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <View style={styles.brandRow}>
            <Text style={styles.logo}>AE</Text>
            <Text style={styles.brand}>ALERTA ETEC</Text>
          </View>

          <Text style={styles.title}>
            Comunique um imprevisto com clareza.
          </Text>

          <Text style={styles.subtitle}>
            Prepare uma mensagem ou abra o discador.
            Você sempre confirma a ação.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Dados para contato</Text>

          <Text style={styles.label}>Nome do estudante</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder='Escreva o nome do estudante...'
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={formatPhone(phone)}
            onChangeText={(value) => setPhone(onlyDigits(value))}
            keyboardType='phone-pad'
            placeholder='(14) 99999-9999'
          />

          <Text style={styles.label}>Tipo de ocorrência</Text>
          <View style={styles.chips}>
            {OCURRENCES.map((item) => (
              <ChoiceChip 
                key={item}
                label={item}
                selected={item === occurrence}
                onPress={() => setOccurrence(item)}
              />
            ))}
          </View>

          <Text style={styles.label}>Observação</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={180}
            />
          <Text style={styles.counter}>{note.length}/180</Text>
        </View>

          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Pré-visualização</Text>
            <Text style={styles.previewText}>{message}</Text>
          </View>

          <Pressable style={styles.primary} onPress={confirmSms}>
            <Text style={styles.primaryText}>Preparar SMS</Text>
          </Pressable>

          <Pressable style={styles.secondary} onPress={confirmCall}>
            <Text style={styles.secondaryText}>Abrir discador</Text>
          </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  content: {
    paddingBottom: 30
  },
  hero: {
    backgroundColor: '082f49',
    paddingTop: 58,
    paddingHorizontal: 22,
    paddingBottom: 34,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    backgroundColor: '#38bdf8',
    color: '#082F49',
    padding: 10,
    borderRadius: 12,
    fontWeight:'900',
  },
  brand: {
    color: '#bae6fd',
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: 24,
  },
  subtitle: {
    color: '#cdebfa',
    lineHeight: 22,
    marginTop: 8,
  },
  card: {
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    elevation: 3,
  },
  heading: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0f172a',
  },
  label: {
    color: '#475569',
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 13,
    color: '#0f172a',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  counter: {
    textAlign: 'right',
    color: '#94a3b8',
  },
  preview: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
  },
  previewTitle: {
    lineHeight: 21,
    fontWeight: '900',
  },     
  previewText: {
    color: '#0c4a68',
    lineHeight: 21,
    fontWeight: '900'
  },
  primary: {
    marginHorizontal: 16,
    padding: 17,
    borderRadius: 17,
    backgroundColor: '#0284c7',
    alignItems: 'center'
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900'
  },
  secondary: {
    margin: 16,
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: 'fffffff',
    alignItems: 'center'
  },
  secondaryText: {
    color: '#075985',
    fontWeight: '900'
  }   
});