import { COMMON_URLS } from '@/constants';
import { LoginContext } from '@/context/LoginContext';
import { api } from '@/libs/api-rest/client';
import { useContext, useState } from 'react';

export default function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setDialog } = useContext(LoginContext);

  const forgotPassword = async (data: { email: string }) => {
    setLoading(true);

    const res = await api(`/api${COMMON_URLS.forgotPassword}`).post(data);

    if (res?.error) {
      console.log(res.error);
      setError(res.error);
      setLoading(false);
    }

    if (res?.data?.ok && !res?.error) {
      setDialog(true);
    }
  };

  return { loading, error, setError, forgotPassword };
}
