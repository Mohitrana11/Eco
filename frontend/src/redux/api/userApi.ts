import { createApi, CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import { server } from "../store.ts";

import { MessageResponse } from "../../types/apiTypes";
import { NewUserRequestBody } from "../../types/type.ts";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user/` }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, NewUserRequestBody>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: "user",
      }),
    }),
  }),
});

export const { useLoginMutation } = userAPI;
