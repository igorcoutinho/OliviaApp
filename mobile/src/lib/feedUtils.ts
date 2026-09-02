export function formatPostTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  if (date.toDateString() === now.toDateString()) {
    return `Hoje às ${time}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Ontem às ${time}`;
  }

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatReactionCount(count: number): string {
  if (count === 0) return '';
  if (count === 1) return '1 adorei';
  return `${count} adorei`;
}

export function getUniqueReactionEmojis(
  reactions: { emoji: string }[],
  limit = 3
): string {
  const seen = new Set<string>();
  const emojis: string[] = [];
  for (const r of reactions) {
    if (!seen.has(r.emoji)) {
      seen.add(r.emoji);
      emojis.push(r.emoji);
      if (emojis.length >= limit) break;
    }
  }
  return emojis.join('');
}
