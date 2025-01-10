//- usecase injection

import { PUBLIC_BASE_API_HTTP_DEV } from '$env/static/public';
import AuthUsecase from './auth.usecase';
import APIAuthGateway from '../adapters/handler/auth/http/v1/gateway';
import APIUserGateway from '../adapters/handler/user/http/v1/gateway';
import UserUsecase from './user.usecase';
import PostHandlerGateway from '../adapters/handler/post/http/v1/gateway';

const authGateway = new APIAuthGateway(`${PUBLIC_BASE_API_HTTP_DEV}`);
const userGateway = new APIUserGateway(`${PUBLIC_BASE_API_HTTP_DEV}/users`);
export const NewPostHandlerGateway = new PostHandlerGateway(`${PUBLIC_BASE_API_HTTP_DEV}/post`);

export const NewAuthUsecase = new AuthUsecase(authGateway, userGateway);
export const NewUserUsecase = new UserUsecase(userGateway);

