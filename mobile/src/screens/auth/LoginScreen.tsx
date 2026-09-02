import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthTextField,
  AuthGradientButton,
  AuthHeader,
  AuthScreenLayout,
} from '../../components/auth';
import { useLoginMutation } from '../../hooks/useAuthMutations';
import { spacing, typography } from '../../theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const login = useLoginMutation();

  const canSubmit = username.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
    if (!canSubmit) return;
    login.mutate({ username: username.trim(), password });
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Esqueceu a senha?',
      'Por enquanto, peça ajuda a quem organizou a festa para recuperar seu acesso.',
    );
  };

  return (
    <AuthScreenLayout>
      <AuthHeader
        title="Jardim da Olívia"
        subtitle="Entrar no Jardim"
        note="Entre com seus dados para participar da festa"
      />

      <View style={styles.form}>
        <AuthTextField
          label="Nome de usuário"
          icon="user"
          placeholder="Ex: tia_regina"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.passwordGroup}>
          <AuthTextField
            label="Senha"
            icon="lock"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!senhaVisivel}
            secureToggle
            secureVisible={senhaVisivel}
            onToggleSecure={() => setSenhaVisivel((v) => !v)}
          />
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotWrap}>
            <Text style={typography.authForgotLink}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AuthGradientButton
        label="Entrar no Jardim"
        onPress={handleLogin}
        loading={login.isPending}
        disabled={!canSubmit}
      />

      <Text style={styles.footer}>
        <Text style={typography.authFooter}>Ainda não tem conta? </Text>
        <Text
          style={typography.authFooterLink}
          onPress={() => navigation.navigate('Register')}
        >
          Criar conta
        </Text>
      </Text>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: spacing.md,
  },
  passwordGroup: {
    gap: spacing.sm,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
  },
  footer: {
    textAlign: 'center',
  },
});
