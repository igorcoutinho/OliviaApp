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
