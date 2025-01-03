import pandas as pd
from sklearn.model_selection import train_test_split

import json

# Сначала загрузить и сохранить данные в формате *.csv
# from datasets import load_dataset
# ld = load_dataset("Johnie2Turbo/advertisment_instraction")
# data = ld['train']
# data.to_csv('advertisment_instruction.csv', index=False, encoding='utf-8')

def write_json_data(filepath: str, system_prompt: str) -> None:
    data = pd.read_csv(filepath)

    train_data, val_data = train_test_split(data, test_size=0.2, stratify=data['source'], shuffle=True)

    json_data_train = []
    json_data_val = []

    with open('./data/train_data.json', mode='w', encoding="utf-8") as writer1:
        for idx, row in train_data.iterrows():
            row_dict = {
                "instruction": row['instruction'],
                "input": "",
                "output": row['output'],
                "system": system_prompt
            }
            json_data_train.append(row_dict)
        
        json.dump(json_data_train, writer1, ensure_ascii=False, indent=4)
    
    with open('./data/val_data.json', mode='w', encoding="utf-8") as writer2:
        for idx, row in val_data.iterrows():
            row_dict = {
                "instruction": row['instruction'],
                "input": "",
                "output": row['output'],
                "system": system_prompt
            }
            json_data_val.append(row_dict)
    
        json.dump(json_data_val, writer2, ensure_ascii=False, indent=4)



if __name__ == '__main__':
    write_json_data(filepath='advertisment_instruction.csv',
                    system_prompt='Ты профессиональный маркетолог-копирайтер, который создает эффективные и убедительные рекламные тексты.')
        
