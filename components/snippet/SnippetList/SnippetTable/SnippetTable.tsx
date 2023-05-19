import React from 'react';

import { Snippet } from '@prisma/client';

import Table from '@/components/ui/Table';
import { getLanguageLabel } from '@/libs/utils/language';

interface SnippetTableProps {
  snippets: Snippet[];
  onClick: (snippet: Snippet) => void;
}

const SnippetTable: React.FC<SnippetTableProps> = ({ snippets, onClick }) => {
  return (
    <Table
      header={[
        {
          name: '이름',
          width: '50%',
          center: false,
        },
        {
          name: '언어',
          width: '50%',
          center: true,
        },
      ]}
      data={snippets.map((snippet) => ({
        id: snippet.id,
        contents: [snippet.name, getLanguageLabel(snippet.language)],
        onClick: () => onClick(snippet),
      }))}
    />
  );
};

export default SnippetTable;
