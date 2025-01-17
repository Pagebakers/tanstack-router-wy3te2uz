import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  ComponentProvider,
  RemoteComponent,
} from '../components/piral-provider';

export const Route = createFileRoute('/')({
  ssr: false,
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      <ComponentProvider>
        <RemoteComponent name="textbox" />
      </ComponentProvider>
    </div>
  );
}
