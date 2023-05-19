import { ChangeEvent } from 'react';

import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import useCategories from '@/hooks/useCategories';
import useFilter from '@/hooks/useFilter';
import useQueryParams from '@/hooks/useQueryParams';
import FilterWrapper from '@/pages/problems/components/SolutionFilter/FilterWrapper/FilterWrapper';

const CategoryFilter = () => {
  const category = useQueryParams({
    queryName: 'category',
  });
  const { categories } = useCategories();
  const { filter } = useFilter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    filter('category', e.target.value);
  };

  return (
    <FilterWrapper>
      <Label htmlFor="category" text="분류" />
      <Select id="category" value={category} onChange={handleChange}>
        <option value="">전체</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
      </Select>
    </FilterWrapper>
  );
};

export default CategoryFilter;
