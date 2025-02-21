import axios, { AxiosError } from 'axios';
import { client } from './smartcore.service.js';
import logger from '../utils/logger.js';
import { Holding, ApiError, Investment } from '../common/types';

/**
 * Interface for holdings response
 * Update this interface according to your actual API response structure
 */
interface Holdings {
  // Add your holdings response type here
  [key: string]: any;
}

/**
 * Interface for cash response
 */
interface Cash {
  // Add your cash response type here
  [key: string]: any;
}

/**
 * Interface for transaction response
 */
interface Transaction {
  // Add your transaction response type here
  [key: string]: any;
}

/**
 * API Endpoints
 */
const ENDPOINTS = {
  HOLDINGS: (id: string) => `/api/v1/reconciliations/${id}/holdings`,
  CASH: (id: string) => `/api/v1/reconciliations/${id}/cash`,  // New endpoint
  INVESTMENTS: '/api/v1/investments/',  // New endpoint
  TRANSACTIONS: '/api/v1/transactions/',  // New endpoint
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

/**
 * Get cash data for a specific reconciliation
 * @param reconciliationId - The ID of the reconciliation
 * @returns Promise<Cash>
 * 
 * @example
 * const cash = await getReconciliationCash('52');
 */
export const getReconciliationCash = async (reconciliationId: string): Promise<Cash> => {
  try {
    logger.info(`Fetching cash data for reconciliation ID: ${reconciliationId}`);
    
    const response = await client.get<Cash>(
      ENDPOINTS.CASH(reconciliationId),
      {
        headers: {
          'accept': 'application/json'
        }
      }
    );

    logger.info(`Successfully retrieved cash data for reconciliation ID: ${reconciliationId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorInfo = {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        reconciliationId
      };
      logger.error(`Failed to fetch cash data: ${JSON.stringify(errorInfo, null, 2)}`);
    } else {
      logger.error(`Unexpected error while fetching cash data: ${JSON.stringify(error, null, 2)}`);
    }
    throw error;
  }
};

/**
 * Get investments data with pagination
 * @returns Promise<Investment[]>
 */
export const getInvestments = async (): Promise<Investment[]> => {
  try {
    logger.info('Fetching investments data');
    
    const response = await client.get<{ data: Investment[] }>(
      ENDPOINTS.INVESTMENTS,
      {
        headers: {
          'accept': 'application/json'
        },
        params: {
          sort_order: 'desc',
          hard_refresh: false,
          page_number: 1,
          page_size: 100000
        }
      }
    );

    logger.info('Successfully retrieved investments data');
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorInfo = {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message
      };
      logger.error(`Failed to fetch investments: ${JSON.stringify(errorInfo, null, 2)}`);
    } else {
      logger.error(`Unexpected error while fetching investments: ${JSON.stringify(error, null, 2)}`);
    }
    throw error;
  }
};

/**
 * Get all transactions with pagination
 */
export const getTransactions = async (pageSize = 100000, pageNumber = 1, sortOrder = 'desc'): Promise<Transaction[]> => {
  const params = new URLSearchParams({
    sort_order: sortOrder,
    page_number: pageNumber.toString(),
    page_size: pageSize.toString()
  });

  try {
    logger.info('Fetching transactions data');
    
    const response = await client.get<{ data: Transaction[] }>(
      ENDPOINTS.TRANSACTIONS,
      {
        headers: {
          'accept': 'application/json'
        },
        params: params
      }
    );

    logger.info('Successfully retrieved transactions data');
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorInfo = {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message
      };
      logger.error(`Failed to fetch transactions: ${JSON.stringify(errorInfo, null, 2)}`);
    } else {
      logger.error(`Unexpected error while fetching transactions: ${JSON.stringify(error, null, 2)}`);
    }
    throw error;
  }
};

// Export all API functions
export const smartcoreApi = {
  getReconciliationHoldings,
  getReconciliationCash,
  getInvestments,
  getTransactions,
  // Add other functions here as they are created
}; 