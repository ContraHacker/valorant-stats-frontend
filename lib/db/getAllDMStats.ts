import { collection_name, db_name } from "@/constants";
import { MongoClient } from "mongodb";

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

export default async function getAllDMStats() {

    const client = new MongoClient(process.env.MONGODB_URI!);
    
    try {

        await client.connect();

        const database = client.db(db_name);
        const records = database.collection(collection_name);
        const stats = await records.find({}).toArray();

        return stats.map((stat) => {
            return {
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
