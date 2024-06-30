import DMSidebar from '../components/DMSidebar';
import RunningStats from '../components/RunningStats';
import ScreenshotInput from '../components/ScreenshotInput';
import { PLAYER_NAME } from '../constants';

export default function Home() {
    return (
        <main className='grid grid-cols-[min-content_auto] gap-x-8'>

            <DMSidebar />

            <div>
                <ScreenshotInput />
                <h1 className='text-3xl'>Dashboard</h1>
                <h2 className='text-lg text-gray-400'>Running Deathmatch Stats for { PLAYER_NAME }</h2>
                <RunningStats />
            </div>

        </main>
    );
}
