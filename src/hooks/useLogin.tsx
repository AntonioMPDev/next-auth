import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    const res = await signIn('credentials', { ...data, redirect: false });
    if (res?.error) {
      console.log(res.error);
      setError(res.error);
      setLoading(false);
    }

    if (res?.ok && !res?.error) {
      setLoading(false);
      router.push('/dashboard');
    }
  };

  const googleLogin = () => signIn('google');

  return { loading, error, setError, login, googleLogin };
}
