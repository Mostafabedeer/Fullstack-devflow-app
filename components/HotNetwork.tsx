import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import DataRenderer from "./DataRenderer";
import { getHotQuestions } from "@/lib/actions/question.action";

async function HotNetwork() {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  return (
    <div className="background-light900_dark200 border-dark100_light900 custom-scrollbar light-border shadow-light-300 sticky top-0 right-0 col-span-2 col-start-7 row-span-2 row-start-2 hidden h-full w-87.5 flex-col gap-6 overflow-y-auto rounded-lg border border-l p-6 pt-36 max-xl:hidden md:hidden lg:block dark:shadow-none">
      <h2 className="ext-dark200_light900 mb-4 text-lg font-bold">
        Hot Network
      </h2>

      <DataRenderer
        data={hotQuestions}
        empty={{
          title: "No questions found",
          message: "No questions have been asked yet.",
        }}
        success={success}
        error={error}
        render={(hotQuestions) => (
          <div className="mt-7 flex w-full flex-col gap-8">
            {hotQuestions.map(({ _id, title }) => (
              <Link
                key={_id}
                href={ROUTES.QUESTION(_id)}
                className="mb-5 flex cursor-pointer items-center justify-between gap-7"
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
  );
}

export default HotNetwork;
