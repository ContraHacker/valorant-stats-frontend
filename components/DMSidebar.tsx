import { PLAYER_NAME } from "@/constants";
import { getAllDMStats } from "@/lib/db/dm-records";
import Link from "next/link";

export default async function DMSidebar() {

    const stats = await getAllDMStats();

    return (
        <div className="space-y-2 pr-2 w-max max-h-[calc(100vh-64px)] overflow-y-auto">
            {
                stats.map((stat) => {
                    return (
                        <Link key={ stat._id } href={ `/deathmatch-details/${stat._id}` } className="block">
                            <div
                                className={ `cursor-pointer px-10 py-2 rounded-lg relative bg-cover bg-center` }
                                style={ {
                                    backgroundImage: `url(/maps/${stat.map}.webp)`,
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    backgroundBlendMode: 'overlay',
                                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25) inset',
                                } }
                            >

                                <span className={
                                    `${stat.scores[PLAYER_NAME].kills === 40 ? 'bg-green-400' : 'bg-red-400'} w-3 h-3 rounded-full absolute top-[10px] right-2`
                                } />

                                <p className="text-xs text-gray-300 mb-1 w-max">{ stat.date ? stat.date.toDateString() : 'no date' }</p>
                                <p className="font-bold">{ stat.map ? stat.map : 'no map' }</p>
                                <p className="text-xs font-bold text-fuchsia-300">{ stat.match_duration ? stat.match_duration : 'no duration' }</p>

                                <div className="flex items-center justify-between gap-x-2 text-sm mt-2 font-bold">
                                    <span>K: { stat.scores[PLAYER_NAME].kills }</span>
                                    <span>D: { stat.scores[PLAYER_NAME].deaths }</span>
                                    <span>A: { stat.scores[PLAYER_NAME].assists }</span>
                                </div>

                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}
