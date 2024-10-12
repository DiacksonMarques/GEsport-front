export interface Candidate{
  id: number;
  name: string;
  birthDate: string;
  height: number;
  weight: number;
  gender: string;
  dddPhone:  number;
  numberPhone: number;
  school_id?: number;
  cpf: string;
  enrollment: string;
  namePix?: string;
  approvedPix?: boolean;
  approvedRegistration?: boolean;
  approvedSelective?: boolean;
  levelSelect?: number,
  result: any[];
}

