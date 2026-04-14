const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getApiMessage() {
  const response = await fetch(`${apiBaseUrl}/api/message`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
