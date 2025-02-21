// Common types used across files
export interface TabData {
  sheetName: string;
  headers: string[];
  data: any[][];
  columnStyles?: { [key: number]: CellStyle };
}

export interface CellStyle {
  fill?: {
    type: 'pattern';
    pattern: 'solid';
    fgColor: { argb: string };
  };
  font?: {
    color?: { argb: string };
    bold?: boolean;
  };
  alignment?: {
    horizontal?: 'left' | 'center' | 'right';
    vertical?: 'top' | 'middle' | 'bottom';
  };
  numFmt?: string;
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

// Service types
export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// API client configuration
export interface ApiConfig {
  baseURL: string;
  headers: {
    'Content-Type': string;
    'Accept': string;
    'Authorization'?: string;
  };
}

// Error types
export interface ApiError {
  status?: number;
  message: string;
  code?: string;
  url?: string;
  data?: any;
}



export type Investment = {
  id: number;
  created_at: string;
  updated_at: string;
  tag: string;
  label: string;
  category: string;
  note: string;
  user_id: number;
  manager_id: number | null;
  admin_id: number;
  amount: number;
  status: string;
  display_status: string;
  flag: string;
  currency: string;
  integer_quantities: boolean;
  integer_quantities_algorithm: string;
  rebalancing: boolean;
  frequency: string;
  stop_loss: number;
  take_profit: number;
  stop_loss_pct: number;
  take_profit_pct: number;
  default_benchmark: any;
  display_rank: number;
  management_fees: number;
  maximum_periods_without_rebalancing: number;
  minimum_transaction_lot_per_symbol: number;
  minimum_transaction_volume: number;
  minimum_transaction_volume_per_symbol: number;
  minimum_investment_amount: number;
  investment_type: string;
  account_id: number;
  strategy_id: number;
  smartfolio_id: number;
  current_nav: number;
  cash_residual: number;
  risk_solution: string;
  meta: string;
  broker_id: number | null;
  opened_at: string | null;
  canceled_at: string | null;
  latest_rebalancing_date: string | null;
  exited_at: string | null;
  phis: number[];
  performances: {
    category: string;
    three_years_return: number;
    month2date_return: number;
    sharpe_ratio: number;
    tracking_error: number | null;
    date: string;
    note: string;
    five_years_return: number;
    quarter2date_return: number;
    avg_return: number;
    batting_average: number | null;
    user_id: number | null;
    one_day_return: number;
    overall_return_pct: number;
    year2date_return: number;
    adjusted_sortino: number | null;
    annualized_average_return: number;
    manager_id: number | null;
    created_at: string;
    one_week_return: number;
    overall_return_amount: number;
    volatity_30d: number;
    information_ratio: number | null;
    cagr: number | null;
    admin_id: number;
    id: number;
    one_month_return: number;
    sortino_ratio: number;
    expected_shortfall: number | null;
    value_at_risk: number;
    calmar_ratio: number | null;
    strategy_id: number;
    updated_at: string;
    three_months_return: number;
    downside_volatility: number;
    volatity_60d: number;
    alpha: number | null;
    kurtosis: number;
    tag: string;
    six_months_return: number;
    downside_return: number;
    volatity_90d: number;
    beta: number | null;
    kelly_criterion: number | null;
    label: string;
    one_year_return: number;
    week2date_return: number;
    volatity_120d: number;
    spark_line_12_month: { [key: string]: number };
  };
  user: {
    secondary_email: string;
    profession_area: string | null;
    admin_id: number;
    created_at: string;
    date_of_birth: string;
    position: string;
    id: number;
    phone: string;
    number_of_children: number;
    updated_at: string;
    passport_expiry_date: string;
    annual_income: number;
    first_name: string;
    passport_number: string | null;
    status: string;
    last_name: string;
    passport_country_issuance: string | null;
    segment: string;
    email: string;
    marital_status: string | null;
    meta: string;
    profession: string;
    broker_id: number | null;
  };
  strategy: {
    id: number;
    created_at: string;
    updated_at: string;
    tag: string;
    label: string;
    category: string;
    note: string;
    user_id: number | null;
    manager_id: number | null;
    admin_id: number;
    name: string;
    description: string;
    solution_id: number;
    basket_id: number;
    integer_quantities: boolean;
    integer_quantities_algorithm: string;
    rebalancing: boolean;
    frequency: string;
    stop_loss: number;
    take_profit: number;
    default_benchmark: any;
    maximum_periods_without_rebalancing: number;
    minimum_investment_amount: number;
    managment_fees: number;
    solution: {
      id: number;
      name: string;
      user_id: number | null;
      admin_id: number;
      updated_at: string;
      created_at: string;
      description: string;
      manager_id: number;
      model_id: number;
    };
    basket: {
      id: number;
      created_at: string;
      updated_at: string;
      name: string;
      description: string;
      user_id: number | null;
      manager_id: number;
      admin_id: number;
      basket_items: {
        id: number;
        created_at: string;
        updated_at: string;
        weight: number;
        ticker_id: number;
        display_weight: number;
        maximum_bound_weight: number;
        minimum_bound_weight: number;
        basket_id: number;
        ticker: {
          id: number;
          symbol: string;
          portal_name: string;
          price: object;
        };
      }[];
      basket_compositions: {
        sectors: {
          weight: number;
          sector_id: number;
          content: {
            updated_at: string;
            sector_label: string;
            created_at: string;
            industry_group_label: string;
            industry_label: string;
            sub_industry_label: string;
            sector: number;
            id: number;
            industry_group: number;
            industry: number;
            sub_industry: number;
            sub_industry_description: string;
            display_name: string;
          };
        }[];
        asset_classes: {
          weight: number;
          asset_class_id: number;
          content: {
            created_at: string;
            updated_at: string;
            sub_asset_class: string;
            description: string;
            id: number;
            name: string;
            type: string;
            display_name: string;
          };
        }[];
        regions: {
          weight: number;
          region_id: number;
          content: {
            created_at: string;
            updated_at: string;
            country_code: string;
            description: string;
            id: number;
            country: string;
            region: string;
            display_name: string;
          };
        }[];
        top_holdings: any[];
        currencies: any[];
      };
    };
    performances: {
      category: string;
      three_years_return: number;
      month2date_return: number;
      sharpe_ratio: number;
      tracking_error: number | null;
      date: string;
      note: string;
      five_years_return: number;
      quarter2date_return: number;
      avg_return: number;
      batting_average: number | null;
      user_id: number | null;
      one_day_return: number;
      overall_return_pct: number;
      year2date_return: number;
      adjusted_sortino: number | null;
      annualized_average_return: number;
      manager_id: number | null;
      created_at: string;
      one_week_return: number;
      overall_return_amount: number;
      volatity_30d: number;
      information_ratio: number | null;
      cagr: number | null;
      admin_id: number;
      id: number;
      one_month_return: number;
      sortino_ratio: number;
      expected_shortfall: number | null;
      value_at_risk: number;
      calmar_ratio: number | null;
      strategy_id: number;
      updated_at: string;
      three_months_return: number;
      downside_volatility: number;
      volatity_60d: number;
      alpha: number | null;
      kurtosis: number;
      tag: string;
      six_months_return: number;
      downside_return: number;
      volatity_90d: number;
      beta: number | null;
      kelly_criterion: number | null;
      label: string;
      one_year_return: number;
      week2date_return: number;
      volatity_120d: number;
      spark_line_12_month: { [key: string]: number };
    };
  };
  smartfolio: {
    id: number;
    created_at: string;
    updated_at: string;
    tag: string;
    label: string;
    category: string;
    note: string;
    user_id: number | null;
    manager_id: number | null;
    admin_id: number;
    display_name: string;
    description: string;
    strategy_id: number;
    minimum_investment_amount: number;
    managment_fees: number;
    lineage_id: string;
    source: string;
    strategy: {
      id: number;
      created_at: string;
      updated_at: string;
      tag: string;
      label: string;
      category: string;
      note: string;
      user_id: number | null;
      manager_id: number | null;
      admin_id: number;
      name: string;
      description: string;
      solution_id: number;
      basket_id: number;
      integer_quantities: boolean;
      integer_quantities_algorithm: string;
      rebalancing: boolean;
      frequency: string;
      stop_loss: number;
      take_profit: number;
      default_benchmark: any;
      maximum_periods_without_rebalancing: number;
      minimum_investment_amount: number;
      managment_fees: number;
      solution: {
        id: number;
        name: string;
        user_id: number | null;
        admin_id: number;
        updated_at: string;
        created_at: string;
        description: string;
        manager_id: number;
        model_id: number;
      };
      basket: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        description: string;
        user_id: number | null;
        manager_id: number;
        admin_id: number;
        basket_items: {
          id: number;
          created_at: string;
          updated_at: string;
          weight: number;
          ticker_id: number;
          display_weight: number;
          maximum_bound_weight: number;
          minimum_bound_weight: number;
          basket_id: number;
          ticker: {
            id: number;
            symbol: string;
            portal_name: string;
            price: object;
          };
        }[];
        basket_compositions: {
          sectors: {
            weight: number;
            sector_id: number;
            content: {
              updated_at: string;
              sector_label: string;
              created_at: string;
              industry_group_label: string;
              industry_label: string;
              sub_industry_label: string;
              sector: number;
              id: number;
              industry_group: number;
              industry: number;
              sub_industry: number;
              sub_industry_description: string;
              display_name: string;
            };
          }[];
          asset_classes: {
            weight: number;
            asset_class_id: number;
            content: {
              created_at: string;
              updated_at: string;
              sub_asset_class: string;
              description: string;
              id: number;
              name: string;
              type: string;
              display_name: string;
            };
          }[];
          regions: {
            weight: number;
            region_id: number;
            content: {
              created_at: string;
              updated_at: string;
              country_code: string;
              description: string;
              id: number;
              country: string;
              region: string;
              display_name: string;
            };
          }[];
          top_holdings: any[];
          currencies: any[];
        };
      };
      performances: {
        category: string;
        three_years_return: number;
        month2date_return: number;
        sharpe_ratio: number;
        tracking_error: number | null;
        date: string;
        note: string;
        five_years_return: number;
        quarter2date_return: number;
        avg_return: number;
        batting_average: number | null;
        user_id: number | null;
        one_day_return: number;
        overall_return_pct: number;
        year2date_return: number;
        adjusted_sortino: number | null;
        annualized_average_return: number;
        manager_id: number | null;
        created_at: string;
        one_week_return: number;
        overall_return_amount: number;
        volatity_30d: number;
        information_ratio: number | null;
        cagr: number | null;
        admin_id: number;
        id: number;
        one_month_return: number;
        sortino_ratio: number;
        expected_shortfall: number | null;
        value_at_risk: number;
        calmar_ratio: number | null;
        strategy_id: number;
        updated_at: string;
        three_months_return: number;
        downside_volatility: number;
        volatity_60d: number;
        alpha: number | null;
        kurtosis: number;
        tag: string;
        six_months_return: number;
        downside_return: number;
        volatity_90d: number;
        beta: number | null;
        kelly_criterion: number | null;
        label: string;
        one_year_return: number;
        week2date_return: number;
        volatity_120d: number;
        spark_line_12_month: { [key: string]: number };
      };
    };
    performances: {
      category: string;
      three_years_return: number;
      week2date_return: number;
      volatity_120d: number;
      tracking_error: number | null;
      date: string;
      note: string;
      five_years_return: number;
      month2date_return: number;
      sharpe_ratio: number;
      batting_average: number | null;
      user_id: number | null;
      one_day_return: number;
      overall_return_pct: number;
      quarter2date_return: number;
      avg_return: number;
      annualized_average_return: number;
      manager_id: number | null;
      created_at: string;
      one_week_return: number;
      overall_return_amount: number;
      year2date_return: number;
      adjusted_sortino: number | null;
      cagr: number | null;
      admin_id: number;
      id: number;
      one_month_return: number;
      sortino_ratio: number;
      volatity_30d: number;
      information_ratio: number | null;
      calmar_ratio: number | null;
      smartfolio_id: number;
      updated_at: string;
      three_months_return: number;
      downside_volatility: number;
      volatity_60d: number;
      alpha: number | null;
      kurtosis: number;
      tag: string;
      six_months_return: number;
      downside_return: number;
      volatity_90d: number;
      beta: number | null;
      kelly_criterion: number | null;
      label: string;
      one_year_return: number;
      spark_line_12_month: { [key: string]: number };
    };
    status: string;
    tradable: boolean;
    user: any;
  };
  sl_tp_reference_nav: number;
  portfolios: any[];
  orders: any[];
  account: {
    id: number;
    created_at: string;
    updated_at: string;
    tag: string;
    label: string;
    category: string;
    note: string;
    user_id: number;
    admin_id: number;
    manager_id: number | null;
    meta: string;
    aggregated_rebates: number;
    reserved: number;
    credit: number;
    debit: number;
    balance: number;
    available: number;
    use_aggregator: boolean;
    margin_allowed: boolean;
    short_selling_allowed: boolean;
    minimum_trading_amount: number;
    margin_limit: number;
    currency: string;
    status: string;
  };
};


export type Cash = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  accounts: {
    id: number;
    currency: string;
    system: {
      balance: number;
      available: number;
      credit: number;
      debit: number;
      reserved: number;
    };
    activity: {
      balance: number;
      available: number;
      credit: number;
      debit: number;
      reserved: number;
    };
    difference: {
      balance: number;
      available: number;
      credit: number;
      debit: number;
      reserved: number;
    };
    reconciled: boolean;
  }[];
  investments?: Investment[];
};

export interface Transaction {
    id: number;
    created_at: string;
    updated_at: string;
    tag: string;
    label: string;
    category: string;
    note: string;
    user_id: number;
    manager_id: number | null;
    admin_id: number;
    amount: number;
    side: string;
    investment_id: number;
    private_investment_id: number | null;
    investment_event_id: number | null;
    order_id: number | null;
    account_id: number;
    dividend_id: number | null;
    capitalcall_id: number | null;
    cashback_id: number | null;
    split_event_id: number | null;
    status: string;
    request_id: number | null;
    request_msg: string | null;
    reference: string | null;
    currency: string;
};