import { ChangeEvent } from 'react';

import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import useFilter from '@/hooks/useFilter';
import useQueryParams from '@/hooks/useQueryParams';
import FilterWrapper from '@/pages/problems/components/SolutionFilter/FilterWrapper/FilterWrapper';

const DifficultyFilter = () => {
  const difficulty = useQueryParams({
    queryName: 'difficulty',
  });
  const { filter } = useFilter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    filter('difficulty', e.target.value);
  };

  return (
    <FilterWrapper>
      <Label htmlFor="difficulty" text="난이도" />
      <Select value={difficulty} onChange={handleChange}>
        <option value="">전체</option>
        <option value="easy">쉬움</option>
        <option value="normal">보통</option>
        <option value="hard">어려움</option>
      </Select>
    </FilterWrapper>
  );
};

export default DifficultyFilter;
