import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
const initFirebaseAdmin = () => {
  try {
    if (getApps().length === 0) {
      // If service account env vars are provided, use them. Otherwise, default to application default credentials
      if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        console.warn("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env. Falling back to default app.");
        initializeApp();
      }
    }
    return true;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    return false;
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // Init Admin
  initFirebaseAdmin();

  // API Route to delete a user
  app.delete("/api/users/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      
      // Basic security check: Validate auth token here in production.
      // For demonstration, we just delete the user using admin SDK.
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized. Please provide an ID token." });
      }
      
      const idToken = authHeader.split("Bearer ")[1];
      const decodedToken = await getAuth().verifyIdToken(idToken);
      
      // Optional: Check if caller is admin. Assuming we check custom claims or just let it pass if token is valid.
      // Ideally we should check if caller is an admin in Firestore, but for simplicity we rely on the token.
      const callerUid = decodedToken.uid;
      const callerDoc = await getFirestore().collection('users').doc(callerUid).get();
      const callerData = callerDoc.data();
      
      if (!callerData || (callerData.role !== 'admin' && callerData.role !== 'chairman')) {
         return res.status(403).json({ error: "Forbidden. Only Admins or Chairmen can delete users." });
      }

      // Delete from Firebase Auth
      try {
        await getAuth().deleteUser(uid);
      } catch (authError: any) {
        if (authError.code === 'auth/user-not-found') {
          console.warn(`User ${uid} not found in Auth, but proceeding to delete from Firestore.`);
        } else {
          console.error("Error deleting user from Auth:", authError);
          // If we can't delete from auth due to some other error, we might still want to delete from firestore,
          // but we'll rethrow if it's an initialization error so they know.
          throw authError; 
        }
      }
      
      // Delete from Firestore
      await getFirestore().collection('users').doc(uid).delete();
      
      res.json({ success: true, message: "User deleted successfully from Auth and Firestore." });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
