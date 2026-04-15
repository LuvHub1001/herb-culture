const DATE_RE = /\d{4}-\d{2}-\d{2}/g;

const parseDates = (dateStr: string | undefined | null) => {
  if (!dateStr) return null;
  const matches = dateStr.match(DATE_RE);
  if (!matches || matches.length === 0) return null;
  return matches;
};

export const getStart = (dateStr: string | undefined | null): number => {
  const matches = parseDates(dateStr);
  if (!matches) return 0;
  const d = new Date(matches[0]);
  return isNaN(d.getTime()) ? 0 : d.getTime();
};

export const getEnd = (dateStr: string | undefined | null): number => {
  const matches = parseDates(dateStr);
  if (!matches) return 0;
  const d = new Date(matches[matches.length - 1]);
  if (isNaN(d.getTime())) return 0;
  d.setHours(23, 59, 59, 999);
  return d.getTime();
};

export const isOngoing = (dateStr: string | undefined | null): boolean => {
  const end = getEnd(dateStr);
  return end >= Date.now();
};
