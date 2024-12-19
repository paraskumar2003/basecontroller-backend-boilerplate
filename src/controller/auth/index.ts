import { NextFunction, Request, Response } from "express";
import { BaseController, DerivedClassResponse } from "..";
import { User } from "../../entity/mongo";
import jwt from "jsonwebtoken";
import { HelperFunctions } from "../../lib";

let secretKey = process.env.JWT_SECRET_KEY as string;

class authController extends BaseController {

    constructor(protected req: Request, protected res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async register(): Promise<void> {

        this.executeSafely(async (): Promise<DerivedClassResponse> => {

            const { username, mobile, email, password = 1234 } = this.req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ mobile });

            if (existingUser) {
                return {
                    statusCode: 409,
                    success: false,
                    message: "User already exists",
                    data: null,
                    error: {
                        message: "Mobile number already exists. Kindly Login"
                    }
                }
            }


            // Register the new user
            const newUser = new User({
                user_id: HelperFunctions.generateUID(),
                username,
                mobile,
                ...(email ? { email } : {}),
                ...(password ? { password } : {}),
            });

            await newUser.save();

            let accessToken = jwt.sign({ username, mobile, user_id: newUser.user_id }, secretKey);

            return {
                statusCode: 200,
                success: true,
                message: 'User registered successfully',
                data: { user: newUser, accessToken },
                error: null
            }
        });
    }


    async login(): Promise<void> {

        this.executeSafely(async (): Promise<DerivedClassResponse> => {

            const { mobile, password } = this.req.body;

            const user = await User.findOne({ mobile });

            if (!user) {

                return {
                    statusCode: 409,
                    success: false,
                    message: "No user exist with this mobile number. Kindly register",
                    data: null,
                    error: null
                }
            }

            if (user.password === password) {

                let accessToken = jwt.sign({ username: user.username, mobile: user.mobile, user_id: user.user_id }, secretKey);

                return {
                    statusCode: 200,
                    success: true,
                    message: 'User logged in successfully',
                    data: {
                        user: user,
                        accessToken
                    },
                    error: null
                }
            } else {
                return {
                    statusCode: 400,
                    success: false,
                    message: 'Invalid password',
                    data: null,
                    error: {
                        message: 'Invalid password',
                    }
                }
            }


        })
    }


}

export { authController };
