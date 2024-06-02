import type { ReactElement } from "react";
import { TabLayout } from "@/components/layout";
import { generateHeader } from "@/lib/utils/generate-tab-header";
import { CursorFollowGradientButton } from "@/components/button";

export const ButtonsHeader = generateHeader("Buttons Page");

const ButtonsPage = () => {
  return (
    <div className="flex flex-col gap-3">
      {ButtonsHeader}
      <div className="grid grid-cols-4 py-6">
        <CursorFollowGradientButton
          className="font-semibold text-lg px-10 py-6 bg-gradient-to-r from-[#e61d4d] to-[#d70666] truncate"
          gradientRadius={150}
          gradientRgba="rgba(250, 250, 250, 0.15)"
        >
          AirBnB like button
        </CursorFollowGradientButton>
      </div>
    </div>
  );
};

export default ButtonsPage;

ButtonsPage.getLayout = function getLayout(page: ReactElement) {
  return <TabLayout>{page}</TabLayout>;
};
