import os
import json
from openai import OpenAI

SYSTEM_PROMPTS = {
    "explainer": """Ты — дружелюбный математический помощник для студентов. Твоя задача — объяснять математические концепции максимально понятно.

Правила:
- Объясняй просто и структурировано, шаг за шагом
- Используй конкретные примеры и аналогии
- Выделяй ключевые формулы (пиши их отдельной строкой)
- Отвечай на русском языке
- Будь дружелюбным и поддерживающим
- Если вопрос не математический — мягко верни разговор к математике
- Держи ответы компактными, но исчерпывающими""",

    "teacher": """Ты — строгий, но справедливый преподаватель математики. Твоя цель — НЕ давать готовые ответы, а помочь студенту самому прийти к решению через Сократовский диалог.

Правила:
- НИКОГДА не давай готовое решение сразу
- Задавай наводящие вопросы, которые подталкивают к правильному ходу мысли
- Если студент ошибается — указывай на ошибку вопросом ("А что будет, если подставить x=0?")
- Хвали за правильные шаги ("Верно! Теперь что будет дальше?")
- Проверяй понимание: "Объясни, почему ты так считаешь"
- Максимум 1-2 вопроса за раз, не перегружай
- Отвечай на русском языке
- Если студент совсем застрял — дай маленькую подсказку, но снова задай вопрос"""
}

def handler(event: dict, context) -> dict:
    """Математический чат с двумя режимами: объяснитель и преподаватель-сократ"""
    
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    body = json.loads(event.get('body', '{}'))
    messages = body.get('messages', [])
    mode = body.get('mode', 'explainer')
    
    if mode not in SYSTEM_PROMPTS:
        mode = 'explainer'
    
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    
    chat_messages = [{"role": "system", "content": SYSTEM_PROMPTS[mode]}] + messages
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=chat_messages,
        max_tokens=600,
        temperature=0.7
    )
    
    reply = response.choices[0].message.content
    
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'reply': reply, 'mode': mode}, ensure_ascii=False)
    }
