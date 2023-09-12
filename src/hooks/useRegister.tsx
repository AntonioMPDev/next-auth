import { LoginContext } from '@/context/LoginContext';
import { api } from '@/libs/api-rest/client';
import { useContext, useState } from 'react';

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setDialog } = useContext(LoginContext);

  const register = async (data: { email: string; password: string }) => {
    setLoading(true);

    const res = await api('/api/register').post(data);

    if (res?.error) {
      console.log(res.error);
      setError(res.error);
      setLoading(false);
    }

    if (res?.data?.ok && !res?.error) {
      setDialog(true);
    }
  };

  return { loading, error, setError, register };
}
