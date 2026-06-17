import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''
    Принимает заявку на запись к врачу и отправляет её на email клиники.
    Args: event - dict с httpMethod, body (name, phone, doctor, time)
          context - объект с request_id
    Returns: HTTP-ответ со статусом отправки
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = str(body.get('name', '')).strip()
    phone = str(body.get('phone', '')).strip()
    doctor = str(body.get('doctor', '')).strip()
    appt_time = str(body.get('time', '')).strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Имя и телефон обязательны'}),
        }

    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    notify_email = os.environ.get('NOTIFY_EMAIL')

    if not all([host, user, password, notify_email]):
        return {
            'statusCode': 500,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Почта не настроена'}),
        }

    text = (
        'Новая заявка на запись к врачу\n\n'
        f'Имя: {name}\n'
        f'Телефон: {phone}\n'
        f'Врач: {doctor or "не указан"}\n'
        f'Время: {appt_time or "не указано"}\n'
    )

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header('Новая заявка — запись к врачу', 'utf-8')
    msg['From'] = user
    msg['To'] = notify_email

    with smtplib.SMTP_SSL(host, 465) as server:
        server.login(user, password)
        server.sendmail(user, [notify_email], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'success': True}),
    }
