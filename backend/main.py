import uvicorn
import bcrypt
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from auth.auth import hash_password, check_password


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

@app.post("/users")
def add_user(user: User):
    for e in db["users"]:
        if e.username == user.username:
            return {"success": False}

    hashed_password = hash_password(user.password)
    db["users"].append(User(username = user.username, password = hashed_password))
    return {"success": True}


@app.post("/check-user")
def check_user(user: User):
    for e in db["users"]:
        if e.username == user.username and check_password(user.password, e.password):
            return {"success": True}
        else:
            return {"success": False}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)