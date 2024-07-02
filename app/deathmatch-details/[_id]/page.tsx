import BackButton from '@/components/BackButton';
import DMScoresTable from '@/components/DMScoresTable';
import { PLAYER_NAME } from '@/constants';
import { getDeathmatchDetails, getDeathmatchRunningStats } from '@/lib/db/dm-records';
import { FiArrowDown, FiArrowUp, FiAward, FiCalendar, FiClock, FiDivide, FiEdit, FiMapPin, FiUpload } from 'react-icons/fi';

export default async function DeathmatchDetails({ params }: { params: { _id: string } }) {

    const { _id } = params;

    const details = await getDeathmatchDetails(_id);
    const running_stats = await getDeathmatchRunningStats();

    if (!details) {
        return <div>Details not found</div>;
    }

    const rank = Object.keys(details.scores).indexOf(PLAYER_NAME) + 1;
    const kdr = details.scores[PLAYER_NAME].kills / details.scores[PLAYER_NAME].deaths;
    const delta_kdr = kdr - running_stats.kdr;
    const delta_kills = details.scores[PLAYER_NAME].kills - running_stats.avg_kills;
    const delta_deaths = details.scores[PLAYER_NAME].deaths - running_stats.avg_deaths;

    return (
        <>

            <nav
                className='mb-8 px-8 pt-16 pb-10 rounded relative'
                style={ {
                    backgroundImage: 'url(/maps/' + details.map + '.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                } }
            >
                <BackButton className='absolute top-8 left-8' />

                <h1 className='text-4xl drop-shadow-lg border-b-4 border-fuchsia-400 pb-4'>Deathmatch Details</h1>

                <div className='grid grid-cols-3 gap-4 mt-4 p-8 bg-black/60 rounded'>

                    <span className='flex items-center gap-x-2'>
                        <FiMapPin className='text-xl' />
                        <p className='tracking-widest text-xl'>{ details.map }</p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiClock className='text-xl' />
                        <p className='tracking-widest text-xl'>{ details.match_duration }</p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiAward className='text-xl' />
                        <p className='tracking-widest text-xl'>Rank: { rank }</p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiDivide className='text-xl' />
                        <p className='tracking-widest text-xl'>
                            KDR: { kdr.toFixed(2) }
                            <span className={ `text-sm ml-1 ${ delta_kdr > 0 ? 'text-green-400' : 'text-red-400' }` }>
                                ({ delta_kdr > 0 ? '+' : '' }{ delta_kdr.toFixed(2) })
                            </span>
                        </p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiArrowUp className='text-xl' />
                        <p className='tracking-widest text-xl'>
                            Kills: { details.scores[PLAYER_NAME].kills }
                            <span className={ `text-sm ml-1 ${ delta_kills > 0 ? 'text-green-400' : 'text-red-400' }` }>
                                ({ delta_kills > 0 ? '+' : '' }{ delta_kills.toFixed(0) })
                            </span>
                        </p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiArrowDown className='text-xl' />
                        <p className='tracking-widest text-xl'>
                            Deaths: { details.scores[PLAYER_NAME].deaths }
                            <span className={ `text-sm ml-1 ${ delta_deaths > 0 ? 'text-red-400' : 'text-green-400' }` }>
                                ({ delta_deaths > 0 ? '+' : '' }{ delta_deaths.toFixed(0) })
                            </span>
                        </p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiCalendar className='text-xl' />
                        <p className='tracking-widest text-xl'>{ new Date(details.date || '').toLocaleString('en-IN', { dateStyle: 'short' }) }</p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiUpload className='text-xl' />
                        <p className='tracking-widest text-xl'>{ new Date(details.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) }</p>
                    </span>

                    <span className='flex items-center gap-x-2'>
                        <FiEdit className='text-xl' />
                        <p className='tracking-widest text-xl'>{ new Date(details.updated_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) }</p>
                    </span>

                </div>

            </nav>

            <DMScoresTable scores={ Object.entries(details.scores) } />

        </>
    );
}