# Backend Server (Resources API)

This server provides CRUD endpoints for resource objects stored in `resources.json`.

## Requirements

- Node.js (ES modules enabled)

## Setup

From the `backend/` folder:

```sh
npm install
```

## Run the server

```sh
npm start
```

The server listens on `http://localhost:3000`.

## Data file

Resource data is stored in `resources.json`. The server reads and writes this file on each request.

## Endpoints

### List all resources

```http
GET /resources
```

### Get one resource by id

```http
GET /resources/:id
```

### Create a resource

```http
POST /resources
Content-Type: application/json
```

Example body:

```json
{
  "title": "Peer Tutoring Centre",
  "category": "Academic",
  "summary": "Drop-in tutoring and study support.",
  "location": "Building W, Room W101",
  "hours": "Mon-Thu 10:00-16:00",
  "contact": "tutoring@nait.ca",
  "virtual": false,
  "openNow": true
},
```

### Update a resource

```http
PUT /resources/:id
Content-Type: application/json
```

Body should include all resource fields (the `id` is optional, but if provided must match the URL).

### Delete a resource

```http
DELETE /resources/:id
```

## Resource shape

```js
{
  id: string,
  title: string,
  category: string,
  summary: string,
  location: string,
  hours: string,
  contact: string,
  virtual: boolean,
  openNow: boolean
}
```
