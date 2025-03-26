import { create } from "zustand";

interface MbtiTestState {
    pageIsCompleted: {
        [key: number]: boolean;
    };
    log: {
        E: number;
        I: number;
        N: number;
        S: number;
        F: number;
        T: number;
        J: number;
        P: number;
    };
    validatePrevStepisComplete: (order: number) => boolean;
    setMbtiLog: (mbti: "E" | "I" | "N" | "S" | "F" | "T" | "P" | "J") => void;
}

const useMbtiTestState = create<MbtiTestState>((set, get) => ({
    pageIsCompleted: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
    },
    log: {
        E: 0,
        I: 0,
        N: 0,
        S: 0,
        F: 0,
        T: 0,
        J: 0,
        P: 0,
    },
    validatePrevStepisComplete: (order: number) => {
        if (typeof order !== 'number' || order <= 1) {
            return false;
        }
        return !!get().pageIsCompleted[order - 1];
    },
    setMbtiLog: (mbti: "E" | "I" | "N" | "S" | "F" | "T" | "P" | "J") => {
        set((state) => ({
            log: {
                ...state.log,
                [mbti]: state.log[mbti] + 1,
            },
        }));
    },
    setPageComplete: (step : number) => {
        set((state) => ({
            pageIsCompleted: {
                ...state.pageIsCompleted,
                [step] : true,
            }
        }))
    }
}));

export default useMbtiTestState;