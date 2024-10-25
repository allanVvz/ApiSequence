from itertools import product

from fastapi import FastAPI

from indb import generate_products

app = FastAPI()

products = generate_products()

@app.get("/")
def get_languages():
    return {"products": products}