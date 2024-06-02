import type { ReactElement } from "react";
import { TabLayout } from "@/components/layout";
import { generateHeader } from "@/lib/utils/generate-tab-header";

export const HomeHeader = generateHeader("Home Page");

const HomePage = () => {
  return (
    <div className="flex flex-col gap-3">
      {HomeHeader}
      <div></div>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>;
};
