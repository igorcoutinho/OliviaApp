import { useState } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen, Button, Input } from '../../components/ui';
import { PageHeader } from '../../components/layout/PageHeader';
import { useLoginMutation } from '../../hooks/useAuthMutations';
import { colors, spacing, fontSize, radius, shadows } from '../../theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLoginMutation();

  const handleLogin = () => {
    if (!username.trim() || !password) return;
    login.mutate({ username: username.trim(), password });
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Image source={require('../../../assets/olivia.png')} style={styles.avatar} />
          <PageHeader title="Olívia" subtitle="Jardim da Olívia · 1 ano" />

          <View style={styles.card}>
            <Text style={styles.cardText}>
              Entre com seu nome de usuário e senha para participar da festa.
            </Text>
          </View>

          <Input
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button label="Entrar" onPress={handleLogin} loading={login.isPending} />

          <Button
            label="Criar conta"
            variant="ghost"
            onPress={() => navigation.navigate('Register')}
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
    backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.md,
    marginBottom: spacing.lg, ...shadows.soft,
  },
  cardText: { fontSize: fontSize.md, color: colors.text, lineHeight: 22, textAlign: 'center' },
});
