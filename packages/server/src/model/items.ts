// @ts-ignore
import MongooseAdapter from '@shared/moleculer-db-adapter-mongoose';
import { ServiceSchema } from 'moleculer';
import DbService, { DbServiceSettings } from 'moleculer-db';
import mongoose from 'mongoose';

export default {
    name: 'ItemsModel',
    mixins: [DbService],
    adapter: new MongooseAdapter(`mongodb://${process.env.MONGODB_HOST || '127.0.0.1:27017'}`, {
        auth: {
            username: process.env.MONGODB_USERNAME,
            password: process.env.MONGODB_PASSWORD,
        },

        dbName: process.env.MONGODB_DATABASE,
    }),
    actions: {
        find: false,
        count: false,
        list: false,
        create: false,
        insert: false,
        get: false,
        update: false,
        remove: false,
    },
    settings: {
        fields: ['_id', 'platform', 'content', 'createdAt', 'updatedAt'],
    } as DbServiceSettings,

    model: mongoose.model(
        'items',
        // @ts-ignore
        mongoose.Schema(
            {
                platform: { type: Object },
                content: { type: Object },
            },
            { timestamps: true }
        )
    ),
    methods: {},
} as ServiceSchema;
