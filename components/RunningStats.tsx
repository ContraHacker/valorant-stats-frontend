import { PLAYER_NAME } from "@/constants";
import getAllDMStats from "@/lib/db/getAllDMStats";
import KDAChart from "./KDAChart";
import MapFrequencyChart from "./MapFrequencyChart";

export default async function RunningStats() {

    const stats = await getAllDMStats();

    const num_games = stats.length;

    const total_kills = stats.reduce((acc, stat) => acc + stat.scores[PLAYER_NAME].kills, 0);
    const total_deaths = stats.reduce((acc, stat) => acc + stat.scores[PLAYER_NAME].deaths, 0);

    const kdr = total_kills / total_deaths;

    const avg_kills = total_kills / num_games;
    const avg_deaths = total_deaths / num_games;

    const num_wins = stats.filter((stat) => stat.scores[PLAYER_NAME].kills === 40).length;
    const num_losses = num_games - num_wins;

    const prev_10_maps = stats.slice(-10).map((stat) => stat.map);

    return (
        <> 
        
            <h2 className="text-sm text-gray-400 mt-6">Previous 10 Maps</h2>
            <div className="flex justify-between gap-x-2 w-full mt-2">
                {
                    prev_10_maps.map((map, index) => (
                        <span key={index} className="bg-white/20 px-2 py-1 rounded text-xs w-full text-center">{map}</span>
                    ))
                }
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">

                <div className="bg-fuchsia-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Games Played</p>
                    <p className="text-[4vw] leading-none">{num_games}</p>
                </div>

                <div className="bg-fuchsia-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">KDR</p>
                    <p className="text-[4vw] leading-none">{kdr.toFixed(2)}</p>
                </div>

                <div className="bg-green-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Total Kills</p>
                    <p className="text-[4vw] leading-none">{total_kills}</p>
                </div>

                <div className="bg-red-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Total Deaths</p>
                    <p className="text-[4vw] leading-none">{total_deaths}</p>
                </div>

                <div className="bg-green-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Wins</p>
                    <p className="text-[4vw] leading-none">{num_wins}</p>
                </div>

                <div className="bg-red-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Losses</p>
                    <p className="text-[4vw] leading-none">{num_losses}</p>
                </div>

                <div className="bg-green-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Average Kills</p>
                    <p className="text-[4vw] leading-none">{avg_kills.toFixed(0)}</p>
                </div>

                <div className="bg-red-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Average Deaths</p>
                    <p className="text-[4vw] leading-none">{avg_deaths.toFixed(0)}</p>
                </div>
                
            </div>

            <div className="my-6 grid grid-cols-2 gap-x-4">
                <MapFrequencyChart map_stats = { stats.map((stat) => stat.map) } />
                <KDAChart kda_stats = { stats.map((stat) => stat.scores[PLAYER_NAME]) } />
            </div>

        </>
    );
}