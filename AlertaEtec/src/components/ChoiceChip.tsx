import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'

type Props = {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export default function ChoiceChip({ label, selected, onPress }: Props) {
  return (
    <Pressable>
      <Text>ChoiceChip</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({})