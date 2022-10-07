import { format } from 'date-fns';
import stacktrace from 'stacktrace-js';

type LogType = 'info' | 'error';

function log(type: LogType, scope: string, ...content: any[]) {
  const now = Date.now();
  console[type](
    `[${format(now, 'HH:mm:ss')}.${String(now % 1000).padStart(
      3,
      '0',
    )}] ${scope} `,
    ...content,
  );
}

export const info = (scope: string, ...content: any[]) => {
  log('info', scope, ...content);
};

export const infoTrace = (
  scope: string,
  keep: (filename: string) => boolean,
  trace: [number, number],
  ...content: any[]
) => {
  const callFiles = stacktrace
    .getSync()
    .filter((frame) => {
      return (
        !frame.fileName?.includes('node_modules') &&
        !frame.fileName?.includes('log.ts') &&
        keep(frame?.fileName ?? '')
      );
    })
    // keep last ten files name
    .slice(0, 10)
    .reverse()
    .map((frame) => {
      const { fileName = '' } = frame;

      return fileName.replace('webpack-internal:///.', '');
    })
    .slice(trace[0], trace[1])
    .join(' > ');
  log('info', scope, callFiles, ...content);
};

export const error = (scope: string, ...content: any[]) => {
  log('error', scope, ...content);
};
