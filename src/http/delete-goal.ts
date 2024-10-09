export interface DeleteGoalRequest {
  goalId: string
}

export async function deleteGoal({ goalId }: DeleteGoalRequest): Promise<void> {
  const response = await fetch('http://localhost:3333/delete-goal', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })

  if (!response.ok) {
    throw new Error('Error while deleing the goal')
  }
}
