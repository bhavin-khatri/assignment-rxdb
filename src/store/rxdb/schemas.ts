// src/db/schemas.ts
export const businessSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 36 }, // must include maxLength
        name: { type: 'string' }
    },
    required: ['id', 'name']
};

export const articleSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 36 }, // must include maxLength
        name: { type: 'string' },
        qty: { type: 'number' },
        selling_price: { type: 'number' },
        business_id: { type: 'string' }
    },
    required: ['id', 'name', 'qty', 'selling_price', 'business_id'],
    indexes: ['business_id'] // helpful if storage supports indexes
};
