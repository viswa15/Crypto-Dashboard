// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { mockCoins } from './data';

const API_URL = 'https://api.coingecko.com/api/v3';

export const handlers = [
  // Mock for the main coin list
  http.get(`${API_URL}/coins/markets`, () => {
    return HttpResponse.json(mockCoins);
  }),

  // Add other handlers for trending, etc. as needed
];