import { db_name } from "@/constants";
import { MongoClient, ObjectId } from "mongodb";

const collection_name = 'dm-records';

export type Stats = {
    _id: string;
    date: Date | null;
    map: string | null;
    match_duration: string | null;
    created_at: Date;
    updated_at: Date;
    scores: {
        [player_name: string]: {
            score: number;
            kills: number;
            deaths: number;
            assists: number;
        };
    };
}

export async function getAllDMStats() {

    const client = new MongoClient(process.env.MONGODB_URI!);
    
    try {

        await client.connect();

        const database = client.db(db_name);
        const records = database.collection(collection_name);
        const stats = await records.find({}).toArray();

        return stats.map((stat) => {
            return {
                _id: stat._id.toString(),
                date: new Date(stat.date),
                map: stat.map,
                match_duration: stat.match_duration,
                scores: stat.scores
            };
        }) as Stats[];
    }

    catch (error) {
        console.error(error);
        return [];
    }
  
    finally {
        await client.close();
    }
}

export async function getDeathmatchDetails(id: string) {

    const client = new MongoClient(process.env.MONGODB_URI!);

    if (!id) {
        return null;
    }

    const _id = new ObjectId(id);
    
    try {

        await client.connect();

        const database = client.db(db_name);
        const records = database.collection(collection_name);

        const stat = await records.findOne({ _id });

        if (!stat) {
            return null;
        }

        return {
            _id: stat._id.toString(),
            date: new Date(stat.date),
            map: stat.map,
            match_duration: stat.match_duration,
            scores: stat.scores,
            created_at: stat.created_at,
            updated_at: stat.updated_at
        } as Stats;
    }

    catch (error) {
        console.error(error);
        return null;
    }
  
    finally {
        await client.close();
    }
}