import { getDeathmatchDetails } from '@/lib/db/dm-records';

export default async function DeathmatchDetails({ params }: { params: { _id: string } }) {

    const { _id } = params;

    const details = await getDeathmatchDetails(_id);

    if (!details) {
        return <div>Details not found</div>;
    }

    return (
        <div>
            <h1>Deathmatch Details</h1>
            <table>
                <tbody>
                    {
                        Object.entries(details.scores).map(([player_name, player_stat]) => (
                            <tr key={player_name}>
                                <td>{player_name}</td>
                                <td>{player_stat.kills}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}