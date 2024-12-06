import { API_BASE_URL } from "../config";

export interface DeleteCompletitionRequest {
 completitionId: string;
}

export async function deleteCompletition({
 completitionId,
}: DeleteCompletitionRequest): Promise<void> {
 const response = await fetch(
  `${API_BASE_URL}/delete-completition/${completitionId}`,
  {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json",
   },
  }
 );

 if (!response.ok) {
  throw new Error("Error while deleting the completition");
 }
}
