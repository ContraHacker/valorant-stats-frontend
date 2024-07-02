import { PLAYER_NAME, db_name } from "@/constants";
import { MongoClient, ObjectId } from "mongodb";

const collection_name = 'dm-records';

export type ScoreItem = {
    score: number;
    kills: number;
    deaths: number;
    assists: number;
};

export type Stats = {
    _id: string;
    date: Date | null;
    map: string | null;
    match_duration: string | null;
    created_at: Date;
    updated_at: Date;
    scores: {
        [player_name: string]: ScoreItem;
    };
};

export type RunningStats = {
    num_games: number;
    total_kills: number;
    total_deaths: number;
    kdr: number;
    avg_kills: number;
    avg_deaths: number;
    num_wins: number;
    num_losses: number;
    total_duration: string;
    avg_duration: string;
};

export async function getAllDMStats() {

    const client = new MongoClient(process.env.MONGODB_URI!);

    try {

        await client.connect();

        const database = client.db(db_name);
        const records = database.collection(collection_name);
        const stats = await records
            .find({})
            .sort({ created_at: -1 })
            .toArray();

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

export async function getDeathmatchRunningStats() {

    const client = new MongoClient(process.env.MONGODB_URI!);

    try {

        await client.connect();

        const database = client.db(db_name);
        const records = database.collection(collection_name);

        const all_records = await records
            .find({})
            .toArray();

        if (!all_records) {
            throw new Error('Error fetching DM records to compute running stats');
        }

        const stats: RunningStats = {
            num_games: all_records.length,
            total_kills: all_records.reduce((acc, stat) => acc + stat.scores[PLAYER_NAME].kills, 0),
            total_deaths: all_records.reduce((acc, stat) => acc + stat.scores[PLAYER_NAME].deaths, 0),
            kdr: 0,
            avg_kills: 0,
            avg_deaths: 0,
            num_wins: 0,
            num_losses: 0,
            total_duration: '',
            avg_duration: '',
        };

        stats.kdr = stats.total_kills / stats.total_deaths;
        stats.avg_kills = stats.total_kills / stats.num_games;
        stats.avg_deaths = stats.total_deaths / stats.num_games;
        stats.num_wins = all_records.filter((stat) => stat.scores[PLAYER_NAME].kills === 40).length;
        stats.num_losses = stats.num_games - stats.num_wins;
        
        const total_duration_seconds = all_records.reduce((acc, stat) => {
            const [minutes, seconds] = stat.match_duration.split(':').map(Number);
            return acc + (minutes * 60) + seconds;
        }, 0);

        const total_hours = Math.floor(total_duration_seconds / 3600);
        const total_minutes = Math.floor((total_duration_seconds % 3600) / 60);
        const total_seconds = Math.floor(total_duration_seconds % 60);

        stats.total_duration = `${total_hours}:${total_minutes}:${total_seconds}`;

        const avg_duration_seconds = total_duration_seconds / stats.num_games;

        const avg_minutes = Math.floor(avg_duration_seconds / 60);
        const avg_seconds = Math.floor(avg_duration_seconds % 60);

        stats.avg_duration = `${avg_minutes}:${avg_seconds}`;
        
        return stats;

    }

    catch (error) {
        console.error(error);
        return {
            num_games: 0,
            total_kills: 0,
            total_deaths: 0,
            kdr: 0,
            avg_kills: 0,
            avg_deaths: 0,
            num_wins: 0,
            num_losses: 0,
            total_duration: '',
            avg_duration: ''
        } satisfies RunningStats;
    }

    finally {
        await client.close();
    }

}