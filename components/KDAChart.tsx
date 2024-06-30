"use client";

import { Stats } from '@/lib/db/dm-records';
import { Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, LinearScale, PointElement);

export default function KDAChart({ kda_stats }: { kda_stats: Stats["scores"][0][] }) {

    const kills = kda_stats.map((stat) => stat.kills);
    const deaths = kda_stats.map((stat) => stat.deaths);
    const assists = kda_stats.map((stat) => stat.assists);

    const average_kills = kills.reduce((a, b) => a + b, 0) / kills.length;

    const labels = kda_stats.map((_, index) => index + 1);

    return (
        <div className='px-16 py-6 bg-white/5 rounded'>

            <div className='flex justify-between items-center mb-4'>

                <h4 className="text-gray-400 text-lg">KDA Trend</h4>

                <div className='flex items-center space-x-2 text-gray-400 text-xs'>

                    <span className='w-3 h-3 bg-green-500 rounded-full' />
                    <span>Kills</span>

                    <span className='w-3 h-3 bg-red-500 rounded-full' />
                    <span>Deaths</span>

                    <span className='w-3 h-3 bg-yellow-500 rounded-full' />
                    <span>Assists</span>

                    <span className='w-3 h-3 bg-white rounded-full' />
                    <span>Avg. Kills</span>

                </div>

            </div>

            <Line
                data={ {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Kills',
                            data: kills,
                            borderColor: '#4ade80',
                            tension: 0.5,
                            pointRadius: 0,
                            borderWidth: 2
                        },
                        {
                            label: 'Deaths',
                            data: deaths,
                            borderColor: '#f87171',
                            tension: 0.5,
                            pointRadius: 0,
                            borderWidth: 2
                        },
                        {
                            label: 'Assists',
                            data: assists,
                            borderColor: '#facc15',
                            tension: 0.5,
                            pointRadius: 0,
                            borderWidth: 2
                        },
                        {
                            label: 'Average Kills',
                            data: Array(labels.length).fill(average_kills),
                            borderColor: 'rgba(255, 255, 255, 0.75)',
                            borderDash: [5, 5],
                            tension: 0,
                            pointRadius: 0,
                            borderWidth: 1
                        }
                    ]
                } }
                options={ {
                    scales: {
                        x: {
                            ticks: {
                                display: false
                            },
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 14,
                                    family: 'Tahoma'
                                },
                                color: 'rgba(255,255,255,0.6)',
                                precision: 0,
                            },
                            grid: {
                                display: true,
                                color: 'rgba(255,255,255,0.1)',
                            }
                        }
                    }
                } }
            />

        </div>
    );
}