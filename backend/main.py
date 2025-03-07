# Imports pour API endpoints
import uvicorn
import bcrypt
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated

# Imports pour connection avec database (postgresql)
from database import models
from database.models import User
from database.database import engine, SessionLocal
from sqlalchemy.orm import Session

# Import pour hashing du mot de passe
from auth.auth import hash_password, check_password

# Models pour les reponses des endpoints
class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    username: str

class Users(BaseModel):
    users: List[UserResponse]

# Creation de l'app et de la database
app = FastAPI()
models.Base.metadata.create_all(bind=engine)

# Fonction pour lier la database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

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

# Endpoint GET pour prendre tout les utilisateurs sous forme de liste
@app.get("/users", response_model=Users)
def get_users(db: db_dependency):
    users = db.query(User.username).all()

    user_list = []
    for u in users:
        user_list.append(UserResponse(username=u[0]))

    return Users(users=user_list)


# Enpoint POST pour ajouter un utilisateur
@app.post("/users")
async def add_user(user: UserCreate, db: db_dependency):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        return {"success": False}

    hashed_password = hash_password(user.password)
    db_user = User(username = user.username, hashed_password = hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"success": True}


# Enpoint post pour verifier si un utilisateur existe
@app.post("/check-user")
def check_user(user: UserCreate, db: db_dependency):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing and check_password(user.password, existing.hashed_password):
        return {"success": True}
    else:
        return {"success": False}

# Permet d'executer main.py pour lancer le backend
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)