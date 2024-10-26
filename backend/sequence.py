from pydantic import BaseModel

class Sequences(BaseModel):
    sequence: list[int]
    pgn: float
    accuracy:float