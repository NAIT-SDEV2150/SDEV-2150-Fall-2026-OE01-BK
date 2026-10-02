import { useState } from 'react';

import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [virtualOnly, setVirtualOnly] = useState(false);

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoryToggle={setSelectedCategories}
          openNowOnly={openNowOnly}
          onOpenNowChange={setOpenNowOnly}
          virtualOnly={virtualOnly}
          onVirtualOnlyChange={setVirtualOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
          virtualOnly={virtualOnly}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource} />
        ) : (
          <div className="text-sm text-base-content/70">
            Select a resource to view details.
          </div>
        )}
      </aside>
    </PageLayout>
  );
}

export default App;
