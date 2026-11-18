import Link from "next/link";
import { notFound } from "next/navigation";
import { after } from "next/server";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import { getQuestion } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { Metadata } from "next";
import ROUTES from "@/constants/routes";
import TagCard from "@/components/cards/TagCard";
import { Preview } from "@/components/editor/Preview";
import { incrementQuestionViews } from "@/lib/actions/view.action";
import AnswerForm from "@/components/forms/AnswerForm";
import { getAnswers } from "@/lib/actions/answer.action";
import AllAnswers from "@/components/answers/AllAnswers";
import { Suspense } from "react";
import Votes from "@/components/votes/Votes";
import SaveQuestion from "@/components/questions/SaveQuestion";
import { hasVoted } from "@/lib/actions/vote.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { questionId } = await params;

  const { success, data: question } = await getQuestion({ questionId });

  if (!success || !question) {
    return {
      title: "Question not found",
      description: "This question does not exist.",
    };
  }

  return {
    title: question.title,
    description: question.content.slice(0, 100),
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.content.slice(0, 100),
    },
  };
}

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { questionId } = await params;
  const { page, pageSize, filter } = await searchParams;

  const { success, data: question } = await getQuestion({ questionId });

  const {
    success: areAnswersLoaded,
    data: answersResult,
    error: answersError,
  } = await getAnswers({
    questionId,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter,
  });

  after(async () => {
    await incrementQuestionViews({ questionId });
  });

  if (!success || !question) notFound();

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });

  const hasSavedQuestionPromise = hasSavedQuestion({
    questionId: question._id,
  });

  const {
    _id,
    author,
    createdAt,
    answers,
    views,
    tags,
    content,
    title,
    upvotes,
    downvotes,
  } = question;

  return (
    <div className="mx-4 my-3 sm:mx-2 sm:my-0">
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              userId={author._id}
              name={author.name}
              imgUrl={author.image}
              className="size-5.5"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-4 mr-8 flex w-full items-center justify-end gap-4 sm:mt-7 sm:mr-10">
          <Suspense fallback={<div>Loading...</div>}>
            <Votes
              targetType="question"
              upvotes={upvotes}
              downvotes={downvotes}
              targetId={_id}
              hasVotedPromise={hasVotedPromise}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <SaveQuestion
              questionId={_id}
              hasSavedQuestionPromise={hasSavedQuestionPromise}
            />
          </Suspense>
        </div>

        <h2 className="h3-semibold sm:h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mt-5 mb-8 flex flex-wrap gap-4">
        <Metric
          imgSrc="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyle="small-regular text-dark400_light700"
        />
        <Metric
          imgSrc="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyle="small-regular text-dark400_light700"
        />
        <Metric
          imgSrc="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title=""
          textStyle="small-regular text-dark400_light700"
        />
      </div>
      <Preview content={content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
      <section className="my-5">
        <AllAnswers
          page={Number(page) || 1}
          isNext={answersResult?.isNext || false}
          data={answersResult?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answersResult?.totalAnswers || 0}
        />
      </section>
      <section className="my-5">
        <AnswerForm questionId={question._id} />
      </section>
    </div>
  );
};

export default QuestionDetails;
