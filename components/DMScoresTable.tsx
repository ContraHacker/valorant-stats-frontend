"use client";

import { PLAYER_NAME } from '@/constants';
import { ScoreItem } from '@/lib/db/dm-records';
import { useState } from 'react';

export default function DMScoresTable({ scores }: { scores: [string, ScoreItem][] }) {

    const [censor_names, set_censor_names] = useState(true);

    return (
        <div className='p-8 pt-12 bg-white/10 rounded border relative'>

            <button
                className='text-sm absolute top-3 right-8 px-2 py-1 rounded-full bg-orange-400'
                onClick={ () => set_censor_names(!censor_names) }
            >
                { censor_names ? 'Show' : 'Hide' } Names
            </button>

            <table className='w-full'>
                <thead>
                    <tr className='bg-fuchsia-400/50 border-b uppercase tracking-widest'>
                        <th>Rank</th>
                        <th className='text-left py-2'>Player</th>
                        <th className='text-left py-2'>Kills</th>
                        <th className='text-left py-2'>Deaths</th>
                        <th className='text-left py-2'>Assists</th>
                        <th className='text-left py-2'>KDR</th>
                        <th className='text-left py-2'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scores.map(([player, { kills, deaths, assists, score }], index) => (
                            <tr key={ player } className={ player === PLAYER_NAME ? 'border' : '' }>

                                <td className='text-center'>{ index + 1 }</td>

                                <td>{ player === PLAYER_NAME ? PLAYER_NAME : (censor_names ? 'Player' : player) }</td>

                                <td className='font-mono text-xl'>
                                    { kills < 10 && '0' }
                                    { kills }
                                    <span className='ml-2 h-3 mb-px inline-block bg-green-400' style={ { width: `${ kills * 2 }px`} }></span>
                                </td>

                                <td className='font-mono text-xl'>
                                    { deaths < 10 && '0' }
                                    { deaths }
                                    <span className='ml-2 h-3 mb-px inline-block bg-red-400' style={ { width: `${ deaths * 2 }px`} }></span>
                                </td>

                                <td className='font-mono text-xl'>
                                    { assists < 10 && '0' }
                                    { assists }
                                    <span className='ml-2 h-3 mb-px inline-block bg-yellow-400' style={ { width: `${ assists * 4 }px`} }></span>
                                </td>

                                <td className='font-mono text-xl'>
                                    { (kills / deaths).toFixed(2) }
                                    <span 
                                        className={ `ml-2 h-3 mb-px inline-block ${ kills / deaths > 1 ? 'bg-green-400' : 'bg-red-400' }` }
                                        style={ { width: `${ (kills / deaths) * 25 }px` } }>
                                    </span>
                                </td>

                                <td className='font-mono text-xl'>
                                    { score.toLocaleString() }
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    );
}