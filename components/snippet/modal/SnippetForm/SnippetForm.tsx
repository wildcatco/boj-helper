import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';

import { Snippet } from '@prisma/client';
import { useRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

import Button from '@/components/ui/Button';
import Editor from '@/components/ui/Editor';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import useModal from '@/hooks/useModal';
import useMutation from '@/hooks/useMutation';
import { checkApiError } from '@/libs/api/api-error';
import { SUPPORTED_LANGUAGES } from '@/libs/constants/languages';
import { getLanguageLabel, isLanguageSupported } from '@/libs/utils/language';
import { notifyError, notifySuccess } from '@/libs/utils/notification';
import { getQueryString } from '@/libs/utils/query-string';
import { languageState } from '@/states/code';
import {
  CreateSnippetBody,
  CreateSnippetResponse,
} from '@/types/dto/snippets/create-snippet';
import {
  UpdateSnippetBody,
  UpdateSnippetResponse,
} from '@/types/dto/snippets/update-snippet';

import styles from './SnippetForm.module.scss';

interface SnippetFormProps {
  mode: 'add' | 'edit';
  snippet?: Snippet | null;
  onEdit?: (snippet: Snippet) => void;
}

const SnippetForm: React.FC<SnippetFormProps> = ({ mode, snippet, onEdit }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [name, setName] = useState(snippet?.name || '');
  const [code, setCode] = useState(snippet?.code || '');
  const [language, setLanguage] = useRecoilState(languageState);
  const { closeModal } = useModal();
  const { trigger: createSnippet } = useMutation<
    CreateSnippetResponse,
    CreateSnippetBody
  >({
    url: '/api/snippets',
    method: 'POST',
  });
  const { trigger: updateSnippet } = useMutation<
    UpdateSnippetResponse,
    UpdateSnippetBody
  >({
    url: `/api/snippets/${snippet?.id}`,
    method: 'POST',
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isLanguageSupported(e.target.value)) {
      setLanguage(e.target.value);
    }
  };

  const handleSave = async () => {
    if (!name) {
      return alert('이름을 입력해주세요.');
    }

    if (!code) {
      return alert('코드를 입력해주세요.');
    }

    try {
      await createSnippet({
        name,
        code,
        language,
      });

      await mutate(
        `/api/snippets?${getQueryString({
          page: router.query.page,
          name: router.query.name,
        })}`
      );
      notifySuccess('코드 스니핏을 저장했습니다.');
      closeModal('addSnippet');
    } catch (error) {
      if (checkApiError(error, 'SnippetAlreadyExists')) {
        alert(error.message);
      } else {
        notifyError();
      }
    }
  };

  const handleEdit = async () => {
    if (!snippet) {
      return;
    }
    if (!name) {
      return alert('이름을 입력해주세요.');
    }
    if (!code) {
      return alert('코드를 입력해주세요.');
    }
    if (
      name === snippet.name &&
      code === snippet.code &&
      language === snippet.language
    ) {
      return alert('변경된 사항이 없습니다.');
    }

    try {
      const data = await updateSnippet({
        name,
        code,
        language,
      });

      notifySuccess('코드 스니핏을 수정했습니다.');
      closeModal('editSnippet');
      await mutate(
        `/api/snippets?${getQueryString({
          page: router.query.page,
          name: router.query.name,
        })}`
      );
      data?.snippet && onEdit && onEdit(data.snippet);
    } catch (error) {
      if (
        checkApiError(error, 'SnippetNotAuthorized') ||
        checkApiError(error, 'SnippetNotFound') ||
        checkApiError(error, 'SnippetAlreadyExists')
      ) {
        notifyError(error.message);
      } else {
        notifyError();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Label text="이름" />
        <Input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div className={styles.input}>
        <Label text="언어" />
        <Select
          defaultValue={snippet?.language || language}
          onChange={handleLanguageChange}
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {getLanguageLabel(language)}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.code}>
        <Editor
          fontSize={14}
          value={code}
          onChange={handleCodeChange}
          language={language}
        />
      </div>
      <div className={styles.controls}>
        {mode === 'add' ? (
          <Button onClick={handleSave}>저장</Button>
        ) : (
          <Button onClick={handleEdit}>수정</Button>
        )}
        <Button
          outlined
          onClick={() =>
            closeModal(mode === 'add' ? 'addSnippet' : 'editSnippet')
          }
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default SnippetForm;
