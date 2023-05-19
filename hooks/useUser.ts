import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    isLoggedIn: status === 'authenticated',
    isLoading: status === 'loading',
  };
};

export default useUser;
