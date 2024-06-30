"use client";

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, LinearScale, CategoryScale);

export default function MapFrequencyChart({ map_stats }: { map_stats: (string | null)[] }) {

    const maps = new Set(map_stats.map((map) => map));

    const map_freq = Array.from(maps).map((map) => ({
        map: map,
        freq: map_stats.filter((m) => m === map).length
    }));

    return (
        <div className='px-16 py-6 bg-white/5 rounded'>

            <h4 className="text-gray-400 text-lg mb-4">Map Frequency</h4>


            <Bar
                data={ {
                    labels: Array.from(maps),
                    datasets: [
                        {
                            label: 'Frequency',
                            data: map_freq.map((map) => map.freq),
                            backgroundColor: 'rgba(194, 65, 12, 1)',
                            borderRadius: 6,
                            barThickness: 60,
                        }
                    ]
                } }
                options={ {
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 14,
                                    family: 'Tahoma'
                                },
                                color: 'rgba(255,255,255,0.6)',
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
                            }
                        }
                    }
                } }
            />

        </div>
    );
}