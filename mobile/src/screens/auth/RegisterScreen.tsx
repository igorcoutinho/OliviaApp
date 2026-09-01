import { useState } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen, Button, Input } from '../../components/ui';
import { PageHeader } from '../../components/layout/PageHeader';
import { useRegisterMutation } from '../../hooks/useAuthMutations';
import { colors, spacing, fontSize } from '../../theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegisterMutation();

  const handleRegister = () => {
    if (!fullName.trim() || !password) return;
    register.mutate({ fullName: fullName.trim(), password });
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Image source={require('../../../assets/olivia.png')} style={styles.avatar} />
          <PageHeader title="Cadastro" subtitle="Junte-se ao jardim" />

          <View style={styles.card}>
            <Text style={styles.cardText}>
              Seu nome de usuário será gerado automaticamente a partir do seu nome completo.
            </Text>
          </View>

          <Input
            placeholder="Nome completo"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
          <Input
            placeholder="Senha (mín. 4 caracteres)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button label="Criar cadastro" onPress={handleRegister} loading={register.isPending} />

          <Button
            label="Já tenho conta"
            variant="ghost"
            onPress={() => navigation.navigate('Login')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1, padding: spacing.lg, justifyContent: 'center' },
  avatar: {
    width: 100, height: 100, borderRadius: 50, alignSelf: 'center',
    marginBottom: spacing.sm, borderWidth: 3, borderColor: colors.lavenderLight,
  },
  card: {
    backgroundColor: colors.surface, borderRadius: 16, padding: spacing.md,
    marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  cardText: { fontSize: fontSize.md, color: colors.text, lineHeight: 22, textAlign: 'center' },
});
