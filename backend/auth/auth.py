import bcrypt

def hash_password(password: str):
    b_password = password.encode("utf-8")
    return bcrypt.hashpw(b_password, bcrypt.gensalt())

def check_password(password: str, hashed_password: str):
    b_password = password.encode("utf-8")
    b_hashed = hashed_password.encode("utf-8")
    return bcrypt.checkpw(b_password, b_hashed)