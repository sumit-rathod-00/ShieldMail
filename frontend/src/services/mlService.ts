export const ML_SERVICE_URL = 'http://localhost:8000';

export const mlService = {
  predictEmail: async (data: any) => {
    const res = await fetch(`${ML_SERVICE_URL}/predict/email`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  },
  predictURL: async (data: any) => {
    const res = await fetch(`${ML_SERVICE_URL}/predict/url`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }
};
