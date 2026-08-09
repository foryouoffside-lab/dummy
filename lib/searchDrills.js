import { DRILLS } from './drillsRegistry';

export function searchDrills(query, drills = DRILLS) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return drills.filter(drill => {
    const name = drill.name.toLowerCase();
    const folder = drill.folderName.toLowerCase();
    const category = drill.category.toLowerCase();
    const categoryLabel = drill.categoryLabel.toLowerCase();
    const subcategory = (drill.subcategory || '').toLowerCase();
    const description = (drill.description || '').toLowerCase();
    const keywords = (drill.keywords || []).map(k => k.toLowerCase());

    const searchableText = `${name} ${folder} ${category} ${categoryLabel} ${subcategory} ${description} ${keywords.join(' ')}`;

    // Match if all search terms appear in searchableText or match keywords/prefixes
    return terms.every(term => {
      return (
        searchableText.includes(term) ||
        keywords.some(k => k.startsWith(term)) ||
        name.split(/\s+/).some(word => word.startsWith(term))
      );
    });
  });
}
