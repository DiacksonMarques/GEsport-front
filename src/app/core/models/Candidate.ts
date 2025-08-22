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
  txid: string;
  pixName: string;
  pixStatus: string;
  pixMaturity: string;
  pixValue:string;
  pixCopyPaste:string;
  pixQrCode:string;
  approvedRegistration?: boolean;
  approvedSelective?: boolean;
  levelSelect?: number,
  result: ResultSelective[];
}

export interface ResultSelective{
  appraiser: string;
  attack: number;
  defense: number;
  frontDesk: number;
  headline: number;
  lock: number;
  service: number;
  touch: number;
}

