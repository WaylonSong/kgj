import { request, config } from 'utils'

const { api, APIV1} = config

export async function handleResult (params) {
  console.log(params);
  return request({
    url: `${APIV1}/applications/handleResult`,
    method: 'post',
    data: params,
  })
}
