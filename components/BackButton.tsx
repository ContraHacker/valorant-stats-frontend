"use client";

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton({ className }: { className?: string }) {

    const router = useRouter();

    return (
        <button className={ classNames('flex items-center gap-x-2', className) } onClick={ () => router.back() }>
            <FiArrowLeft className='text-lg' />
            <span>Back</span>
        </button>
    );
}