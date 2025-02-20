// Common types used across files
export interface TabData {
  sheetName: string;
  headers: string[];
  data: any[][];
}

export interface Broker {
  name: string;
  system: number;
  broker: number;
  difference: number;
}

export interface Holding {
  symbol: string;
  brokers: Broker[];
} 