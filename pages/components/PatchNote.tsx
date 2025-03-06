import { useEffect } from 'react';

import patches from './patches.json';

import { notifySuccess } from '@/libs/utils/notification';

import styles from './PatchNote.module.scss';

const PatchNote = () => {
  useEffect(() => {
    const LOCAL_STORAGE_KEY = 'latestPatchNoteCheckedDate';

    const latestPatchDate = new Date(
      Object.keys(patches).sort()[Object.keys(patches).length - 1]
    );
    const latestCheckedDateString = localStorage.getItem(LOCAL_STORAGE_KEY);
    const latestCheckedDate = latestCheckedDateString
      ? new Date(latestCheckedDateString)
      : null;

    if (latestCheckedDate) {
      latestCheckedDate.setHours(0, 0, 0, 0);
      latestPatchDate.setHours(0, 0, 0, 0);
    }

    if (
      !latestCheckedDate ||
      latestCheckedDate.getTime() < latestPatchDate.getTime()
    ) {
      notifySuccess(
        `패치노트가 업데이트되었습니다. [${latestPatchDate.toLocaleDateString()}]`,
        { preserve: true }
      );
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      latestPatchDate.toLocaleDateString()
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>패치노트</h1>
      <div className={styles.contents}>
        {Object.entries(patches).map(([date, contents]) => (
          <ul key={date} className={styles.list}>
            <h2 className={styles.date}>{date}</h2>
            {contents.map((content) => (
              <li key={content}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default PatchNote;
