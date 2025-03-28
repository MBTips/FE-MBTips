import { create } from "zustand";

type PageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Mbti = "E" | "I" | "N" | "S" | "F" | "T" | "P" | "J";

interface MbtiTestState {
    currentPage: PageNumber;
    pageIsCompleted: Record<PageNumber, boolean>;
    mbtiLog: Record<Mbti, number>;
    setNextStep: () => void;
    setMbtiLog: (mbti: Mbti) => void;
    validatePrevStepisComplete: (order: PageNumber) => boolean;
    setPageComplete: (step: PageNumber) => void;
    retry: () => void;
}

const useMbtiTestState = create<MbtiTestState>((set, get) => ({
    currentPage: 1,
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
    mbtiLog: {
        E: 0,
        I: 0,
        N: 0,
        S: 0,
        F: 0,
        T: 0,
        J: 0,
        P: 0,
    },
    setNextStep: () => {
        const currentPage = get().currentPage; 
        const setPageComplete = get().setPageComplete;

        setPageComplete(currentPage); // 현재 페이지를 완료로 설정
        
        if (currentPage === 12) {
            // 마지막 페이지라면 결과 페이지로 이동
            window.location.href = "/mbti-test-result";
        } else {
            // 그렇지 않다면 페이지를 증가시킴
            set((state) => ({
                currentPage: (state.currentPage + 1) as PageNumber,
            }));
        }
        
    },
    setMbtiLog : (mbti : Mbti) => {
      set((state) => ({
        mbtiLog: {
          ...state.mbtiLog,
          [mbti]: state.mbtiLog[mbti] + 1,
        },
      }));
    },
    validatePrevStepisComplete: (order: PageNumber) => {
        if (order <= 1) {
            return false;
        }
        return !!get().pageIsCompleted[order - 1 as PageNumber];
    },
    setPageComplete: (step: PageNumber) => {
        set((state) => ({
            pageIsCompleted: {
                ...state.pageIsCompleted,
                [step]: true,
            },
        }));
    },
    retry: ()=> {
        set(() => ({
            currentPage: 1,
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
        }));
    },
}));

export default useMbtiTestState;