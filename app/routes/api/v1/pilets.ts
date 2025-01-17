import { createAPIFileRoute } from '@tanstack/start/api'

import { maxSatisfying } from 'semver'
import { createMoarClient } from '../../../lib/moar'
import { PiletMetadata } from '../../../types'

const rootUrl = `${import.meta.env.MOAR_ROOT_URL}`

const moar = createMoarClient({
  baseUrl: import.meta.env.MOAR_ADDR as string,
  accessToken: import.meta.env.MOAR_API_KEY,
})

export const APIRoute = createAPIFileRoute('/api/v1/pilets')({
  GET: async () => {
    const response: { items: Array<PiletMetadata> } = {
      items: [],
    }

    const resp = await moar.getModule({})

    for (let i = 0; i < resp.module.length; i++) {
      const mod = resp.module[i]
      if (!mod) continue

      // alternative to latest:
      //   semver.rsort(myArrayOfVersions)[0]
      const latestV = maxSatisfying(
        mod.versions.map((v) => v.name),
        '*',
      )

      if (!latestV) continue

      const v = mod.versions.find((v) => v.name === latestV)
      if (!v) continue

      const metaFile = v.files.find((f) => f.name === 'meta.json')
      if (!metaFile) continue

      const jsonString = Buffer.from(metaFile.data).toString('utf8')
      try {
        const meta = JSON.parse(jsonString) as PiletMetadata
        response.items.push(meta)
      } catch (e) {
        console.log(
          `failed to decode meta.json for ${mod.name}@${latestV}`,
          jsonString,
        )
        /* empty */
      }
    }

    return Response.json(response)
  },
})
