import { TON_EXIT_CODE_MAP, TONExitCodeInfo } from "../const";


export const getExitCodeInfo = (exitCode: number): TONExitCodeInfo | null => {
  return TON_EXIT_CODE_MAP[exitCode] || null;
};

export const isSuccessExitCode = (exitCode: number): boolean => {
  return exitCode === 0 || exitCode === 1;
};