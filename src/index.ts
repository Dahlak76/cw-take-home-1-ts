import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const app = express();
app.use(express.json());
 
// Middleware for validating the request payload
const validatePayload = [
  check("payload")
    .exists()
    .withMessage("Payload is required")
    .isString()
    .withMessage("Payload must be a string")
];

// Route for transforming the payload
app.post("/transform", validatePayload, (req: Request, res: Response) => {
  // Check if the request payload is valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Transform the payload
  const { payload } = req.body;
  const transformedPayload = payload
    .split("")
    .reverse()
    .join("");

  // Respond with the transformed payload
  res.status(200).json({ transformedPayload });
});

const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Server running on port ${port}`));
