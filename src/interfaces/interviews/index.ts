export interface IInterviewRequest {
  hour: string;
  date: string;
  userId: string;
  vacancyId: string;
}

export interface IInterview {
  id: string;
  hour: string;
  date: string;
  isOver: boolean;
  feedback: string;
}
