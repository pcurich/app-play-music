interface LoginServerResponse {
  data: {
    name: string;
    email: string;
    password?: string;
    avatar: string;
  };
  tokenSession: string;
}
