from fastapi import FastAPI, UploadFile, File
import pandas as pd
import uvicorn
from indb import process_dataframe, get_processed_results

app = FastAPI()
data_set_instances = []


@app.post("/upload-csv")
def upload_csv(file: UploadFile = File(...)):
    # Ler o arquivo CSV enviado
    print("Lendo o arquivo CSV enviado...")
    df = pd.read_csv(file.file)
    print("Arquivo CSV lido com sucesso:")
    print(df.head())

    # Processar o DataFrame
    data_df = process_dataframe(df)
    print({"message": "Arquivo processado com sucesso."})
    return data_df


@app.get("/get-results")
def get_results(data_df):
    return get_processed_results(data_df)


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=7777)
