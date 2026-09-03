export function previewUsername(fullName: string): string {
  const base = fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '.')
    .slice(0, 30);

  return base || 'seu.nome';
}

export function sanitizeUsername(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .replace(/\.{2,}/g, '.')
    .slice(0, 30);
}

export function validateUsername(username: string): string | null {
  if (username.length < 3) return 'Mínimo 3 caracteres';
  if (username.length > 30) return 'Máximo 30 caracteres';
  if (!/^[a-z0-9]/.test(username)) return 'Deve começar com letra ou número';
  if (!/^[a-z0-9][a-z0-9._]*[a-z0-9]$/.test(username) && username.length > 1) {
    return 'Use apenas letras, números, ponto ou underscore';
  }
  return null;
}

export const RELATIONSHIP_OPTIONS = [
  'Pai',
  'Mãe',
  'Tia / Tio',
  'Primo / Prima',
  'Avó / Avô',
  'Amigo / Amiga',
  'Padrinho / Madrinha',
  'Outro',
] as const;

export type Relationship = (typeof RELATIONSHIP_OPTIONS)[number];
