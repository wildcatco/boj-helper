import styles from './index.module.scss';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';

const ErrorPage500 = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.message}>에러가 발생했습니다</h1>
        <Button href="/">홈으로 돌아가기</Button>
      </div>
    </Layout>
  );
};

export default ErrorPage500;
