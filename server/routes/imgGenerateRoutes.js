import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
    res.send("Hello from Hugging Face");
});

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const stabilityaiApiKey = process.env.STABILITY_AI_TOKEN;
        console.log("Received prompt:", prompt);
        console.log("STABILITY_AI_TOKEN present:", !!stabilityaiApiKey);

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    Authorization: `Bearer ${stabilityaiApiKey}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        console.log("Hugging Face response status:", response.status);
        const contentType = response.headers.get("content-type");
        console.log("Hugging Face content-type:", contentType);
        if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            console.error("Hugging Face error data:", errorData);
            return res.status(500).json({
                error: errorData.error || errorData,
                message: "Model may be loading or there was an error.",
            });
        }

        const result = await response.blob();
        const image = Buffer.from(await result.arrayBuffer()).toString("base64");
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            error: error.message || "Something went wrong",
        });
    }
});

export default router;
