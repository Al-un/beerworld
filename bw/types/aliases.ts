/**
 * Counts are expected to be positive and reaching potentially high numbers 
 */
export type Count = number;

/**
 * IDs cannot be assumed to be digit only as some DB or some back-ends can
 * use string
 */
export type PrimaryKey = string | number;

/**
 * Use a string alias to explicitly require an URL
 */
export type UrlLink = string;
