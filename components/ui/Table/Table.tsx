import styles from './Table.module.scss';

interface TableProps {
  header: { name: string; width: string; center: boolean }[];
  data: {
    id: string;
    contents: string[];
    onClick: () => void;
  }[];
}

const Table: React.FC<TableProps> = ({ header, data }) => {
  const widths = header.map((h) => h.width);
  const centers = header.map((h) => h.center);

  return (
    <div className={styles.table}>
      <TableHeader header={header} />
      <div className={styles.tableBody}>
        {data.map((row) => (
          <TableRow
            key={row.id}
            content={row.contents}
            onClick={row.onClick}
            widths={widths}
            centers={centers}
          />
        ))}
      </div>
    </div>
  );
};

interface TableHeaderProps {
  header: { name: string; width: string; center: boolean }[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ header }) => {
  return (
    <div className={styles.tableHeader}>
      {header.map((h) => (
        <div key={h.name} style={{ width: h.width }}>
          {h.name}
        </div>
      ))}
    </div>
  );
};

interface TableRowProps {
  content: string[];
  onClick: () => void;
  widths: string[];
  centers: boolean[];
}

const TableRow: React.FC<TableRowProps> = ({
  content,
  onClick,
  widths,
  centers,
}) => {
  return (
    <div className={styles.tableRow} onClick={onClick}>
      {content.map((c, index) => (
        <div
          key={index}
          style={{ width: widths[index] }}
          className={`${styles.data} ${centers[index] && styles.center}`}
        >
          {c}
        </div>
      ))}
    </div>
  );
};

export default Table;
