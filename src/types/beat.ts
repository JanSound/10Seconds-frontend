export interface IBeat {
  id: string;
  name: string;
  beatType: string;
  presignedUrl: string;
  createdAt: string;
  checked: boolean;
  clicked: boolean;
}

export interface IFetchBeat {
  ID: string;
  BeatType: string;
  PresignedUrl: string;
  RegTs: string;
}

export interface IConvertBeat {
  BeatType: string;
  PresignedUrl: string;
  Key: string;
}
