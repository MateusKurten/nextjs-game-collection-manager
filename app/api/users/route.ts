import { storeUser } from '../../lib/infra/users';

export async function POST(request: Request) {
    let user = await request.json();
    try {
      user = await storeUser(user);
    }catch(error) {
      return Response.json({ error });
    }  
    return Response.json({ mensagem: "Registration complete!" });
  }