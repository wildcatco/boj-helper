import { useRouter } from 'next/router';

import { Snippet } from '@prisma/client';
import { useSWRConfig } from 'swr';

import Button from '@/components/ui/Button';
import Editor from '@/components/ui/Editor/Editor';
import Label from '@/components/ui/Label';
import useModal from '@/hooks/useModal';
import useMutation from '@/hooks/useMutation';
import { checkApiError } from '@/libs/api/api-error';
import { notifyError, notifySuccess } from '@/libs/utils/notification';
import { getQueryString } from '@/libs/utils/query-string';
import { DeleteSnippetResponse } from '@/types/dto/snippets/delete-snippet';

import styles from './SnippetCode.module.scss';

interface SnippetDetailProps {
  snippet: Snippet;
  onDelete: () => void;
  editable?: boolean;
}

const SnippetCode: React.FC<SnippetDetailProps> = ({
  snippet,
  onDelete,
  editable,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { trigger: deleteSnippet } = useMutation<DeleteSnippetResponse>({
    url: `/api/snippets/${snippet.id}`,
    method: 'DELETE',
  });
  const { openModal } = useModal();

  const handleOpen = () => {
    openModal('editSnippet');
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteSnippet({});
      notifySuccess('코드 스니핏을 삭제했습니다.');
      void mutate(`/api/snippets?${getQueryString(router.query)}`);
      onDelete();
    } catch (error) {
      if (
        checkApiError(error, 'SnippetNotAuthorized') ||
        checkApiError(error, 'SnippetNotFound')
      ) {
        notifyError(error.message);
      }
      notifyError();
    }
  };

  return (
    <div>
      <Label text={snippet.name} size="xl" />
      <div className={styles.editor}>
        <Editor
          fontSize={14}
          language={snippet.language}
          value={snippet.code}
          readOnly
        />
      </div>
      {editable && (
        <div className={styles.controls}>
          <Button onClick={handleOpen}>수정하기</Button>
          <Button onClick={handleDelete} outlined>
            삭제하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default SnippetCode;
