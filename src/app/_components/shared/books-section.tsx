import { ArrowDown } from "lucide-react";
import NovelCard, { type TCard } from "./novel-card";
import { cn } from "~/lib/utils";

const BookSection = ({
  title,
  scrollable = false,
  novels = [],
  multiple = false,
}: {
  title: string;
  scrollable?: boolean;
  novels: TCard[];
  multiple?: boolean;
}) => {
  return (
    <section className="w-full">
      <div className={cn(!multiple ? "max-w-[1440px] mx-auto px-4 py-8" : "")}>
        <div className="flex mb-4 items-center gap-2">
          <h1 className="text-2xl font-semibold text-primary">{title}</h1>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>

        {novels.length === 0 ? (
          <div className="flex items-center min-h-40 justify-center w-full h-full">
            <p className="text-gray-600 text-lg font-semibold">
              Not Enough Data to show
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {novels.map((novel) => (
              <NovelCard key={novel.slug} details={novel} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
