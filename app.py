# app.py
from flask import Flask, render_template, jsonify, request
import random
import json
from datetime import datetime, timedelta

app = Flask(__name__)

# Route untuk halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# API untuk data analytics
@app.route('/api/analytics/users')
def get_user_analytics():
    # Simulasi data pengguna
    days = 30
    dates = [(datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d') for i in range(days)]
    daily_users = [random.randint(100, 500) for _ in range(days)]
    
    return jsonify({
        'dates': dates,
        'users': daily_users
    })

@app.route('/api/analytics/ai_predictions')
def get_ai_predictions():
    # Simulasi data prediksi AI
    categories = ['Conversions', 'Engagement', 'Retention', 'Churn Risk']
    actual = [random.randint(60, 100) for _ in range(len(categories))]
    predicted = [random.randint(max(50, v-10), min(100, v+10)) for v in actual]
    
    return jsonify({
        'categories': categories,
        'actual': actual,
        'predicted': predicted
    })

@app.route('/api/analytics/sentiment')
def get_sentiment_analysis():
    # Simulasi data analisis sentimen
    sentiments = ['Positive', 'Neutral', 'Negative']
    values = [random.randint(30, 50), random.randint(20, 40), random.randint(10, 30)]
    
    return jsonify({
        'sentiments': sentiments,
        'values': values
    })

@app.route('/api/analytics/traffic')
def get_traffic_sources():
    # Simulasi data sumber traffic
    sources = ['Organic', 'Direct', 'Referral', 'Social', 'Paid']
    values = [random.randint(20, 40) for _ in range(len(sources))]
    
    return jsonify({
        'sources': sources,
        'values': values
    })

@app.route('/api/analytics/anomalies')
def get_anomaly_detection():
    # Simulasi data deteksi anomali
    days = 30
    dates = [(datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d') for i in range(days)]
    values = [random.randint(70, 100) for _ in range(days)]
    anomalies = []
    
    # Tambahkan beberapa anomali secara acak
    for i in range(3):
        idx = random.randint(0, days-1)
        values[idx] = random.randint(30, 60)
        anomalies.append({
            'date': dates[idx],
            'value': values[idx],
            'expected': random.randint(70, 100)
        })
    
    return jsonify({
        'dates': dates,
        'values': values,
        'anomalies': anomalies
    })

@app.route('/api/analytics/recommendations')
def get_ai_recommendations():
    # Simulasi rekomendasi AI
    recommendations = [
        {
            'title': 'Peningkatan Engagement',
            'description': 'Tingkatkan engagement pengguna dengan meningkatkan konten video sebesar 15%',
            'impact': 'Tinggi',
            'confidence': random.randint(75, 95)
        },
        {
            'title': 'Optimasi Konversi',
            'description': 'Ubah posisi CTA pada halaman landing untuk meningkatkan konversi',
            'impact': 'Sedang',
            'confidence': random.randint(65, 85)
        },
        {
            'title': 'Retensi Pelanggan',
            'description': 'Implementasikan program loyalitas untuk pengguna yang telah aktif lebih dari 3 bulan',
            'impact': 'Tinggi',
            'confidence': random.randint(70, 90)
        }
    ]
    
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)