// import { useState } from 'react';

// import { useResources } from '../hooks/useResources';
import { NavLink, useLoaderData, useNavigation } from 'react-router';

import Card from '../components/ui/Card';

import ResourceForm from '../components/ResourceForm';

export default function AdminPage() {
  // const [formData, setFormData] = useState({
  //   title: 'Study Group',
  //   category: 'Wellness',
  //   summary: 'Some summary of the resource.',
  //   location: 'NAIT Campus',
  //   hours: 'Mon-Fri 08:00-13:00',
  //   contact: 'study@nait.ca',
  //   virtual: false,
  //   openNow: false,
  // });

  const { resources, selectedResource, resourceId } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const initialFormData = selectedResource
    ? {
      title: selectedResource.title,
      category: selectedResource.category,
      summary: selectedResource.summary,
      location: selectedResource.location,
      hours: selectedResource.hours,
      contact: selectedResource.contact,
      virtual: selectedResource.virtual,
      openNow: selectedResource.openNow,
    }
    : {
      title: '',
      category: '',
      summary: '',
      location: '',
      hours: '',
      contact: '',
      virtual: false,
      openNow: false,
    };

  // const { resources, addResource, isLoading, error, refetch } = useResources();

  // async function handleCreateResource(e) {
  //   e.preventDefault();

  // Added as student exercise solution
  // addResource(formData);

  // const res = await fetch('http://localhost:3000/resources', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // });

  // if (!res.ok) {
  //   throw new Error('Could not create resource');
  // }

  // refetch();
  // }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      {/* {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )} */}

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <ResourceForm
              key={resourceId ?? 'new'}
              initialData={initialFormData}
              isEditing={Boolean(resourceId)}
              isSubmitting={isSubmitting}
            />
            {/* <Form method="post" className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  defaultValue={selectedResource?.title ?? ''}
                  placeholder="Resource title"
                />
              </div>

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <NavLink
                  to="/admin"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                // onClick={() => setFormData({
                //   title: '',
                //   category: '',
                //   summary: '',
                //   location: '',
                //   hours: '',
                //   contact: '',
                //   virtual: false,
                //   openNow: false,
                // })}
                >
                  Reset
                </NavLink>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Saving...'
                    : resourceId
                      ? 'Update Resource'
                      : 'Add Resource'}
                </button>
              </div>
            </Form> */}
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id}>
                  {/* <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p> */}
                  <NavLink
                    to={`/admin/${resource.id}`}
                    className={({ isActive }) =>
                      `block rounded border p-3 ${isActive ? 'border-sky-500 bg-sky-50' : 'border-gray-200'}`
                    }
                  >
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-sm text-base-content/70">{resource.category}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
};