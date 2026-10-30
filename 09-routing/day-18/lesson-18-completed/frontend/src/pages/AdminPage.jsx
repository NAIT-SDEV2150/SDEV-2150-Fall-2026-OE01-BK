import { useResources } from '../hooks/useResources';
import Card from '../components/ui/Card';
import { useParams, useNavigate } from 'react-router';
import ResourceForm from '../components/ResourceForm';

export default function AdminPage() {
  const { resources, isLoading, error, refetch, addResource } = useResources();
  const { resourceId } = useParams();
  const navigate = useNavigate();
  console.log(resourceId);

  const EMPTY_FORM_DATA = {
  title: '',
  category: '',
  summary: '',
  location: '',
  hours: '',
  contact: '',
  virtual: false,
  openNow: false,
};


  const currentResource = resourceId
    ? resources.find((item) => item.id === resourceId)
    : null;

  console.log(currentResource);
  const initialFormData = currentResource ? {
    title: currentResource.title,
    category: currentResource.category,
    summary: currentResource.summary,
    location: currentResource.location,
    hours: currentResource.hours,
    contact: currentResource.contact,
    virtual: currentResource.virtual,
    openNow: currentResource.openNow,
  } : EMPTY_FORM_DATA;
  // navigate page to clicked resource id

  function handleEditStart(resource){
    navigate(`/admin/${resource.id}`);
  }

async function handleCreateResource(e, formData) {
    e.preventDefault();
    
    const isEditing = Boolean(resourceId);
    const url = isEditing
      ? `http://localhost:3000/resources/${resourceId}`
      : 'http://localhost:3000/resources';

    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
    }

    const savedResource = await res.json();
    await refetch();

    navigate(`/admin/${savedResource.id}`);
  }

    // Determine if we're in editing mode based on the presence of the resourceId param.
  const isEditing = Boolean(resourceId);

 return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )}

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            {resourceId && isLoading && <p>Loading selected resource...</p>}

            {resourceId && !isLoading && !currentResource && (
              <p className="text-sm text-red-600">
                Selected resource could not be found.
              </p>
            )}

            {/* Update to make use of the ResourceForm component */}
            {(!resourceId || currentResource) && (
              <ResourceForm
                key={resourceId ?? 'new'}
                initialData={initialFormData}
                isEditing={isEditing}
                onSubmit={handleCreateResource}
                onReset={() => navigate('/admin')}
              />
            )}
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded border border-gray-200 p-3 cursor-pointer hover:border-sky-400"
                  onClick={() => handleEditStart(resource)}>
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
};