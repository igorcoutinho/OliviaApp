import { File, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library/legacy';

export const FESTA_ALBUM_NAME = 'Festa da Olivia';

async function ensureWritePermission() {
  const current = await MediaLibrary.getPermissionsAsync(true);
  if (current.granted) return true;

  const next = await MediaLibrary.requestPermissionsAsync(true);
  return next.granted;
}

export async function savePhotoToFestaAlbum(remoteUrl: string, photoId: string) {
  const allowed = await ensureWritePermission();
  if (!allowed) {
    throw new Error('Permissão para salvar fotos na galeria foi negada');
  }

  const destination = new File(Paths.cache, `festa-${photoId}.jpg`);
  const downloaded = await File.downloadFileAsync(remoteUrl, destination, {
    idempotent: true,
  });

  const asset = await MediaLibrary.createAssetAsync(downloaded.uri);
  const existing = await MediaLibrary.getAlbumAsync(FESTA_ALBUM_NAME);

  if (existing) {
    await MediaLibrary.addAssetsToAlbumAsync([asset], existing, false);
  } else {
    await MediaLibrary.createAlbumAsync(FESTA_ALBUM_NAME, asset, false);
  }

  return { albumName: FESTA_ALBUM_NAME };
}
