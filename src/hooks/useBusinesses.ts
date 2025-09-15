// hooks/useBusinesses.ts
import { useEffect, useState } from 'react';

export const useBusinesses = (db) => {
    const [businesses, setBusinesses] = useState([]);
    useEffect(() => {
        if (!db) return;
        const sub = db.businesses.find().$.subscribe(rows => {
            // rows is a RxQueryResult, convert if necessary
            rows.exec().then(list => setBusinesses(list.map(r => r.toJSON ? r.toJSON() : r)));
        });
        return () => sub.unsubscribe();
    }, [db]);
    return businesses;
};
