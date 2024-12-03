export declare const useThrottledValue: <T>({ delay, initialValue, }: {
    delay?: number | undefined;
    initialValue?: T | undefined;
}) => {
    liveValue: T | undefined;
    value: T | undefined;
    setValue: (v: T) => void;
};
