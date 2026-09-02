import { GradientButton } from '../ui';

interface Props {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function PublishGardenButton({ onPress, loading, disabled }: Props) {
  return (
    <GradientButton
      label="Publicar no Jardim"
      icon="send"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
    />
  );
}
