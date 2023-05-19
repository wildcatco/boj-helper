import { useRecoilValue } from 'recoil';

import DropDown from '@/components/ui/DropDown';
import { getQueryString } from '@/libs/utils/query-string';
import { languageState } from '@/states/code';

interface AssociationsProps {
  associations: number[];
}

const AssociatedProblems: React.FC<AssociationsProps> = ({ associations }) => {
  const language = useRecoilValue(languageState);

  return (
    <DropDown
      label="비슷한 문제"
      list={associations.map((association) => ({
        label: `${association}번`,
        href: `/solve/${association}?${getQueryString({
          language: language,
        })}`,
      }))}
    />
  );
};

export default AssociatedProblems;
