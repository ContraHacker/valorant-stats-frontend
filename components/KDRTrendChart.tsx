"use client";

import { KDRTrendData } from '@/lib/db/dm-records';
import { ActiveElement, ChartEvent, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, LinearScale, PointElement);

export default function KDRTrendChart({ data, average_kdr }: { data: KDRTrendData, average_kdr: number }) {

    const router = useRouter();
    const [show_trend_only, set_show_trend_only] = useState(true);

    const labels = data.per_game_kdr.map(stat => stat.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const clipped_kdr_trend = data.kdr_trend.map(kdr => Math.min(1.6, Math.max(1.4, kdr)));

    function handle_point_click(_: ChartEvent, elements: ActiveElement[]) {
        if (elements.length > 0) {
            router.push(`/deathmatch-details/${data.per_game_kdr[elements[0].index]._id}`);
        }
    }

    return (
        <div className='px-16 py-6 bg-white/5 rounded col-span-2'>

            <div className='flex justify-between items-center mb-4'>

                <h4 className="text-gray-400 text-lg">KDR Trend</h4>

                <div className='flex items-center space-x-2 text-gray-400 text-xs'>

                    <span className='w-3 h-3 bg-fuchsia-500 rounded-full' />
                    <span>KDR Trend</span>

                    <span className='w-3 h-3 bg-orange-400 rounded-full' />
                    <span>Game KDR</span>

                    <span className='w-3 h-3 bg-white rounded-full' />
                    <span>Average KDR</span>

                    <span className='underline text-gray-400'>Trend Only</span>
                    <input
                        type = 'checkbox'
                        checked = { show_trend_only }
                        onChange = { () => set_show_trend_only(!show_trend_only) }
                        onClick = { e => e.stopPropagation() }
                        className = 'w-3 h-3 accent-fuchsia-400'
                    />

                </div>
            </div>

            <div className='h-[400px]'>
                <Line
                    data={ {
                        labels: labels,
                        datasets: [
                            {
                                label: 'KDR',
                                data: show_trend_only ? clipped_kdr_trend : data.kdr_trend,
                                borderColor: '#d946ef',
                                pointRadius: 0,
                                pointHoverRadius: 0,
                                pointHitRadius: 0,
                                borderWidth: 2
                            },
                            {
                                label: 'Game KDR',
                                data: show_trend_only ? Array(labels.length).fill(average_kdr) : data.per_game_kdr.map(stat => stat.kdr),
                                borderColor: show_trend_only ? 'transparent' : '#f59e0b',
                                pointRadius: 0,
                                pointHoverRadius: 12,
                                pointHitRadius: 12,
                                borderWidth: 2
                            },
                            {
                                label: 'Average KDR',
                                data: Array(labels.length).fill(average_kdr),
                                borderColor: '#ffffff',
                                borderDash: [5, 5],
                                tension: 0,
                                pointRadius: 0,
                                pointHoverRadius: 0,
                                pointHitRadius: 0,
                                borderWidth: 2
                            }
                        ]
                    } }
                    options={ {
                        scales: {
                            x: {
                                ticks: {
                                    display: true,
                                    font: {
                                        size: 11,
                                        family: 'Tahoma'
                                    },
                                    color: 'rgba(255,255,255,0.6)'
                                },
                                grid: {
                                    display: true,
                                    color: 'rgba(255,255,255,0.1)'
                                }
                            },
                            y: {
                                ticks: {
                                    font: {
                                        size: 14,
                                        family: 'Tahoma'
                                    },
                                    color: 'rgba(255,255,255,0.6)'
                                },
                                grid: {
                                    display: true,
                                    color: 'rgba(255,255,255,0.1)'
                                }
                            }
                        },
                        maintainAspectRatio: false,
                        onClick: handle_point_click
                    } }
                />
            </div>

        </div>
    );
}