interface BootstrapWrapperProps {
  html: string;
  tag: 'div' | 'pre';
}

const BootstrapWrapper: React.FC<BootstrapWrapperProps> = ({ html, tag }) => {
  if (tag === 'div') {
    return (
      <div className="bootstrap" dangerouslySetInnerHTML={{ __html: html }} />
    );
  } else {
    return (
      <div className="bootstrap">
        <pre dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
};

export default BootstrapWrapper;
