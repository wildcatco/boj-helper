import patches from './patches.json';

import styles from './PatchNote.module.scss';

const PatchNote = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>패치노트</h1>
      <div className={styles.contents}>
        {Object.entries(patches).map(([date, contents]) => (
          <ul key={date} className={styles.list}>
            <h2 className={styles.date}>{date}</h2>
            {contents.map((content) => (
              <li key={content}>{content}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default PatchNote;
