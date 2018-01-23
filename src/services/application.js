import { request, config } from 'utils'

const { api, APIV1} = config

export async function handleAcceptResult (params) {
  return request({
    url: `${APIV1}/applications/handleAcceptResult`,
    method: 'post',
    data: params,
  })
}


export async function handleWrittenResult (params) {
  return request({
    url: `${APIV1}/applications/handleWrittenResult`,
    method: 'post',
    data: params,
  })
}