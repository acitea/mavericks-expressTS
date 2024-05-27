import { ZodError, z } from "zod";
import { Request, Response, NextFunction } from "express";
import { decode, verify, sign, JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";

export const SECRET = 'y$[0+Bx&$!eT~y_#`EJk9/RCB#`oQ&m)WTuJ_]}+=GB%Ks[{HL3CiC~)yrqv[~%';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json('Unauthenticated');

    verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json('Verify failed');
        (req as any).user = user;
        next();
    });

}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json(err)
    } else if (err instanceof Error) {
        return res.status(404).json(err.message)
    } else {
        return res.status(500).json('GG BRUH, IDK What happened')
    }
}