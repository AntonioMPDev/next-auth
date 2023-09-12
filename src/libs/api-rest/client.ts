const client = fetch;

export function api(url: string, headers: object = {}) {
  const post = async (body: object) => {
    const res = await client(url, {
      method: 'POST',
      headers: { ...headers },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return {
      error: data?.error ?? null,
      data: data?.ok ? data : null,
    };
  };
  return {
    post,
  };
}
