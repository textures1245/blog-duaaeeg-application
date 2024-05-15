//- usecase injection

import { PUBLIC_BASE_API_HTTP_DEV } from '$env/static/public';
import AuthUsecase from './auth.usecase';
import APIAuthGateway from '../adapters/handler/auth/http/v1/gateway';

const authGateway = new APIAuthGateway(PUBLIC_BASE_API_HTTP_DEV);

export const NewAuthUsecase = new AuthUsecase(authGateway);
