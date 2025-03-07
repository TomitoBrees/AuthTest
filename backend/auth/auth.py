import bcrypt

# Hash le mot de passe de l'utilisateur pour le mettre dans la DB
def hash_password(password: str):
    b_password = password.encode("utf-8")
    return bcrypt.hashpw(b_password, bcrypt.gensalt()).decode("utf-8")

# Verifie si le password (non-hashé) est similaire au password de la DB (hashé)
def check_password(password: str, hashed_password: str):
    b_password = password.encode("utf-8")
    b_hashed = hashed_password.encode("utf-8")
    return bcrypt.checkpw(b_password, b_hashed)