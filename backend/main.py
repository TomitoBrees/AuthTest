import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class User(BaseModel):
    username: str
    password: str

class Users(BaseModel):
    users: List[User]
app = FastAPI()

origins = [
    "http://localhost:5173" # Defini le serveur de developpement comme l'origine des requetes API
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = {"users": []}

@app.get("/users", response_model=Users)
def get_users():
    return Users(users=db["users"])

@app.post("/users", response_model=User)
def add_user(user: User):
    db["users"].append(user)
    return user

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)