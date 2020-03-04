export default function researchersDataNormalizer(data) {
  return data.map((researcher) => {
    researcher.totalCitations = researcher.citations.reduce((acc, citations) => acc + citations, 0);
    researcher.totalPublications = researcher.publications.reduce(
      (acc, publications) => acc + publications,
      0
    );

    return researcher;
  })
  .sort((a, b) => (a.totalPublications < b.totalPublications ? 1 : -1))
  .slice(0, 5);
}
