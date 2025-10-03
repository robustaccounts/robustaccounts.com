'use client';

import {
    KitchenSinkToolbar,
    MDXEditor,
    type MDXEditorProps,
    codeBlockPlugin,
    diffSourcePlugin,
    headingsPlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface RichMdxEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const editorPlugins: MDXEditorProps['plugins'] = [
    toolbarPlugin({
        toolbarContents: () => <KitchenSinkToolbar />,
    }),
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    codeBlockPlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    markdownShortcutPlugin(),
    diffSourcePlugin(),
];

export default function RichMdxEditor({ value, onChange }: RichMdxEditorProps) {
    return (
        <div className="flex flex-col">
            <MDXEditor
                markdown={value}
                onChange={onChange}
                plugins={editorPlugins}
                className="mdx-editor min-h-[500px] bg-white"
                contentEditableClassName="prose prose-gray max-w-none px-6 py-4"
            />
        </div>
    );
}
