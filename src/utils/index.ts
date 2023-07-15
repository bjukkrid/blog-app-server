const { v4: uuidv4 } = require("uuid");
import { Response } from "express";

export const HandleSuccessResponse = (res: Response, data: any) => {
  return res.status(200).json({
    status: "success",
    data: data,
    status_code: "20000",
    ref: uuidv4(),
  });
};

export const HandleErrorResponse = (res: Response, error: any) => {
  console.log(error);
  return res.status(200).json({
    status: "error",
    error: typeof error === "string" ? error : error.message,
    status_code: "22000",
    ref: uuidv4(),
  });
};
