import styles from './Profile.module.scss';

interface ProfileProps {
  image: string;
}

const Profile: React.FC<ProfileProps> = ({ image }) => {
  return <img src={image} alt="profile" className={styles.profile} />;
};

export default Profile;
