from fastapi import FastAPI, UploadFile, File
import pandas as pd
import uvicorn
from indb import *
from dataset import DataSet
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
dataSet_instances = []
data_processor = DataProcessor()

# Configuração do CORS
origins = [
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir origens específicas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    # Ler o arquivo CSV enviado
    print("Lendo o arquivo CSV enviado...")
    df = pd.read_csv(file.file)
    print("Arquivo CSV lido com sucesso:")
    print(df.head())

    # Processar o DataFrame
    data_processor.process_dataframe(df)

    # Garantir que df foi inicializado corretamente
    if data_processor.df is not None:
        # Criar uma nova instância de DataSet e armazenar
        data_processor.dataSet_instances.clear()  # Limpar instâncias anteriores
        for index, row in data_processor.df.iterrows():
            data_set = DataSet(pgn=row['pgn'], byte=row['byte_column'], sequence=row['data'].tolist())
            data_processor.dataSet_instances.append(data_set)
            return {"message": "Arquivo recebido com sucesso"}
    else:
        return {"message": "Erro ao processar o arquivo: Nenhum dado válido encontrado."}

    return {"message": "Arquivo processado com sucesso."}





@app.get("/get-results")
async def get_results():
    if data_processor.dataSet_instances:
        results = [data_set.__dict__ for data_set in data_processor.dataSet_instances]
        print(results)
        return {"results": results}
    else:
        return {"message": "Nenhum dado processado disponível."}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=7777)