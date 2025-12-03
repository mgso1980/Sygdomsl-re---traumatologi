import { TOPICS, MARTIN_CASE, STUDY_QUESTIONS } from '../constants';

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[] = []) => {
  // Simuler netværksforsinkelse
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerMsg = message.toLowerCase();

  // Tjek for nøgleord i studie spørgsmål
  const questionMatch = STUDY_QUESTIONS.find(q => 
    lowerMsg.includes(q.category.toLowerCase()) || 
    q.question.toLowerCase().includes(lowerMsg)
  );

  if (questionMatch && message.length > 5) {
    return `${questionMatch.answer} (Baseret på refleksionsspørgsmål om ${questionMatch.category})`;
  }

  // Simpel keyword matching baseret på emner
  if (lowerMsg.includes('martin')) {
     return "Martin er casens hovedperson. Han er 31 år, bygningsarbejder, og fik et betonelement ned over sig. Han har skader på columna, thorax, kraniet og ekstremiteterne. Han ligger i øjeblikket i koma.";
  }
  
  if (lowerMsg.includes('pneumothorax')) {
     return "Pneumothorax (punkteret lunge) betyder luft i pleurahulen, hvilket får lungen til at klappe sammen. Martin havde bilateral pneumothorax og blev behandlet med dræn.";
  }

  if (lowerMsg.includes('koma')) {
      return "Koma er en tilstand af dyb bevidstløshed. Martin blev lagt i kunstig koma under operationen, men da man slukkede for medicinen, vågnede han ikke op, hvilket tyder på en alvorlig hjerneskade.";
  }

  if (lowerMsg.includes('rhabdo')) {
      return "Rhabdomyolyse er en farlig tilstand, hvor muskelvæv nedbrydes og frigiver myoglobin til blodet. Det kan give nyresvigt. Martin fik dette som følge af kompartmentsyndrom i låret.";
  }

  if (lowerMsg.includes('compartment') || lowerMsg.includes('kompartment')) {
      return "Kompartmentsyndrom opstår, når trykket i en muskelgruppe stiger så meget, at blodet ikke kan løbe igennem. Det kræver akut operation (fasciotomi).";
  }

  // Generisk fallback
  return "Jeg kører i øjeblikket i 'Offline-tilstand' uden API-nøgle. Jeg kan svare på simple spørgsmål om emnerne: Martin, Pneumothorax, Koma, Rhabdomyolyse og Kompartmentsyndrom.";
};