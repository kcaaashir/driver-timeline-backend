import { addTimeline, fetchTimeline } from './service.js'

export const postTimeline = (req, res) => {
  return addTimeline(req, res);
}

export const getTimeline = (req, res) => {
  return fetchTimeline(req, res)
}