import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthTextField,
  UsernamePreview,
  RelationshipPicker,
  AuthGradientButton,
  AuthHeader,
  AuthScreenLayout,
} from '../../components/auth';
import { useRegisterMutation } from '../../hooks/useAuthMutations';
import { previewUsername, type Relationship } from '../../lib/authUtils';
import { spacing, typography } from '../../theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [relacao, setRelacao] = useState<Relationship>('Tia / Tio');
  const register = useRegisterMutation();

  const username = previewUsername(fullName);
  const canSubmit = fullName.trim().length > 0 && password.length >= 4;

  const handleRegister = () => {
    if (!canSubmit) return;
    register.mutate({ fullName: fullName.trim(), password });
  };

  return (
    <AuthScreenLayout>
      <AuthHeader
        title="Cadastro"
        subtitle="Junte-se ao Jardim"
        note="Crie sua conta para compartilhar momentos com a Olívia"
      />

      <View style={styles.form}>
        <View style={styles.fieldGroup}>
          <AuthTextField
            label="Nome completo"
            icon="user"
            placeholder="Seu nome e sobrenome"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <UsernamePreview username={username} />
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
  fieldGroup: {
    gap: spacing.sm,
  },
  footer: {
    textAlign: 'center',
  },
});
