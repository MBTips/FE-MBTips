import { create } from "zustand";

type PageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface MbtiTestState {
    currentPage: PageNumber;
    currentMbti: string;
    pageIsCompleted: Record<PageNumber, boolean>;
    mbtiLog: Record<string, number>;
    setNextStep: () => void;
    setPreviousStep: () => void;
    setMbtiLog: (mbti: string) => void;
    getMbtiByLog: () => void;
    validatePrevStepisComplete: (order: PageNumber) => boolean;
    setPageComplete: (step: PageNumber) => void;
    retry: () => void;
}

const useMbtiTestState = create<MbtiTestState>((set, get) => ({
    currentPage: 1,
    currentMbti : "",
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
        
        // 마지막 페이지라면 결과 페이지로 이동
        if (currentPage === 12) {
            get().getMbtiByLog();
            if (get().currentMbti !== "") window.location.href="/mbti-test-result";
            else console.error("mbti가 비어있습니다.");
        } else {
            // 그렇지 않다면 페이지를 증가시킴
            set((state) => ({
                currentPage: (state.currentPage + 1) as PageNumber,
            }));
        }
        
    },
    setPreviousStep: () => {
        const currentPage = get().currentPage; 
        if (currentPage > 1) { // 페이지가 1보다 클 때만 감소
            set((state) => ({
                currentPage: (state.currentPage - 1) as PageNumber,
            }));
        }
    },
    setMbtiLog : (mbti : string) => {
      set((state) => ({
        mbtiLog: {
          ...state.mbtiLog,
          [mbti]: state.mbtiLog[mbti] + 1,
        },
      }));
    },
    getMbtiByLog:()=>{
        let mbti ="";
        const mbtiLog = get().mbtiLog;
        if(mbtiLog.E>mbtiLog.I) mbti += "E"; else mbti += "I";
        if(mbtiLog.N>mbtiLog.S) mbti += "N"; else mbti += "S";
        if(mbtiLog.F>mbtiLog.T) mbti += "F"; else mbti += "T";
        if(mbtiLog.J>mbtiLog.P) mbti += "J"; else mbti += "P";
        set(() => ({
            currentMbti: mbti,
        }));
        localStorage.setItem("mbti-test-mbti", mbti);
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