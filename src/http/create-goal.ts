import { API_BASE_URL } from "../config";

export interface CreateGoalRequest {
 title: string;
 desiredWeeklyFrequency: number;
}

export async function createGoal({
 title,
 desiredWeeklyFrequency,
}: CreateGoalRequest): Promise<void> {
 const response = await fetch(`${API_BASE_URL}/goals`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({
   title,
   desiredWeeklyFrequency,
  }),
 });

 if (!response.ok) {
  throw new Error("Error while creating the goal");
 }
}
