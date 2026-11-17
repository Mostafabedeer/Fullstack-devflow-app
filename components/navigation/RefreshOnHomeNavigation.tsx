"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function RefreshOnHomeNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (
      pathname === "/" &&
      /^\/questions\/[^/]+$/.test(previousPathname.current)
    ) {
      router.refresh();
    }

    previousPathname.current = pathname;
  }, [pathname, router]);

  return null;
}

export default RefreshOnHomeNavigation;
