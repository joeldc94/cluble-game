"use server";
import "server-only";
import { getClubById } from "@/utils/get-club";
import { getClubIdByGameId } from "@/utils/sql-games";
import { checkAnswer } from "./check-answer";

interface checkAnswerProps {
  gameId: string;
  state: number;
  answer?: string;
  rightAnswer?: boolean;
}

export async function getTips({
  gameId,
  state,
  answer,
  rightAnswer,
}: checkAnswerProps) {
  console.log("GetTips:", { gameId, state, answer, rightAnswer });
  const clubId = await getClubIdByGameId(gameId);
  if (!clubId)
    return {
      success: false,
      message: "Não foi possível identificar o clube de hoje",
      tips: []
    };
  const club = await getClubById(clubId);
  if (!club)
    return {
      success: false,
      message: "Não foi possível identificar o clube de hoje",
      tips: []
    };
  const tips: Tip[] = [
    {
      label: "Cores",
      value: club.colors,
    },
    {
      label: "Mascote",
      value: club.mascot,
    },
    {
      label: "Ano de fundação",
      value: club.foundationYear,
    },
    {
      label: "Estádio",
      value: club.stadium,
    },
    {
      label: "Estado",
      value: club.state,
    },
  ];

  let checkRightResponse = !!rightAnswer ?? false;
  //console.log(checkRightResponse, answer, club.name)

  if (!!answer && !checkRightResponse) {
    if (answer.toLowerCase() == club?.name.toLowerCase()) {
      checkRightResponse = true;
    }
  }

  if (checkRightResponse) {
    return {
      success: true,
      message: "Resposta correta",
      userAnswer: answer,
      rightAnswer: true,
      clubData: club,
      tips,
    };
  }
  if (answer && !checkRightResponse) {
    //divulga proxima dica
    tips.splice(state + 2);
    return {
      success: true,
      message: "Resposta incorreta",
      userAnswer: answer,
      rightAnswer: false,
      clubData: null,
      tips,
    };
  }
  if (state >= 4 && !checkRightResponse) {
    return {
      success: true,
      message: "Resposta não encontrada",
      userAnswer: answer,
      rightAnswer: false,
      clubData: club,
      tips,
    };
  }

  tips.splice(state + 1);
  return {
    success: true,
    message: "Retornando dicas",
    userAnswer: null,
    rightAnswer: false,
    clubData: null,
    tips,
  };
}
