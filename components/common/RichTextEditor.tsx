
import React, { useRef, useState } from 'react';
import Icon from './Icon';
import MarkdownView from './MarkdownView';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, className = '', minHeight = '300px' }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const insertText = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selection = text.substring(start, end);

        const newText = text.substring(0, start) + before + selection + after + text.substring(end);
        
        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                end + before.length
            );
        }, 0);
    };

    return (
        <div className={`border border-slate-300 rounded-lg overflow-hidden bg-surface focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all ${className}`}>
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 bg-slate-100 border-b border-slate-200">
                <div className="flex items-center gap-1 overflow-x-auto">
                    <button 
                        type="button"
                        onClick={() => insertText('**', '**')}
                        disabled={isPreviewMode}
                        className="p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                        title="In đậm"
                    >
                        <Icon name="bold" className="w-4 h-4" />
                    </button>
                    <button 
                        type="button"
                        onClick={() => insertText('*', '*')}
                        disabled={isPreviewMode}
                        className="p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                        title="In nghiêng"
                    >
                        <Icon name="italic" className="w-4 h-4" />
                    </button>
                    <button 
                        type="button"
                        onClick={() => insertText('__', '__')}
                        disabled={isPreviewMode}
                        className="p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                        title="Gạch chân"
                    >
                        <Icon name="underline" className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-slate-300 mx-1"></div>
                    <button 
                        type="button"
                        onClick={() => insertText('> ')}
                        disabled={isPreviewMode}
                        className="p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                        title="Trích dẫn"
                    >
                        <Icon name="quote" className="w-4 h-4" />
                    </button>
                    <button 
                        type="button"
                        onClick={() => insertText('- ')}
                        disabled={isPreviewMode}
                        className="p-2 rounded hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                        title="Danh sách"
                    >
                        <Icon name="list" className="w-4 h-4" />
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${isPreviewMode ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                    {isPreviewMode ? 'Sửa' : 'Xem trước'}
                </button>
            </div>

            {/* Editor Area */}
            {isPreviewMode ? (
                <div 
                    className="w-full p-4 overflow-y-auto bg-slate-50" 
                    style={{ minHeight }}
                >
                    {value ? <MarkdownView content={value} /> : <p className="text-slate-400 italic">Chưa có nội dung...</p>}
                </div>
            ) : (
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 resize-y focus:outline-none bg-transparent text-text-primary font-mono text-base"
                    style={{ minHeight }}
                />
            )}
        </div>
    );
};

export default RichTextEditor;
