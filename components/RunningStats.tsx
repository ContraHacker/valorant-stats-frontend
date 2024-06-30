import { PLAYER_NAME } from "@/constants";
import { getAllDMStats, getDeathmatchRunningStats } from "@/lib/db/dm-records";
import KDAChart from "./KDAChart";
import MapFrequencyChart from "./MapFrequencyChart";

export default async function RunningStats() {

    const stats = await getAllDMStats();
    const {
        num_games,
        total_kills,
        total_deaths,
        kdr,
        avg_kills,
        avg_deaths,
        num_wins,
        num_losses
    } = await getDeathmatchRunningStats();

    return (
        <>

            <div className="grid grid-cols-4 gap-4 mt-6">

                <div className="bg-fuchsia-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Games Played</p>
                    <p className="text-[4vw] leading-none">{ num_games }</p>
                </div>

                <div className="bg-fuchsia-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">KDR</p>
                    <p className="text-[4vw] leading-none">{ kdr.toFixed(2) }</p>
                </div>

                <div className="bg-green-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Total Kills</p>
                    <p className="text-[4vw] leading-none">{ total_kills }</p>
                </div>

                <div className="bg-red-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Total Deaths</p>
                    <p className="text-[4vw] leading-none">{ total_deaths }</p>
                </div>

                <div className="bg-green-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Wins</p>
                    <p className="text-[4vw] leading-none">{ num_wins }</p>
                </div>

                <div className="bg-red-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Losses</p>
                    <p className="text-[4vw] leading-none">{ num_losses }</p>
                </div>

                <div className="bg-green-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Average Kills</p>
                    <p className="text-[4vw] leading-none">{ avg_kills.toFixed(0) }</p>
                </div>

                <div className="bg-red-400/20 px-8 py-4 rounded w-full">
                    <p className="text-xs text-gray-300">Average Deaths</p>
                    <p className="text-[4vw] leading-none">{ avg_deaths.toFixed(0) }</p>
                </div>

            </div>

            <div className="my-6 grid grid-cols-2 gap-x-4">
                <MapFrequencyChart map_stats={ stats.map((stat) => stat.map) } />
                <KDAChart kda_stats={ stats.map((stat) => stat.scores[PLAYER_NAME]).reverse() } />
            </div>

        </>
    );
}