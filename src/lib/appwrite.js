import { Client, Account, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Helper function to retry requests in case of network issues
export const withRetry = async (fn, retries = 2, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    // Only retry for network-related errors
    if (
      retries > 0 && 
      (error.code === 'unknown_error' || 
       error.code === 'network_error' ||
       error.code === 'service_unavailable')
    ) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
};

export { client };
