import {NextResponse} from 'next/server';
const attempts=new Map<string,{count:number,expires:number}>();
export function checkRateLimit(key:string,limit=8,windowMs=15*60_000){const now=Date.now();if(attempts.size>5000){for(const [k,v] of attempts){if(v.expires<now)attempts.delete(k)}}const record=attempts.get(key);if(!record||record.expires<=now){attempts.set(key,{count:1,expires:now+windowMs});return true}if(record.count>=limit)return false;record.count++;return true}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');if(!origin)return false;try{return new URL(origin).host===new URL(req.url).host}catch{return false}}
export const badOrigin=()=>NextResponse.json({error:'Origin not allowed'},{status:403});
