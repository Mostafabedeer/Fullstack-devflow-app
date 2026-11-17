import Image from "next/image";
import type { ReactNode } from "react";
import { FileQuestionMark, MessagesSquare } from "lucide-react";

import { formatNumber } from "@/lib/utils";

interface StatsCardProps {
  icon: ReactNode;
  value: number;
  title: string;
}

const StatsCard = ({ icon, value, title }: StatsCardProps) => {
  return (
    <div className="group light-border background-light900_dark300 shadow-light100_dark100 flex min-h-32 flex-col justify-between rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="small-semibold text-dark400_light700">{title}</p>
        <div className="background-light800_dark300 text-primary-500 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-primary-100 dark:group-hover:bg-dark-400">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-3xl leading-none font-bold tracking-tight text-dark200_light900">
        {formatNumber(value)}
      </p>
    </div>
  );
};

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: Badges;
  reputationPoints: number;
}

const Stats = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputationPoints,
}: Props) => {
  return (
    <section className="mt-10" aria-labelledby="profile-stats-heading">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="profile-stats-heading"
            className="h3-semibold text-dark200_light900"
          >
            Stats
          </h2>
          <p className="small-regular mt-1 text-dark400_light800">
            Activity and badges at a glance.
          </p>
        </div>

        <div className="background-light800_dark300 flex items-center gap-2 rounded-full border light-border px-4 py-2">
          <span className="small-medium text-dark400_light800">Reputation</span>
          <span className="paragraph-semibold primary-text-gradient">
            {formatNumber(reputationPoints)}
          </span>
        </div>
      </div>

      <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 xl:grid-cols-5 sm:gap-4">
        <StatsCard
          icon={<FileQuestionMark aria-hidden="true" className="size-5" />}
          value={totalQuestions}
          title="Questions"
        />
        <StatsCard
          icon={<MessagesSquare aria-hidden="true" className="size-5" />}
          value={totalAnswers}
          title="Answers"
        />
        <StatsCard
          icon={
            <Image
              src="/icons/gold-medal.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={36}
              className="size-9 object-contain"
            />
          }
          value={badges.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          icon={
            <Image
              src="/icons/silver-medal.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={36}
              className="size-9 object-contain"
            />
          }
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          icon={
            <Image
              src="/icons/bronze-medal.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={36}
              className="size-9 object-contain"
            />
          }
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </section>
  );
};

export default Stats;
