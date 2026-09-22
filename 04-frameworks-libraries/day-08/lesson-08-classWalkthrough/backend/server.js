import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'resources.json');
const RESOURCE_FIELDS = [
  'title',
  'category',
  'summary',
  'location',
  'hours',
  'contact',
  'virtual',
  'openNow',
];

const readDatabase = (callback) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return callback(err);
    try {
      const db = JSON.parse(data);
      if (!db.resources || !Array.isArray(db.resources)) {
        return callback(new Error('Invalid database format'));
      }
      callback(null, db);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
};

const writeDatabase = (db, callback) => {
  fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), 'utf8', callback);
};

const readRequestBody = (req, callback) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    if (!body) return callback(null, null);
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
};

const buildResource = (input, id) => {
  const resource = { id };
  RESOURCE_FIELDS.forEach((field) => {
    resource[field] = input[field];
  });
  return resource;
};

const validateResource = (resource, { requireId }) => {
  if (!resource || typeof resource !== 'object') {
    return 'Resource payload must be an object';
  }
  if (requireId && (!resource.id || typeof resource.id !== 'string')) {
    return 'Resource id is required';
  }
  for (const field of RESOURCE_FIELDS) {
    if (resource[field] === undefined) {
      return `Missing required field: ${field}`;
    }
  }
  for (const field of ['title', 'category', 'summary', 'location', 'hours', 'contact']) {
    if (typeof resource[field] !== 'string') {
      return `Field ${field} must be a string`;
    }
  }
  for (const field of ['virtual', 'openNow']) {
    if (typeof resource[field] !== 'boolean') {
      return `Field ${field} must be a boolean`;
    }
  }
  return null;
};

const generateId = () => `res_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Add CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS requests
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Set JSON response header for all responses
  res.setHeader('Content-Type', 'application/json');

  if (pathname === '/resources' && method === 'GET') {
    readDatabase((err, db) => {
      if (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: 'Failed to read database' }));
      }
      res.end(JSON.stringify(db.resources));
    });
  } else if (pathname === '/resources' && method === 'POST') {
    readRequestBody(req, (bodyErr, payload) => {
      if (bodyErr) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
      const payloadId = payload?.id;
      if (payloadId !== undefined && typeof payloadId !== 'string') {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Resource id must be a string' }));
      }
      const validationError = validateResource(payload, { requireId: false });
      if (validationError) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: validationError }));
      }
      readDatabase((err, db) => {
        if (err) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: 'Failed to read database' }));
        }
        const newId = payloadId || generateId();
        if (db.resources.some((resource) => resource.id === newId)) {
          res.statusCode = 409;
          return res.end(JSON.stringify({ error: `Resource ${newId} already exists` }));
        }
        const resource = buildResource(payload, newId);
        db.resources.push(resource);
        writeDatabase(db, (writeErr) => {
          if (writeErr) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: 'Failed to write database' }));
          }
          res.statusCode = 201;
          res.end(JSON.stringify(resource));
        });
      });
    });
  } else if (pathname.startsWith('/resources/') && method === 'GET') {
    const match = pathname.match(/^\/resources\/([^/]+)$/);
    if (!match) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
    const resourceId = decodeURIComponent(match[1]);
    readDatabase((err, db) => {
      if (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: 'Failed to read database' }));
      }
      const resource = db.resources.find((entry) => entry.id === resourceId);
      if (!resource) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: `Resource ${resourceId} not found` }));
      }
      res.end(JSON.stringify(resource));
    });
  } else if (pathname.startsWith('/resources/') && method === 'PUT') {
    const match = pathname.match(/^\/resources\/([^/]+)$/);
    if (!match) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
    const resourceId = decodeURIComponent(match[1]);
    readRequestBody(req, (bodyErr, payload) => {
      if (bodyErr) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
      if (payload?.id !== undefined && payload.id !== resourceId) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'Resource id cannot be changed' }));
      }
      const validationError = validateResource({ ...payload, id: resourceId }, { requireId: true });
      if (validationError) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: validationError }));
      }
      readDatabase((err, db) => {
        if (err) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: 'Failed to read database' }));
        }
        const index = db.resources.findIndex((entry) => entry.id === resourceId);
        if (index === -1) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: `Resource ${resourceId} not found` }));
        }
        const resource = buildResource(payload, resourceId);
        db.resources[index] = resource;
        writeDatabase(db, (writeErr) => {
          if (writeErr) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: 'Failed to write database' }));
          }
          res.end(JSON.stringify(resource));
        });
      });
    });
  } else if (pathname.startsWith('/resources/') && method === 'DELETE') {
    const match = pathname.match(/^\/resources\/([^/]+)$/);
    if (!match) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
    const resourceId = decodeURIComponent(match[1]);
    readDatabase((err, db) => {
      if (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: 'Failed to read database' }));
      }
      const index = db.resources.findIndex((entry) => entry.id === resourceId);
      if (index === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ error: `Resource ${resourceId} not found` }));
      }
      const [removed] = db.resources.splice(index, 1);
      writeDatabase(db, (writeErr) => {
        if (writeErr) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: 'Failed to write database' }));
        }
        res.end(JSON.stringify(removed));
      });
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
