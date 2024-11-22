import { cn } from "@/lib/utils";

const StepDots = ({
  colorClass,
  vertical = true,
  stepsNumber,
  currentStep = 0,
  sectionName,
  onClick,
}: {
  colorClass: string;
  vertical?: boolean;
  stepsNumber: number;
  currentStep?: number;
  sectionName: string;
  onClick: (index: number) => void;
}) => (
  <div
    className={cn(
      "pointer-events-auto flex items-center justify-center gap-2 xl:justify-start xl:gap-[8px]",
      {
        "flex-col": vertical,
        "flex-row": !vertical,
      },
    )}
  >
    {Array(stepsNumber)
      .fill(null)
      .map((_, index) => (
        <button
          type="button"
          aria-label={`Step ${index + 1}`}
          key={`step-${sectionName}-${index}`}
          className={cn("rounded-full", colorClass, {
            "h-[14px] w-[14px]": currentStep === index,
            "h-2 w-2": currentStep !== index,
          })}
          onClick={() => onClick(index)}
        />
      ))}
  </div>
);
export default StepDots;
