const dev = process.env.NODE_ENV !== "production";

export const serverURL = dev ? "http://localhost:3001" : "https://coco-tracker-api.herokuapp.com";
