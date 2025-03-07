from sqlalchemy import Boolean, Column, Integer, String
from database.database import Base

# Model d'utilisateur pour la DB
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)