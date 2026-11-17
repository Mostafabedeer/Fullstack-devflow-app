"use server";

import { Question } from "@/database";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { IncrementViewsSchema } from "../validations";

export async function incrementQuestionViews(
  params: incrementVeiwsParams,
): Promise<ActionResponse<{ views: number }>> {
  const validatedResult = await action({
    params,
    schema: IncrementViewsSchema,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { questionId } = validatedResult.params!;

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    question.views += 1;
    await question.save();

    return { success: true, data: { views: question.views } };
  } catch (error) {
    return handleError(error as Error) as ErrorResponse;
  }
}
