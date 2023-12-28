import { deleteGame } from "@/app/lib/infra/games";

export async function POST(request: Request) {
    const body = await request.json();
    try {
      await deleteGame(body.id);
    } catch (error) {
      return Response.json({ error });
    }
    return Response.json({ mensagem: "Contato Excluído com sucesso" });
  }
  