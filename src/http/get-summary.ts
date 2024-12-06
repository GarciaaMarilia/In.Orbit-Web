import { API_BASE_URL } from "../config";

export interface GetSummaryResponse {
 summary: {
  completed: number;
  total: number;
  goalsPerDay: Record<
   string,
   {
    id: string;
    title: string;
    createdAt: string;
   }[]
  >;
 };
}

export async function getSummary(): Promise<GetSummaryResponse> {
 const response = await fetch(`${API_BASE_URL}/summary`);
 const data = await response.json();

 return data;
}
