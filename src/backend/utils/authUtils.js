import { Response } from "miragejs";
import dayjs from "dayjs";
import dayjsRandom from 'dayjs-random'
import jwt_decode from "jwt-decode";

dayjs.extend(dayjsRandom)

export const requiresAuth = function (request) {
  // const encodedToken = request.requestHeaders.authorization;
  const encodedToken = localStorage.getItem('encodedToken');
  const decodedToken = jwt_decode(
    encodedToken,
    process.env.REACT_APP_JWT_SECRET
  );
  if (decodedToken) {
    const user = this.db.users.findBy({ username: decodedToken.username });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
export const formatRandomPostDate = () => dayjs.between('2022-06-10T11:00:00+01:00', '2023-01-30T19:00:00+01:00').format("YYYY-MM-DDTHH:mm:ssZ");
export const formatRandomCommentDate = () => dayjs.between('2023-01-30T19:00:00+01:00', '2023-05-30T19:00:00+01:00').format("YYYY-MM-DDTHH:mm:ssZ");
