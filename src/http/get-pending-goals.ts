import { API_BASE_URL } from "../config";

export interface GetPendingGoalsResponse {
 pendingGoals: {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
 }[];
}

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
 const response = await fetch(`${API_BASE_URL}/pending-goals`);
 const data = await response.json();

 return data;
}
