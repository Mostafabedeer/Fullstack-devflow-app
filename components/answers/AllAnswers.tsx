import { auth } from "@/auth";
import { EMPTY_ANSWERS } from "@/constants/states";

import DataRenderer from "../DataRenderer";

import AnswerCard from "../cards/AnswerCard";
import Pagination from "../Pagination";
import { AnswerFilters } from "@/constants/filters";
import CommonFilter from "../filter/CommonFilter";

interface Props extends ActionResponse<Answer[]> {
  page: number;
  isNext: boolean;
  totalAnswers: number;
}

const AllAnswers = async ({
  page,
  isNext,
  data,
  success,
  error,
  totalAnswers,
}: Props) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <CommonFilter filters={AnswerFilters} otherClasses="sm:min-w-32" />
      </div>

      <DataRenderer
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => (
            <AnswerCard
              key={answer._id}
              {...answer}
              showActionBtns={currentUserId === String(answer.author._id)}
            />
          ))
        }
      />

      <Pagination page={page} isNext={isNext} />
    </div>
  );
};

export default AllAnswers;
