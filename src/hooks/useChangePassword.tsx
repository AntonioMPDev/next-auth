import { api } from '@/libs/api-rest/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const changePassword = async (data: { password: string; token: string }) => {
    setLoading(true);

    const res = await api(`/api/changePassword/${data.token}`).post(data);

    if (res?.error) {
      console.log(res.error);
      setError(res.error);
      setLoading(false);
    }

    if (res?.data?.ok && !res?.error) {
      router.push('/login');
    }
  };

  return { loading, error, setError, changePassword };
}
