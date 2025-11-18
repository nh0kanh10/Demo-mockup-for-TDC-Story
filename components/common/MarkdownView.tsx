
import React from 'react';

interface MarkdownViewProps {
    content: string;
    className?: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ content, className = '' }) => {
    const renderContent = (text: string) => {
        // Basic parser
        // 1. Split by double newline for paragraphs
        const paragraphs = text.split(/\n\s*\n/);
        
        return paragraphs.map((paragraph, idx) => {
            // 2. Process inline styles using Regex
            // **bold** -> <strong>
            // *italic* -> <em>
            // __underline__ -> <u>
            let html = paragraph
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/__(.*?)__/g, '<u>$1</u>');

            // 3. Process block styles
            if (html.startsWith('> ')) {
                return <blockquote key={idx} className="border-l-4 border-primary pl-4 italic text-text-secondary my-3" dangerouslySetInnerHTML={{ __html: html.substring(2) }} />;
            }
            if (html.startsWith('- ')) {
                // Assumes one list item per paragraph for simplicity in this basic parser
                 return <ul key={idx} className="list-disc list-inside my-2"><li dangerouslySetInnerHTML={{ __html: html.substring(2) }} /></ul>;
            }

            return <p key={idx} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
        });
    };

    return <div className={`text-text-primary ${className}`}>{renderContent(content)}</div>;
};

export default MarkdownView;
