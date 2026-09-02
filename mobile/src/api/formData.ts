export interface LocalFileParams {
  uri: string;
  fileName: string;
  mimeType?: string | null;
}

export async function appendLocalFile(
  formData: FormData,
  fieldName: string,
  { uri, fileName, mimeType }: LocalFileParams,
) {
  const response = await fetch(uri);
  let blob = await response.blob();

  if (mimeType && blob.type !== mimeType) {
    blob = new Blob([blob], { type: mimeType });
  }

  formData.append(fieldName, blob, fileName);
}

export async function createFormDataWithFile(
  fields: Record<string, string>,
  fileField: string,
  file: LocalFileParams,
) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  await appendLocalFile(formData, fileField, file);
  return formData;
}
