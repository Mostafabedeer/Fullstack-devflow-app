import TagCard from "./cards/TagCard";
import DataRenderer from "./DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

async function PopularTags() {
  const {
    success: tagSuccess,
    data: tags,
    error: tagError,
  } = await getTopTags();
  return (
    <div className="sm:start border-dark100_light900 background-light900_dark200 col-span-2 col-start-7 row-span-2 row-start-4 hidden min-h-0 flex-col overflow-hidden rounded-lg border p-4 lg:flex">
      <h2 className="text-dark200_light900 mb-4 shrink-0 text-lg font-bold">
        Popular Tags
      </h2>
      <DataRenderer
        data={tags}
        empty={{
          title: "No tags found",
          message: "No tags have been created yet.",
        }}
        success={tagSuccess}
        error={tagError}
        render={(tags) => (
          <div className="mt-7 flex flex-col gap-4">
            {tags.map(({ _id, name, questions }) => (
              <TagCard
                key={_id}
                _id={_id}
                name={name}
                questions={questions}
                showCount
                compact
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}

export default PopularTags;
