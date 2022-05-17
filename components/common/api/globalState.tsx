import { createContext, useReducer, Dispatch, SetStateAction } from "react";

type GlobalState = [any, Dispatch<SetStateAction<any>>];

export const GlobalContext = createContext<GlobalState>([null, () => null]);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FOOTER_STATE":
      return {
        ...state,
        hideFooter: action.payload,
      };
    default:
      return state;
  }
};

const GlobalStateProvide = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvide;
