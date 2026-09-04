import * as ImageManipulator from 'expo-image-manipulator';

export type CompressKind = 'photo' | 'avatar';

const PRESETS: Record<CompressKind, { maxWidth: number; compress: number }> = {
  photo: { maxWidth: 1280, compress: 0.65 },
  avatar: { maxWidth: 400, compress: 0.6 },
};

export async function compressImage(
  uri: string,
  kind: CompressKind = 'photo',
): Promise<{ uri: string; mimeType: string; fileName: string }> {
  const { maxWidth, compress } = PRESETS[kind];

  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: maxWidth } }],
    {
      compress,
      format: ImageManipulator.SaveFormat.JPEG,
    },
  );

  return {
    uri: result.uri,
    mimeType: 'image/jpeg',
    fileName: `${kind}-${Date.now()}.jpg`,
  };
}
