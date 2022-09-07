// export interface IFeedbacks {
//   feedback: string;
// }

export interface IInterviewRequest {
  hour: string;
  date: string;
  userId: string;
  vacancyId: string;
}

export interface IInterview {
  interviewId: string;
  hour: string;
  date: string;
  isOver: boolean;
  feedback: string;
}
