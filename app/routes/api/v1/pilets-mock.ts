import { createAPIFileRoute } from '@tanstack/start/api'

export const APIRoute = createAPIFileRoute('/api/v1/pilets-mock')({
  GET: async () => {
    return Response.json({
      items: [
        {
          name: '@lumen/textbox',
          version: '1.0.0',
          type: 'v2',
          requireRef: 'webpackChunkpr_lumentextbox',
          description: '',
          integrity: 'sha256-LRA685TPBW9CPZZIRQEZnr7rNbRB7tCWqxQLgmOJbRA=',
          author: { name: '', email: '' },
          dependencies: {},
          link: 'https://moar.lumen.run/modules/@lumen/textbox/1.0.0/index.js',
          license: { type: 'ISC', text: '' },
        },
      ],
    })
  },
})
