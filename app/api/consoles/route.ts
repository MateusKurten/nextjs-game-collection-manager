import { NextResponse } from 'next/server';
import { getConsoles } from '../../lib/infra/consoles';

export async function GET(request: Request) {
  try {
    const consoles = await getConsoles();
    return NextResponse.json({ consoles });
  }catch(error) {
    return NextResponse.json({ error });
  }   
}