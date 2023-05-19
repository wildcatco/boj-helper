import MonacoEditor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface EditorProps {
  language: string;
  value?: string;
  fontSize?: number;
  readOnly?: boolean;
  onChange?: (value: string | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({
  language,
  value,
  fontSize,
  readOnly,
  onChange,
}) => {
  const { theme } = useTheme();

  return (
    <MonacoEditor
      language={language}
      theme={theme === 'light' ? 'light' : 'vs-dark'}
      options={{
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        scrollbar: {
          vertical: 'hidden',
        },
        fontSize: fontSize || 18,
        minimap: {
          enabled: false,
        },
        padding: {
          top: 12,
        },
        readOnly,
      }}
      value={value}
      onChange={onChange}
    />
  );
};

export default Editor;
