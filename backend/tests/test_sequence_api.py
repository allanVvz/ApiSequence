import requests

def test_sequence_api():
    r = requests.get('http://localhost:5000/sequence')
    response = r.json()
    print(response)

test_sequence_api()