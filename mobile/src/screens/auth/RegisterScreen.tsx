import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthTextField,
  RelationshipPicker,
  AuthGradientButton,
  AuthHeader,
  AuthScreenLayout,
} from '../../components/auth';
import { useRegisterMutation } from '../../hooks/useAuthMutations';
import {
  previewUsername,
  sanitizeUsername,
  validateUsername,
  type Relationship,
} from '../../lib/authUtils';
import { spacing, typography, colors, fonts } from '../../theme';
import { Feather } from '@expo/vector-icons';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameEdited, setUsernameEdited] = useState(false);
  const [password, setPassword] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [relacao, setRelacao] = useState<Relationship>('Tia / Tio');
  const register = useRegisterMutation();

  useEffect(() => {
    if (!usernameEdited) {
      setUsername(previewUsername(fullName));
    }
  }, [fullName, usernameEdited]);

  const usernameError = username.length > 0 ? validateUsername(username) : null;
  const canSubmit =
    fullName.trim().length > 0 &&
    password.length >= 4 &&
    username.length >= 3 &&
    !usernameError;

  const handleUsernameChange = (raw: string) => {
    setUsernameEdited(true);
    setUsername(sanitizeUsername(raw));
  };

  const handleRegister = () => {
    if (!canSubmit) return;
    register.mutate(
      { fullName: fullName.trim(), username, password },
      {
        onSuccess: (data) => {
          Alert.alert(
            '🌸 Conta criada!',
            `Sua conta foi criada!\n\nEntre com:\n@${data.user.username}`,
            [{ text: 'Entendi, vamos lá!', style: 'default' }],
          );
        },
      },
    );
  };

  return (
    <AuthScreenLayout>
      <AuthHeader
        title="Cadastro"
        subtitle="Junte-se ao Jardim"
        note="Crie sua conta para compartilhar momentos com a Olívia"
      />

      <View style={styles.form}>
        <AuthTextField
          label="Nome"
          icon="user"
          placeholder="Seu primeiro nome"
          value={fullName}
          onChangeText={(v) => {
            setFullName(v);
            if (usernameEdited && v.trim() === '') setUsernameEdited(false);
          }}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <View style={styles.usernameGroup}>
          <AuthTextField
            label="Usuário"
            icon="at-sign"
            placeholder="seu.nome"
            value={username}
            onChangeText={handleUsernameChange}
            autoCapitalize="none"
            autoCorrect={false}
            hint="Letras minúsculas, números, ponto e underscore"
          />
          {usernameError ? (
            <View style={styles.errorRow}>
              <Feather name="alert-circle" size={13} color={colors.error ?? '#B85C6A'} />
              <Text style={styles.errorText}>{usernameError}</Text>
            </View>
          ) : username.length >= 3 ? (
            <View style={styles.okRow}>
              <Feather name="check-circle" size={13} color="#6aab7a" />
              <Text style={styles.okText}>@{username} disponível para usar</Text>
            </View>
          ) : null}
        </View>

        <RelationshipPicker value={relacao} onChange={setRelacao} />

        <AuthTextField
          label="Senha"
          icon="lock"
          placeholder="Crie uma senha segura"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!senhaVisivel}
          secureToggle
          secureVisible={senhaVisivel}
          onToggleSecure={() => setSenhaVisivel((v) => !v)}
          hint="Mínimo 4 caracteres"
        />
      </View>

      <AuthGradientButton
        label="Criar minha conta"
        onPress={handleRegister}
        loading={register.isPending}
        disabled={!canSubmit}
      />

      <Text style={styles.footer}>
        <Text style={typography.authFooter}>Já tenho conta? </Text>
        <Text
          style={typography.authFooterLink}
          onPress={() => navigation.navigate('Login')}
        >
          Entrar
        </Text>
      </Text>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: spacing.sm + 4,
  },
  usernameGroup: {
    gap: 4,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: '#B85C6A',
  },
  okRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 4,
  },
  okText: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: '#6aab7a',
  },
  footer: {
    textAlign: 'center',
  },
});
