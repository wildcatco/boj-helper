import { ChangeEvent } from 'react';

import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import usePushWithParams from '@/hooks/usePushWithParams';
import { debounce } from '@/libs/utils/debounce';

import styles from './SnippetSearch.module.scss';

const SnippetSearch = () => {
  const { push } = usePushWithParams();

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    push({
      params: {
        name: e.target.value,
        page: '',
      },
      keepRestParams: true,
    });
  }, 300);

  return (
    <form className={styles.form}>
      <div className={styles.input}>
        <Label htmlFor="snippet-search" text="이름" />
        <Input
          id="snippet-search"
          type="text"
          onChange={(e) => handleSearch(e)}
        />
      </div>
    </form>
  );
};

export default SnippetSearch;
