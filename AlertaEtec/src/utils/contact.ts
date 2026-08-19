import { Platform } from "react-native";

export type Occurrence = 
        | 'Atraso no tranporte'
        | 'Problema no trajeto'
        | 'Consulta médica'
        | 'Problemas pessoais'
        | 'Outro';

export const onlyDigits =  (value: string) => 
    value.replace(/\D/g, '').slice(0, 11);

export function formatPhone(value: string) {
    const digits = onlyDigits(value);

    if (digits.length <= 2) return digits;
    if (digits.length <= 7) {
        return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    }
    if (digits.length <= 10) {
           return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    }

     return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
}

export function isValidBrazilianPhone(value: string) {
    return [10, 11].includes(onlyDigits(value).length);
}