class handleCookie {}

export const setAccessToken = (res, accessToken) => {
  return res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
};

export const setRefreshToken = (res, refreshToken) => {
  return res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
};

export const clearAccessToken = (res) => {
  return res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
};

export const clearRefreshToken = (res) => {
  return res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
};
