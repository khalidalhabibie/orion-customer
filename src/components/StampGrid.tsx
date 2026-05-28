type StampGridProps = {
  currentStamps: number;
  requiredStamps: number;
};

export function StampGrid({ currentStamps, requiredStamps }: StampGridProps) {
  return (
    <div className="stamp-grid" aria-label={`${currentStamps} of ${requiredStamps} stamps collected`}>
      {Array.from({ length: requiredStamps }, (_, index) => {
        const stampNumber = index + 1;
        const isFilled = stampNumber <= currentStamps;

        return (
          <span className={`stamp ${isFilled ? "stamp--filled" : ""}`} key={stampNumber}>
            {stampNumber}
          </span>
        );
      })}
    </div>
  );
}
