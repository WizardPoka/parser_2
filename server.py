# =================================================================================================

# server.py
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

# =================================================================================================

app = Flask(__name__)
CORS(app, resources={r"/get_*": {"origins": "http://localhost:3000"}})

# =================================================================================================

df = pd.read_excel(r'c:\new_VKR_parser\1.xlsx')

# =================================================================================================

@app.route('/get_groups', methods=['GET'])
def get_groups():
    groups = df.columns[2:].tolist()

    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'  # Добавляем заголовок для CORS, чтобы разрешить запросы из любых источников
    }

    return jsonify(groups), 200, headers

@app.route('/get_schedule', methods=['POST'])
def get_schedule():
    group_name = request.json['group_name']
    group_schedule = df[df[group_name].notnull()][['День', 'Урок', group_name]].to_dict(orient='records')

    # Заменяем NaN на null
    for item in group_schedule:
        for key, value in item.items():
            if value != value:  # Проверяем, является ли значение NaN
                item[key] = None
                
    print(group_schedule)
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'  # Добавляем заголовок для CORS, чтобы разрешить запросы из любых источников
    }

    return (json.dumps(group_schedule, ensure_ascii=False), 200, headers)


if __name__ == '__main__':
    app.run(debug=True)