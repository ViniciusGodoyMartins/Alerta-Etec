import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
    label: string,
    selected: boolean,
    onPress: () => void;
}

export function ChoiceChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole='button'
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
        <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 9
  },
  selected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0284C7'
  },
  text: {
    color: '#475569',
    fontWeight: '700'
  },
  selectedText: {
    color: '#075985'
  }
});