import axios, { AxiosError } from 'axios';
import { client } from './smartcore.service.js';
import logger from '../utils/logger.js';
import { Holding, ApiError } from '../common/types';

/**
 * Interface for holdings response
 * Update this interface according to your actual API response structure
 */
interface Holdings {
  // Add your holdings response type here
  [key: string]: any;
}

/**
 * API Endpoints
 */
const ENDPOINTS = {
  HOLDINGS: (id: string) => `/api/v1/reconciliations/${id}/holdings`,
  // Add other endpoints here as needed
} as const;

/**
 * Get holdings for a specific reconciliation
 * @param reconciliationId - The ID of the reconciliation
 * @returns Promise<Holdings>
 * 
 * @example
 * const holdings = await getReconciliationHoldings('123');
 */
export const getReconciliationHoldings = async (reconciliationId: string): Promise<Holdings> => {
  try {
    logger.info(`Fetching holdings for reconciliation ID: ${reconciliationId}`);
    
    const response = await client.get<Holdings>(
      ENDPOINTS.HOLDINGS(reconciliationId),
      {
        headers: {
          'accept': 'application/json'
        }
      }
    );

    logger.info(`Successfully retrieved holdings for reconciliation ID: ${reconciliationId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorInfo = {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        reconciliationId
      };
      logger.error(`Failed to fetch holdings: ${JSON.stringify(errorInfo, null, 2)}`);
    } else {
      logger.error(`Unexpected error while fetching holdings: ${JSON.stringify(error, null, 2)}`);
    }
    throw error;
  }
};


// Export all API functions
export const smartcoreApi = {
  getReconciliationHoldings,
  // Add other functions here as they are created
}; 