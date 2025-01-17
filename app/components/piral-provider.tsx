import * as React from 'react';
import { PropsWithChildren, useMemo } from 'react';

import {
  createInstance,
  type ExtensionSlotProps,
  PiralContext,
  usePiletApi,
} from 'piral-core';

const Loading = () => {
  return <div>...loading...</div>;
};

export function RemoteComponent<TName>(props: ExtensionSlotProps<TName>) {
  const api = usePiletApi();
  return (
    <React.Suspense fallback={<Loading />}>
      <api.Extension {...props} />
    </React.Suspense>
  );
}

export const ComponentProvider = ({
  children,
  feedUrl = '/api/v1/pilets-mock',
}: PropsWithChildren<{
  feedUrl?: string | undefined;
}>) => {
  const instance = useMemo(() => {
    return createInstance({
      // plugins: [...createStandardApi()],
      async requestPilets() {
        const res = await fetch(feedUrl);
        const res_1 = await res.json();
        return res_1.items;
      },
    });
  }, [feedUrl]);

  return (
    <>
      {/*<Piral instance={instance}>{children}</Piral>*/}
      {/* FIXME: alternatively we might have to drop the routed version and pick only the context */}
      <PiralContext instance={instance}>{children}</PiralContext>
    </>
  );
};
