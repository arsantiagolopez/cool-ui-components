import { type ReactElement } from "react";
import { TabLayout } from "@/components/layout";
import { generateHeader } from "@/lib/utils/generate-tab-header";
import Globe from "@/components/globe";

export const GlobeHeader = generateHeader("Globe Page");

const GlobePage = () => {
  return (
    <div className="flex flex-col gap-3">
      {GlobeHeader}
      <div className="w-full absolute inset-0 h-screen">
        <Globe className="mt-20" />
      </div>
    </div>
  );
};

export default GlobePage;

GlobePage.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>;
};
