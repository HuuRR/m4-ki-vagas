export interface IVacanciesSkills {
  excel?: boolean;
  javascript?: boolean;
  react?: boolean;
  css?: boolean;
  html?: boolean;
  express?: boolean;
  docker?: boolean;
}

export interface IVacancy {
  name: string;
  salary: number;
  description: string;
  companyId?: string;
  comany?: string;
  vacancy_skills: IVacanciesSkills;
}
