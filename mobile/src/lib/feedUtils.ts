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

export function formatNotificationTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const diffMin = Math.floor(diffMs / 60_000);
  const diffH = Math.floor(diffMs / 3_600_000);
  const diffD = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return 'Agora';
  if (diffMin < 60) return `Há ${diffMin} min`;
  if (diffH < 24) return `Há ${diffH}h`;

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `Ontem às ${time}`;
  }

  if (diffD < 7) return `Há ${diffD} dias`;

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export function formatReactionCount(count: number): string {
  if (count === 0) return '';
  if (count === 1) return '1 reação';
  return `${count} reações`;
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
