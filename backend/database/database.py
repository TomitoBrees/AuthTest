from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# A changer en fonction de sa configuration
USER = "postgres"
PASSWORD = "1234"
DATABASE_NAME = "DRMAuth"

URL_DATABASE = f"postgresql://{USER}:{PASSWORD}@localhost:5432/{DATABASE_NAME}"

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()