"use client";

import { cn } from "@/lib/utils";
import { DIcons, type ValidIcon } from "dicons";
import type { ReactNode } from "react";

export interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  const backgroundStops = Array.isArray(color) ? color.join(",") : color;

  return (
    <div
      style={{
        "--border-radius": `${borderRadius}px`,
      } as React.CSSProperties}
      className={cn(
        "relative grid h-full w-full place-items-center rounded-3xl bg-white p-3 text-black dark:bg-black dark:text-white",
        className,
      )}
    >
      <div
        style={{
          "--border-width": `${borderWidth}px`,
          "--shine-pulse-duration": `${duration}s`,
          "--mask-linear-gradient": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          "--background-radial-gradient": `radial-gradient(transparent, transparent, ${backgroundStops}, transparent, transparent)`,
        } as React.CSSProperties}
        className="before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-3xl before:p-[--border-width] before:content-[''] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] before:[mask-composite:exclude] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]"
      />
      {children}
    </div>
  );
}

export interface TimelineEventConfig {
  label: string;
  message: string;
  icon: {
    name: ValidIcon;
    textColor: string;
    borderColor: string;
  };
}

export function TimelineContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-md flex-col justify-center gap-3 md:order-2">{children}</div>;
}

export function TimelineEvent({ label, message, icon, isLast = false }: TimelineEventConfig & { isLast?: boolean }) {
  const Icon = DIcons[icon.name];

  return (
    <div className="group relative -m-2 flex gap-4 border border-transparent p-2">
      <div className="relative">
        <div className={cn("rounded-full border bg-background p-2", icon.borderColor)}>
          <Icon className={cn("h-4 w-4", icon.textColor)} />
        </div>
        {!isLast && <div className="absolute inset-x-0 mx-auto h-full w-px bg-muted" />}
      </div>
      <div className="mt-1 flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold">{label}</p>
        </div>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

const TIMELINE: TimelineEventConfig[] = [
  {
    label: "Choose Your Design",
    message: "Browse and select a design that fits your needs, then access your personalized dashboard.",
    icon: { name: "Shapes", textColor: "text-orange-500", borderColor: "border-orange-500/40" },
  },
  {
    label: "Provide Your Brief",
    message: "Share your design preferences and requirements with us.",
    icon: { name: "Send", textColor: "text-amber-500", borderColor: "border-amber-500/40" },
  },
  {
    label: "Receive Your Designs",
    message: "Get your initial designs within 48 hours.",
    icon: { name: "Check", textColor: "text-blue-500", borderColor: "border-blue-500/40" },
  },
  {
    label: "Request Revisions",
    message: "We’re committed to perfection—request as many revisions as needed until you’re satisfied.",
    icon: { name: "Repeat", textColor: "text-green-500", borderColor: "border-green-500/40" },
  },
  {
    label: "Get Final Files",
    message: "Once approved, we’ll deliver the final files to you.",
    icon: { name: "Download", textColor: "text-green-500", borderColor: "border-green-500/40" },
  },
];

export function Timeline() {
  return (
    <div className="w-full">
      <TimelineContainer>
        {TIMELINE.map((event, index) => (
          <TimelineEvent key={event.message} isLast={index === TIMELINE.length - 1} {...event} />
        ))}
      </TimelineContainer>
    </div>
  );
}

export { ShineBorder };
