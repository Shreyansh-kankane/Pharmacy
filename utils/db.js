import { MongoClient } from 'mongodb';

async function connectToDatabase(uri) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        const db = client.db();
        return db;

    } catch (e) {
        console.error(e);
    }
}

export default connectToDatabase;
