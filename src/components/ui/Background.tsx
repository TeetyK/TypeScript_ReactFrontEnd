import { cn } from "@/lib/utils";
import React from "react";
import LiquidEther from "../LiquidEther";

const Background = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-screen w-screen overflow-hidden bg-slate-950 text-white",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="absolute inset-0">
      <LiquidEther/>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
