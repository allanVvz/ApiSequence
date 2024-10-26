class DataSet:
    def __init__(self, pgn, byte, sequence):
        self.pgn = pgn
        self.byte = byte
        self.sequence = sequence

    def __repr__(self):
        return f"DataSet(pgn={self.pgn}, byte={self.byte}, sequence={self.sequence})"
