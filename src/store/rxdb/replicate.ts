// src/db/replicate.ts
import crossFetch from 'cross-fetch';
import { replicateCouchDB, getFetchWithCouchDBAuthorization } from 'rxdb/plugins/replication-couchdb';

export const startReplication = (db, couchBaseUrl, username, password) => {
    // We'll replicate businesses and articles to a single remote DB `appdata`
    const remoteUrl = `${couchBaseUrl}/appdata`;

    // Basic auth fetch helper (optional)
    const fetchFn = getFetchWithCouchDBAuthorization(username, password);

    // Businesses replication
    const repBusinesses = replicateCouchDB({
        replicationIdentifier: 'rep-businesses',
        collection: db.businesses,
        url: remoteUrl,
        fetch: fetchFn || crossFetch,
        live: true,
        push: {
            batchSize: 60,
            modifier: (doc) => ({ ...doc, type: 'business' }) // tag outgoing docs
        },
        pull: {
            batchSize: 60,
            modifier: (doc) => {
                // only accept business docs
                if (doc.type !== 'business') return null;
                const { type, ...rest } = doc;
                return rest;
            }
        }
    });

    // Articles replication
    const repArticles = replicateCouchDB({
        replicationIdentifier: 'rep-articles',
        collection: db.articles,
        url: remoteUrl,
        fetch: fetchFn || crossFetch,
        live: true,
        push: {
            batchSize: 60,
            modifier: (doc) => ({ ...doc, type: 'article' })
        },
        pull: {
            batchSize: 60,
            modifier: (doc) => {
                if (doc.type !== 'article') return null;
                const { type, ...rest } = doc;
                return rest;
            }
        }
    });

    // subscribe to replication events (status/error)
    repBusinesses.error$.subscribe(err => console.warn('rep businesses error', err));
    repArticles.error$.subscribe(err => console.warn('rep articles error', err));

    return { repBusinesses, repArticles };
};
