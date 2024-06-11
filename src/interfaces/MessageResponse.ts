export interface MessageResponse {
  message: string;
}

export interface IReferralCodeResponse {
  walletAddress: string;
  referralCode: string;
  referralCodeMerkleProof: string[];
  message: string;
}

export interface IValidateReferralCodeResponse {
  verificationStatus: boolean;
  merkleTreeRoot: string;
  merkleProof: string[];
  message: string;
}

// 응답 타입 인터페이스
export interface IReferralCodesResponse {
  _id: string;
  walletAddress: string;
  referralCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWhitelistResponse {
  verificationStatus: boolean;
  merkleProof?: string[];
}

export enum EOrderStatus {
  Requested = 'Requested',
  Success = 'Success',
  Failure = 'Failure',
}
export interface ISubmitOrderResponse {
  orderId: string;
  orderResult: EOrderStatus;
  transactionHash: string;
}

// 기존 응답 인터페이스 파일에 추가
export interface IEvent {
  minter: string;
  referralOwner: string;
  referralCode: string;
  amount: number;
  saleType: string;
  blockNumber: string;
  timestamp: number;
}

export interface IEventsSegmentResponse {
  segment: string;
  events: IEvent[];
}

export interface IEventsResponse {
  message: string;
  data: IEventsSegmentResponse[] | IEvent[];
}
