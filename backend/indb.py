import pandas as pd

df = None

class DataProcessor:
    def __init__(self):
        self.df = None
        self.dataSet_instances = []

    def coluna_eh_constante(self, coluna):
        return coluna.nunique() == 1


    def process_dataframe(self, df):
        data_list = []

        # Exibir as primeiras linhas do DataFrame para verificar a estrutura
        print("Primeiras linhas do DataFrame:")
        print(df.head())

        # Iterar sobre cada PGN único no DataFrame
        for pgn in df['pgn'].unique():
            df_pgn = df[df['pgn'] == pgn].copy()  # Filtrar o DataFrame para o PGN atual

            print(f"\nAnalisando PGN: {pgn}")
            print("Primeiras linhas do DataFrame para este PGN:")
            print(df_pgn.head())  # Exibir o DataFrame filtrado por PGN

            # Iterar sobre as colunas de bytes (de 'byte_1' até 'byte_8')
            for i in range(1, 9):  # Para os bytes de 1 a 8
                byte_column = f'byte_{i}'  # Supondo que os bytes estão nomeados como byte_1, byte_2, ..., byte_8

                # Verificar se a coluna existe no DataFrame
                if byte_column not in df_pgn.columns:
                    print(f"{byte_column} não encontrada no DataFrame.")
                    continue

                # Verificar se a coluna tem valores constantes e descartar se tiver
                if self.coluna_eh_constante(df_pgn[byte_column]):
                    print(f"{byte_column} descartada por ser constante.")
                    continue

                print(f"Processando {byte_column}")

                # Obter os valores de cada byte
                X = df_pgn[byte_column].values

                if len(X) > 1:  # Garantir que temos dados suficientes
                    # Armazenar os dados para processamento posterior
                    data_list.append({'pgn': pgn, 'byte_column': byte_column, 'data': X})
                else:
                    print(f"Dados insuficientes em {byte_column} para PGN {pgn}.")

        # Criar um DataFrame com os dados coletados, se houver dados suficientes
        if data_list:
            self.df = pd.DataFrame(data_list)
        else:
            self.df = None

        print("DataFrame final após análise:")
        print(self.df)


    def get_processed_results(self):
        if self.df is not None:
            return self.df.to_dict(orient='records')
        else:
            return {"message": "Nenhum dado processado disponível."}