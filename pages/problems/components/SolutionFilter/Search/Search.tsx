import { ChangeEvent, useState } from 'react';

import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import usePushWithParams from '@/hooks/usePushWithParams';
import { debounce } from '@/libs/utils/debounce';
import FilterWrapper from '@/pages/problems/components/SolutionFilter/FilterWrapper/FilterWrapper';

const Search = () => {
  const [searchBy, setSearchBy] = useState('problem-title');
  const { push } = usePushWithParams();

  const handleSearchByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchBy(e.target.value);
  };

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    push({
      params: {
        searchBy: searchBy,
        query: e.target.value,
        page: '',
      },
      keepRestParams: true,
    });
  }, 300);

  return (
    <FilterWrapper>
      <Label htmlFor="query" text="검색" />
      <Select id="searchBy" name="searchBy" onChange={handleSearchByChange}>
        <option value="problem-title">문제 이름</option>
        <option value="problem-id">문제 번호</option>
      </Select>
      <Input
        id="query"
        name="query"
        type={searchBy === 'problem-id' ? 'number' : 'text'}
        placeholder="검색어 입력"
        onChange={(e) => handleSearch(e)}
      />
    </FilterWrapper>
  );
};

export default Search;
