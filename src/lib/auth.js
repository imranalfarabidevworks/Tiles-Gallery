import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(); 

export const auth = betterAuth({
  database: mongodbAdapter(db),
  

  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    "https://gallery-of-tiles.vercel.app",
    "https://gallery-of-tiles-lb0a7pag7-imranalfarabidevworks-7647s-projects.vercel.app"
  ],

  emailAndPassword: {
    enabled: true,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
      },
    },
  },
});