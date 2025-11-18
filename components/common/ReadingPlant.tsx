import React from 'react';
import Icon from './Icon';

interface ReadingPlantProps {
    level: number;
}

const ReadingPlant: React.FC<ReadingPlantProps> = ({ level }) => {
    const plantStages = [
        // Level 1: Sprout
        <svg viewBox="0 0 40 40" className="w-12 h-12 text-lime-500">
             <path d="M 12 32 Q 15 32 15 29 C 15 24 20 24 20 20" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
             <path d="M 28 32 Q 25 32 25 29 C 25 24 20 24 20 20" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>,
        // Level 2: Small Plant
        <svg viewBox="0 0 40 40" className="w-12 h-12 text-lime-600">
            <path d="M20 32 V 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 25 c -5 -2, -6 -8, -2 -10" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 25 c 5 -2, 6 -8, 2 -10" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
        </svg>,
        // Level 3: Healthy Plant
        <svg viewBox="0 0 40 40" className="w-12 h-12 text-green-600">
            <path d="M20 32 V 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 28 c -8 -3, -10 -10, -4 -14" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 28 c 8 -3, 10 -10, 4 -14" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
             <path d="M20 21 c -6 -2, -7 -8, -2 -10" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 21 c 6 -2, 7 -8, 2 -10" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
        </svg>,
         // Level 4: Flowering Plant
        <svg viewBox="0 0 40 40" className="w-12 h-12 text-green-700">
            <path d="M20 32 V 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 28 c -8 -3, -10 -10, -4 -14" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 28 c 8 -3, 10 -10, 4 -14" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 21 c -6 -2, -7 -8, -2 -10" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 21 c 6 -2, 7 -8, 2 -10" stroke="currentColor" fill="currentColor" fillOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            <circle cx="15" cy="11" r="3" fill="#facc15" />
            <circle cx="25" cy="11" r="3" fill="#f472b6" />
        </svg>,
    ];

    const stage = Math.min(level - 1, plantStages.length - 1);
    
    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                {plantStages[stage] || plantStages[0]}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-900/80 to-transparent rounded-b-full blur-sm" style={{width: '120%', left: '-10%'}}></div>
                <div className="absolute bottom-0 w-full h-8 bg-yellow-900 rounded-b-full"></div>
            </div>
        </div>
    );
};

export default ReadingPlant;