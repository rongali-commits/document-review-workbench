export function parseCriteria(value) {
  return [...new Set(value.split(",").map(item => item.trim().toLowerCase()).filter(Boolean))];
}

export function analyzeDocument(text, criteriaValue) {
  const criteria = Array.isArray(criteriaValue) ? criteriaValue : parseCriteria(criteriaValue);
  const normalized = text.toLowerCase();
  const matches = criteria.filter(term => normalized.includes(term));
  const missing = criteria.filter(term => !matches.includes(term));
  const score = criteria.length ? Math.round((matches.length / criteria.length) * 100) : 0;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const evidence = matches.map(term => {
    const index = normalized.indexOf(term);
    const start = Math.max(0, index - 52);
    const end = Math.min(text.length, index + term.length + 72);
    return { term, excerpt: `${start ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}` };
  });
  return { score, matches, missing, evidence, wordCount: words.length, criteriaCount: criteria.length };
}

