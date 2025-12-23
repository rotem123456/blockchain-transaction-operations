import axios from 'axios';
import https from 'https';
import { sleep } from '../utils/sleep.utils';
import { getExitCodeInfo } from '../utils/exitcode.utils';
import { env } from 'process';

export const parseErrorDetails = (errorString: string) => {
  const exitCodeMatch = errorString.match(/exitcode=(\d+)/);
  const stepsMatch = errorString.match(/steps=(\d+)/);
  const gasUsedMatch = errorString.match(/gas_used=(\d+)/);

  const exitCode = exitCodeMatch ? parseInt(exitCodeMatch[1]) : null;
  const exitCodeInfo = exitCode !== null ? getExitCodeInfo(exitCode) : null;

  return {
    fullError: errorString,
    exitCode,
    exitCodeInfo,
    steps: stepsMatch ? parseInt(stepsMatch[1]) : null,
    gasUsed: gasUsedMatch ? parseInt(gasUsedMatch[1]) : null,
  };
};

const apiKey = env.TON_API_KEY;

export async function rebroadcastTransaction(boc: string,url:string): Promise<any>
{
  try {
    const { data }:any = await axios.post(
      `${url}/api/v2/sendBocReturnHash`,
      { boc },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      } as any
    );
    console.log(url);
    sleep(2000);
    if (!data.ok) {
      throw new Error(data.error);
    }
    return data.result.hash;
  } catch (error:any) {
     if (error.response?.data?.error) {
      const errorDetails = parseErrorDetails(error.response.data.error);
      return errorDetails;
    }

    // If it's a regular error thrown from !data.ok
    if (error.message) {
      const errorDetails = parseErrorDetails(error.message);
      return errorDetails;
    }
    }

};
