import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import DataRenderer from "./DataRenderer";
import { getHotQuestions } from "@/lib/actions/question.action";

async function HotNetwork() {
  const { success, data: hotQuestions, error } = await getHotQuestions();

  return (
    <div className="background-light900_dark200 border-dark100_light900 custom-scrollbar light-border shadow-light-300 sticky top-0 right-0 col-span-2 col-start-7 row-span-2 row-start-2 hidden flex-col gap-6 overflow-hidden rounded-lg border p-6 xl:flex dark:shadow-none">
      <h2 className="text-dark200_light900 mb-4 shrink-0 text-lg font-bold">
        Hot Network
      </h2>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="flex w-full flex-col gap-6">
              {hotQuestions.map(({ _id, title }) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {title}
                  </p>

                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default HotNetwork;
