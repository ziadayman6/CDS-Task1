export type request = {
  username: string;
  password: string;
};

type jwtToken = {
  token: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

function scheduleTokenRefresh(token: jwtToken) {
  const refreshTime = (token.expiresIn - 60) * 1000;

  setTimeout(async () => {
    try {
      const newToken = await updateToken(token);
      scheduleTokenRefresh(newToken);
    } catch (error) {
      console.error("❌ Failed to refresh token:", error);
    }
  }, refreshTime);
}

function updateToken(token: jwtToken): Promise<jwtToken> {
  return new Promise((resolve, reject) => {
    if (!token || !token.token || !token.refreshToken) {
      return reject(new Error("Invalid token object"));
    }

    setTimeout(() => {
      console.log("updated");
      resolve({
        ...token,
        expiresIn: token.expiresIn + 3600,
        refreshExpiresIn: token.refreshExpiresIn + 7200,
      });
    }, 1000);
  });
}

export function login(req: request): Promise<jwtToken> {
  return new Promise((resolve, reject) => {
    // Simulate an API call
    setTimeout(() => {
      if (req.username === "admin" && req.password === "password") {
        const token: jwtToken = {
          token: "jwt-token",
          expiresIn: 120,
          refreshToken: "refresh-jwt-token",
          refreshExpiresIn: 7200,
        };
        scheduleTokenRefresh(token);

        resolve(token);
      } else {
        reject(new Error("Invalid username or password"));
      }
    }, 1000);
  });
}
