import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes"; // Import all routes

dotenv.config(); // Load environment variables

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'https://brainly-frontend-three.vercel.app', // Frontend URL
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}));

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Use all the routes defined
app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});




















/*import express from "express";
import cors from "cors";
import { userMiddleware } from "./middleware/userMiddleware";
import { UserModel, ContentModel, LinkModel } from "./models/db"; // Ensure correct path to models
import { SignJWT } from "jose";
import { TextEncoder } from "util";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://brainly-frontend-three.vercel.app', // Change this to your frontend URL
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}));

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Signup route
app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        await UserModel.create({ username, password });

        res.json({ message: "User signed up" });
    } catch (e) {
        res.status(409).json({ message: "User already exists" });
    }
});

// Sign-in route
app.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
        // Use jose to sign the JWT
        const token = await new SignJWT({ id: existingUser._id })
            .setProtectedHeader({ alg: "HS256" })
            .sign(new TextEncoder().encode(process.env.JWT_PASSWORD));

        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// Middleware to verify the JWT
app.post("/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;

    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    });

    res.json({ message: "Content added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const { userId } = req;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json({ content });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const { contentId } = req.body;

    await ContentModel.deleteMany({ contentId, userId: req.userId });

    res.json({ message: "Deleted" });
});

// Share link route
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });

        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }

        const hash = Math.random().toString(36).substring(7); // Random hash generation
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const { shareLink: hash } = req.params;

    const link = await LinkModel.findOne({ hash });

    if (!link) {
        res.status(411).json({ message: "Sorry, incorrect input" });
        return;
    }

    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    if (!user) {
        res.status(411).json({ message: "User not found, error should ideally not happen" });
        return;
    }

    res.json({ username: user.username, content });
});

app.listen(5000, () => {
    console.log("Backend server running on port 5000");
});








/*import express from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    // TODO: zod validation , hash the password
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        }) 

        res.json({
            message: "User signed up"
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                userId: req.userId,
                hash: hash
            })

            res.json({
                hash
            })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);*/