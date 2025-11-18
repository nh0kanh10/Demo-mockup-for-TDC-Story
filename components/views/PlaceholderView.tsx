
import React from 'react';
import Icon from '../common/Icon';

interface PlaceholderViewProps {
    title: string;
    message?: string;
    icon?: any;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, message, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-surface rounded-lg shadow-lg border border-border-color min-h-[400px]">
            {icon && <Icon name={icon} className="w-16 h-16 text-primary mx-auto mb-4" />}
            <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
            <p className="text-text-secondary mt-2">{message || 'Tính năng này đang được phát triển. Vui lòng quay lại sau.'}</p>
        </div>
    );
};

export default PlaceholderView;
