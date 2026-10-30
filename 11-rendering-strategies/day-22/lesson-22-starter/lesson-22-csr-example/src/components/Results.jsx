import ResultsItem from './ResultsItem';
// The following is no longer necesary, data is passed in as a prop
// import { resources } from '../data/resources';
import Card from './ui/Card';

export default function Results({ resources, selectedResource, searchTerm, selectedCategories, onSelectResource, openNowOnly, virtualOnly }) {
  return (
    <Card title="Results">
      <ul className="divide-y divide-gray-200">
        {resources.filter((r) => {
          const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(r.category.toLowerCase());
          const matchesOpenNow = !openNowOnly || r.openNow;
          const matchesVirtual = !virtualOnly || r.virtual;
          return matchesSearch && matchesCategory && matchesOpenNow && matchesVirtual;
        })
          .map((r) => (
            <ResultsItem
              key={r.id}
              title={r.title}
              category={r.category}
              summary={r.summary}
              location={r.location}
              onClick={() => onSelectResource(r)}
              selected={selectedResource?.id === r.id}
            >
              {/* children: optional badge content */}
              {r.openNow && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Open now
                </span>
              )}
            </ResultsItem>
          ))}
      </ul>
    </Card >
  );
}