import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "dev_secret_change_me";

// --- Mock DB (replace with Mongo later)
let users = []; // {id,email,password,preferences:{}}
let properties = [
  { id: "1", title: "2BHK Apartment", location: "Bangalore", price: 45000, lat: 12.9716, lng: 77.5946, description: "Spacious 2BHK near IT hub" },
  { id: "2", title: "Luxury Villa", location: "Mumbai", price: 150000, lat: 19.0760, lng: 72.8777, description: "Sea view villa" },
  { id: "3", title: "1BHK Flat", location: "Delhi", price: 25000, lat: 28.7041, lng: 77.1025, description: "Near metro" }
];

const auth = (req,res,next)=>{
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if(!token) return res.status(401).json({error:"No token"});
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({error:"Invalid token"});
  }
};

// --- Auth
app.post("/auth/signup", (req,res)=>{
  const {email, password} = req.body;
  if(!email || !password) return res.status(400).json({error:"email & password required"});
  if(users.some(u=>u.email===email)) return res.status(409).json({error:"Email exists"});
  const user = { id: String(users.length+1), email, password, preferences:{} };
  users.push(user);
  const token = jwt.sign({id:user.id,email}, JWT_SECRET, {expiresIn:"7d"});
  res.json({ token, user:{id:user.id, email, preferences:user.preferences} });
});

app.post("/auth/login", (req,res)=>{
  const {email, password} = req.body;
  const user = users.find(u=>u.email===email && u.password===password);
  if(!user) return res.status(401).json({error:"Invalid credentials"});
  const token = jwt.sign({id:user.id,email}, JWT_SECRET, {expiresIn:"7d"});
  res.json({ token, user:{id:user.id, email, preferences:user.preferences} });
});

// --- Properties
app.get("/properties", (req,res)=> res.json(properties));

app.get("/properties/:id", (req,res)=>{
  const p = properties.find(x=>x.id===req.params.id);
  if(!p) return res.status(404).json({error:"Not found"});
  res.json(p);
});

// --- Preferences (protected)
app.put("/users/preferences", auth, (req,res)=>{
  const me = users.find(u=>u.id===req.user.id);
  if(!me) return res.status(404).json({error:"User not found"});
  me.preferences = req.body || {};
  res.json({ ok:true, preferences: me.preferences });
});

const PORT = 5000;
app.listen(PORT, ()=> console.log("API on http://localhost:"+PORT));
