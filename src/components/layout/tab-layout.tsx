import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type ReactNode } from "react";
import { HomeHeader } from "@/pages";
import { GlobeHeader } from "@/pages/globe";
import { ButtonsHeader } from "@/pages/buttons";
import { cn } from "@/lib/utils";

const navigationTabs = [
  {
    id: "home",
    label: "Home",
    href: "/",
    header: HomeHeader,
  },
  {
    id: "globe",
    label: "Globe",
    href: "/globe",
    header: GlobeHeader,
  },
  {
    id: "buttons",
    label: "Buttons",
    href: "/buttons",
    header: ButtonsHeader,
  },
];

type TabLayoutProps = {
  children: ReactNode;
};

const TabLayout = ({ children }: TabLayoutProps) => {
  const [reorderedTabs, setReorderedTabs] =
    useState<typeof navigationTabs>(navigationTabs);
  const [hovering, setHovering] = useState(false);

  const { pathname } = useRouter();

  const reorderTabs = (index: number) => {
    const newTabs = [...navigationTabs];
    const selectedTab = newTabs.splice(index, 1);
    newTabs.unshift(selectedTab[0]);
    setReorderedTabs(newTabs);
  };

  return (
    <div className="relative flex flex-col sm:gap-2 h-dvh w-screen overflow-hidden wrapper">
      <nav className="flex items-center h-20 sm:h-nav-height">
        {navigationTabs.map(({ id, label, href }, index) => {
          const isActive = href === pathname;
          return (
            <Link
              key={id}
              href={href}
              onClick={() => reorderTabs(index)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="relative px-4 sm:px-6 py-2 sm:py-3 h-fit"
            >
              {isActive && (
                <motion.div
                  layoutId="clicked-button"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className="absolute inset-0 bg-secondary-background rounded-full"
                />
              )}

              <span className="relative">{label}</span>
            </Link>
          );
        })}
      </nav>

      <main
        // Super important `key` here to allow for reordering
        // animation to flow smoothly and not remount.
        // Must match the `key` of the first element in the
        // rendered array `reorderedTabs`.
        // Why – https://www.nan.fyi/keys-in-framer-motion
        key={reorderedTabs[0].id}
        className="relative h-full w-full"
      >
        {reorderedTabs.map(({ id, header }, index) => (
          <motion.div
            key={id}
            layoutId={id}
            style={{
              scale: 1 - index * 0.1,
              top: hovering ? index * -60 : 0,
              zIndex: -index,
              opacity: index < 3 ? 1 - index * 0.2 : 0,
            }}
            animate={{
              y: !index ? [0, 20, 0] : 0,
            }}
            className={cn(
              "w-full h-full absolute top-0 left-0 rounded-2xl p-4 sm:p-6 bg-secondary-background mt-10 sm:mt-0",
              {
                "bg-gradient-to-b from-secondary-background to-tertiary-background mt-0":
                  !index,
              }
            )}
          >
            {!index ? children : header}
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default TabLayout;
