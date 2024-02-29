export interface MessageRequest{
  type: 'success' | 'error' | 'warning' | 'info' | 'question';
  title?: string;
  subTitle?: string;
  subTitleTwo?: string;
  subTitleLink?: string;
  textLink?: string;
  timing?: number;
  buttons?: ButtonMessage[];
  footer?: string;
  icon?: {
    type: string;
    locale: 'subTitle' | 'title' | 'textLink'
  };
}

interface ButtonMessage {
  type: 'primary' | 'accent' | 'basic';
  function?: 'close'| 'accept';
  text: string;
}
