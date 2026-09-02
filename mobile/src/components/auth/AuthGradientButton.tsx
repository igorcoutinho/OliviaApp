import { GradientButton } from '../ui';

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function AuthGradientButton(props: Props) {
  return <GradientButton {...props} />;
}
