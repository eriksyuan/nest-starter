import { RequestContext } from './request-context.dto';
import type { Request } from 'express';
import {
  REQUEST_ID_TOKEN_HEADER,
  FORWARDED_FOR_TOKEN_HEADER,
} from '../constants';

export function getRequestContext(req: Request<any>): RequestContext {
  const ctx = new RequestContext();

  ctx.requestId = req.header(REQUEST_ID_TOKEN_HEADER);

  ctx.ip = req.header(FORWARDED_FOR_TOKEN_HEADER)
    ? req.header(FORWARDED_FOR_TOKEN_HEADER)
    : req.ip;

  ctx.method = req.method;
  ctx.url = req.url;
  return ctx;
}
