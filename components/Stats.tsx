import { PLAYER_NAME } from "@/constants";
import getAllDMStats from "@/lib/db/getAllDMStats";

export default async function AllDMStats() {

    const stats = await getAllDMStats();

    return (
        <div className="pr-4 border-r space-y-2 w-max">
            {
                stats.map((stat) => {
                    return (
                        <div key={stat._id} className="bg-white/10 hover:bg-white/25 cursor-pointer px-10 py-2 rounded-lg relative">

                            <span className={ 
                                `${stat.scores[PLAYER_NAME].kills === 40 ? 'bg-green-400' : 'bg-red-400'} w-3 h-3 rounded-full absolute top-[10px] right-2`
                            } />

                            <p className="text-xs text-gray-300 mb-1 w-max">{stat.date ? stat.date.toDateString() : 'no date'}</p>
                            <p className="font-bold">{stat.map ? stat.map : 'no map'}</p>
                            <p className="text-xs font-bold text-fuchsia-300">{stat.match_duration ? stat.match_duration : 'no duration'}</p>

                            <div className="flex items-center justify-between gap-x-2 text-sm mt-2 font-bold">
                                <span>K: { stat.scores[PLAYER_NAME].kills }</span>
                                <span>D: { stat.scores[PLAYER_NAME].deaths }</span>
                                <span>A: { stat.scores[PLAYER_NAME].assists }</span>
                            </div>

                        </div>
                    );
                })
            }
        </div>
    );
}
