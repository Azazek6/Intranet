import { Router } from "express";
import main from "./main.routes.js";
import auth from "./auth.routes.js";
import admin from "./admin.routes.js";
import reception from "./reception.routes.js";
import doctor from "./doctor.routes.js";

const router = Router();

router.use(main);
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/receptionist", reception);
router.use("/doctor", doctor);

export default router;
