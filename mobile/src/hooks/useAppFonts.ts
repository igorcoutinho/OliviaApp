import { useFonts } from 'expo-font';
import {
  Parisienne_400Regular,
} from '@expo-google-fonts/parisienne';
import {
  InstrumentSerif_400Regular,
} from '@expo-google-fonts/instrument-serif';
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

export function useAppFonts() {
  const [loaded, error] = useFonts({
    Parisienne_400Regular,
    InstrumentSerif_400Regular,
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  return { loaded, error };
}
