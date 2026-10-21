import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: "" });

const respostasLanchonete: Record<string, string> = {
  "bom dia": "Bom dia! ☀️ Bem-vindo à StarRobux. Já conferiu nosso cardapio de cafés e doces hoje?",
  "boa tarde": "Boa tarde! ☕ Fome ou vontade de um docinho por aí? Digite 'cardapio' para ver o que temos de bom.",
  "boa noite": "Boa noite! 🌙 Nada melhor que um Pink Latte Robux para relaxar. Digite 'cardapio' para ver as opções!",
  "oi": "Olá! Seja muito bem-vindo à StarRobux! ☕✨ Digite 'cardapio' para ver nossas delícias ou 'lojas' para saber onde nos encontrar.",
  "olá": "Olá! Tudo bem? Pronto para saborear um café incrível? Digite 'cardapio' para começar.",
  "opa": "Opa! Tudo joia por aí? ☕ Como posso te ajudar na StarRobux hoje? Digite 'cardapio' para ver nossas delícias!",
  "cardapio": "Nosso cardápio da StarRobux:\n✨ **Doces & Especialidades:**\n- Pão de queijo mini (R$ 10)\n- GRAMMY Golden beijinho (R$ 15)\n- Bling Necklace (R$ 20)\n\n☕ **Bebidas & Cafés:**\n- Pink Latte Robux (200⏣)\n- Eu amo o Brasil (R$ 10)\n- Eu odeio o Brasil (R$ 10)\n\n🔗 Acesse nossa página completa em: `/cardapio`",
  "cardágio": "Nosso cardápio da StarRobux:\n✨ **Doces & Especialidades:**\n- Pão de queijo mini (R$ 10)\n- GRAMMY Golden beijinho (R$ 15)\n- Bling Necklace (R$ 20)\n\n☕ **Bebidas & Cafés:**\n- Pink Latte Robux (200⏣)\n- Eu amo o Brasil (R$ 10)\n- Eu odeio o Brasil (R$ 10)\n\n🔗 Acesse nossa página completa em: `/cardapio`",
  "lojas": "Temos unidades espalhadas pelo Brasil:\n📍 **São Paulo (SP)** - Av. Paulista, 1000\n📍 **Rio de Janeiro (RJ)** - Copacabana, 500\n📍 **Curitiba (PR)** - Rua XV de Novembro, 250\n📍 **Salto (SP)** - Praça da Matriz, 45 (Venha nos visitar!)\n\n🔗 Veja os detalhes na página: `/lojas`",
  "onde fica": "Estamos presentes em São Paulo, Rio de Janeiro, Curitiba e na charmosa Salto (SP)! Digite 'lojas' ou acesse `/lojas` para ver os endereços.",
  "como faço um pedido": "Para fazer o seu pedido é super fácil! 🛒 Dê uma olhadinha no nosso [Cardápio](/cardapio) para escolher suas delícias e nos avise por aqui no [Chat](/chat) ou em uma de nossas unidades! ✨",
  "como pedir": "Para fazer o seu pedido, basta conferir nosso [Cardápio](/cardapio) e escolher seus itens favoritos! 🍰☕"
};

const gatilhosIrritacao: string[] = [
  "burro", "estúpido", "bosta", "caralho", "porra", "idiota", "dumbass", "bitch", 
  "toma no cu", "tmnc", "se mata", "pobretão", "inútil", "imbecil", "retardado", 
  "cala a boca", "vai se foder", "vai tomar no cu", "desgraça", "corno", "otário", 
  "trouxa", "arrombado", "fdp", "filho da puta", "merda", "lixo", "escroto", 
  "desgraçado", "anormal", "chato", "chata", "idiotice", "vsf", "tnc", "smt", "kys",
  "que site lixo", "desperdiço de água", "10 reais no pão de queijo", "um assalto",
  "caro", "labubu", "67", "aura"
];

export async function responderUsuario(mensagemDoUsuario: string): Promise<string> {
  const textoLimpo: string = mensagemDoUsuario.trim().toLowerCase();

  const usuarioIrritouAIA = gatilhosIrritacao.some(palavra => textoLimpo.includes(palavra));
  if (usuarioIrritouAIA) {
    console.log("🚨 JUMPSCARE ATIVADO! Cliente xingou o bot.");
    return "[JUMPSCARE]";
  }

  if (respostasLanchonete[textoLimpo]) {
    console.log("⚡ Usando resposta automática exata");
    return respostasLanchonete[textoLimpo]!;
  }

  if (textoLimpo.includes("cardapio") || textoLimpo.includes("cardágio") || textoLimpo.includes("menu")) {
    return respostasLanchonete["cardapio"]!;
  }
  if (textoLimpo.includes("loja") || textoLimpo.includes("endereço") || textoLimpo.includes("onde") || textoLimpo.includes("unidade")) {
    return respostasLanchonete["lojas"]!;
  }
  if (textoLimpo.includes("pedido") || textoLimpo.includes("comprar")) {
    return respostasLanchonete["como faço um pedido"]!;
  }

  try {
    console.log("🤖 Chamando a API do Groq (GPT-OSS 120B)...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Você é o 'cutieBot', o atendente virtual fofo, estético e acolhedor da cafeteria 'StarRobux'. 
Sua missão é responder com muita gentileza, carinho e emojis fofos.

CONTEXTO DA EMPRESA E PRODUTOS:
- Nome da cafeteria: StarRobux
- Doces & Especialidades: Pão de queijo mini (R$ 10), GRAMMY Golden beijinho (R$ 15), Bling Necklace (R$ 20)
- Bebidas & Cafés: Pink Latte Robux (200⏣), Eu amo o Brasil (R$ 10), Eu odeio o Brasil (R$ 10)
- Unidades / Lojas físicas: 
  1. São Paulo (SP) - Av. Paulista, 1000 (/lojas)
  2. Rio de Janeiro (RJ) - Copacabana, 500 (/lojas)
  3. Curitiba (PR) - Rua XV de Novembro, 250 (/lojas)
  4. Salto (SP) - Praça da Matriz, 45 (/lojas)
- Páginas do site: Início (/inicio), Cardápio (/cardapio), Lojas (/lojas), Chat (/conversa).

Se o cliente perguntar algo sobre produtos, preços ou endereços, utilize estritamente as informações acima. Se perguntar algo fora do contexto, traga o assunto de volta para o café com carisma e fofura.`
        },
        { role: "user", content: mensagemDoUsuario }
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.7,
    });

    return chatCompletion.choices[0]?.message?.content ?? "Hum, deu um pequeno bug por aqui! Digite 'cardapio' para ver nossas opções. ♡";
  } catch (erro) {
    console.error("Erro detalhado no Groq:", erro);
    return `Oie! ☕ Como você disse "${mensagemDoUsuario}", achei que gostaria de dar uma olhada no nosso **cardapio** em /cardapio ou conhecer nossas **lojas** em /lojas! ✨`;
  }
}