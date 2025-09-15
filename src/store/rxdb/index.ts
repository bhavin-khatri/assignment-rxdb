import 'react-native-get-random-values';
import 'react-native-quick-crypto';
import {Buffer} from 'buffer';
import {createHash} from 'react-native-quick-crypto'; // ✅ use this instead of 'crypto'
import {v4 as uuidv4} from 'uuid';
import {articleSchema, businessSchema} from './schemas';
import {Logger} from '../../utils/logger';
import {open} from 'react-native-quick-sqlite';
import {getRxStorageSQLiteTrial, getSQLiteBasicsQuickSQLite} from 'rxdb/plugins/storage-sqlite';
import {addRxPlugin, createRxDatabase} from 'rxdb';
import {RxDBQueryBuilderPlugin} from 'rxdb/plugins/query-builder';

let pluginsAdded = false;

function ensurePlugins() {
    if (pluginsAdded) return;
    pluginsAdded = true;

    addRxPlugin(RxDBQueryBuilderPlugin);
    if (__DEV__) {
        addRxPlugin(RxDBQueryBuilderPlugin);
    }
}
if (typeof global.Buffer === 'undefined') {
    global.Buffer = Buffer;
}

// Polyfill subtle.digest
if (!global.crypto.subtle) {
    global.crypto.subtle = {
        digest: async (algorithm: string, data: ArrayBuffer) => {
            const algo = algorithm.replace('-', '').toLowerCase(); // e.g. "SHA-256" -> "sha256"
            const hash = createHash(algo);
            hash.update(Buffer.from(data));
            return hash.digest();
        },
    };
}


console.log('crypto.subtle available:', typeof crypto.subtle !== 'undefined');

let dbHelpersSingleton: any;
export const getDbHelpers = async () => {
    if (!dbHelpersSingleton) {
        dbHelpersSingleton = await initDatabase();
    }
    return dbHelpersSingleton;
};
const createDB = async () => {
    ensurePlugins()
    const storage = getRxStorageSQLiteTrial({
        sqliteBasics: getSQLiteBasicsQuickSQLite(open),
        journalMode: 'WAL'
    });
    const db = await createRxDatabase({
        name: 'rxdbDemo',
        storage,
        multiInstance: false
    });

    Logger('[DB] created:', db.name);
    return db;
};
export default createDB;

export const initDatabase = async () => {
    try {
        // ensurePlugins()
    }catch (e) {
        console.log("error======>",e)
    }
    const db = await createDB();

    Logger('Database name:', db.name);
    Logger('Collections before add:', Object.keys(db.collections));

    try {
        const collectionsToAdd: any = {};

        if (!db.collections.businesses) collectionsToAdd.businesses = { schema: businessSchema };
        if (!db.collections.articles) collectionsToAdd.articles = { schema: articleSchema };

        if (Object.keys(collectionsToAdd).length > 0) {
            const result = await db.addCollections(collectionsToAdd);
            Logger('Collections add result:', Object.keys(result));
        } else {
            Logger('Collections already exist, skipping add');
        }
    } catch (err: any) {
        console.log('Error in addCollections:', err?.message, err);
        if (err.code === 'DB8') Logger('DB8: Collections already exist (safe to ignore)');
    }

    Logger('Collections after add:', Object.keys(db.collections));

    return {
        db,
        createBusiness: async (name: string) => {
            const id = uuidv4();
            return db.businesses.insert({ id, name });
        },
        createArticle: async ({ name, qty, selling_price, business_id }) => {
            const id = uuidv4();
            return db.articles.insert({ id, name, qty, selling_price, business_id });
        },
        listBusinesses: () => db.businesses.find().sort({ name: 'asc' }).exec(),
        listArticlesForBusiness: (businessId: string) =>
            db.articles.find({ selector: { business_id: businessId } }).exec()
    };
};
