export type IComment = {
  text: string;
  username: string;
  name: string;
  imageUrl: string;
  id: string;
  createdAt: Date;
};

export type IConfig = {
  collectionName: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
  };
};
