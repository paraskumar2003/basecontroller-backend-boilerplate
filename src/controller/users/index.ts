import { NextFunction, Request, Response } from "express";
import { BaseController, DerivedClassResponse } from "..";

class UsersController extends BaseController {

    constructor(protected req: Request, protected res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async createUser(): Promise<void> {
        this.executeSafely(async (): Promise<DerivedClassResponse> => {

            return {
                success: true,
                statusCode: 200,
                message: "User created successfully",
                data: {},
                error: null
            }


        })
    }

    async fetchUserList(): Promise<void> {
        this.executeSafely(async (): Promise<DerivedClassResponse> => {

            return {
                success: true,
                statusCode: 200,
                message: "User list fetched successfully",
                data: {},
                error: null
            }
        })
    }

}

export { UsersController };