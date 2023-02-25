/**
 * Interface for the 'Insights' data
 */
export interface InsightsEntity {
  id: string | number; // Primary ID
  name: string;
}

export type InsightsFilters = {
  dateStart: string,
  dateEnd: string,
  sets: any[]
}