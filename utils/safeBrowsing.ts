export async function checkUrlSafety(url: string): Promise<'safe' | 'unsafe'> {
  const apiKey = 'AIzaSyBSuYKkVPoOPfAThUY2ip65mTg_HKF2dWc'; // replace this with your actual API key
  const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const payload = {
    client: {
      clientId: 'phishguard',
      clientVersion: '1.0',
    },
    threatInfo: {
      threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: [{ url }],
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data && data.matches ? 'unsafe' : 'safe';
}
