import express from "express";
import {getUsers} from "../controlles/user.js";
import {search} from "../controlles/user.js"

const router = express.Router();

router.get("/", getUsers);
router.get("/search",search)

export default router;