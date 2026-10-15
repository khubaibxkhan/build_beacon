import {NextResponse} from 'next/server';import {sameOrigin,badOrigin} from '../../../../lib/security';
export async function POST(req:Request){if(!sameOrigin(req))return badOrigin();const response=NextResponse.json({ok:true});response.cookies.set('campus_session','',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:0});return response}
