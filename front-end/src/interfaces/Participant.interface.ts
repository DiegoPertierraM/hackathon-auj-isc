export interface Participant {
  id: number;
  name: string;
  email: string;
  ticket: number;
  created: Date;
  updated: Date;
}

export interface ParticipantsCreate {
  name: string;
  email: string;
  ticket: number;
}
