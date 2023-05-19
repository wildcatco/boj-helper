import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import DropDown from '@/components/ui/DropDown';
import useMounted from '@/hooks/useMounted';
import { SUPPORTED_LANGUAGES } from '@/libs/constants/languages';
import { getLanguageLabel, isLanguageSupported } from '@/libs/utils/language';
import { languageState } from '@/states/code';

const LanguageSelector = () => {
  const router = useRouter();
  const [language, setLanguage] = useRecoilState(languageState);
  const mounted = useMounted();

  useEffect(() => {
    if (router.isReady) {
      const { language } = router.query;
      if (typeof language === 'string' && isLanguageSupported(language)) {
        setLanguage(language);
      }
    }
  }, [router, setLanguage]);

  return (
    <DropDown
      label={mounted ? getLanguageLabel(language) : ''}
      list={SUPPORTED_LANGUAGES.map((lang) => ({
        label: getLanguageLabel(lang),
        href: `/solve/${router.query.id}?language=${lang}${
          router.query.list ? `&list=${router.query.list}` : ''
        }`,
      }))}
    />
  );
};

export default LanguageSelector;
