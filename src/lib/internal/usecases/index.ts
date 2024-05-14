//- usecase injection

import AuthUsecase from './auth.usecase';
import APIAuthGateway from '../adapters/handler/auth/http/v1/gateway';

const authGateway = new APIAuthGateway();

export const NewAuthUsecase = new AuthUsecase(authGateway);
