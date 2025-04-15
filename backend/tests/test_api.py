import sys
import os

# Add the parent directory (backend/) to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app  
import pytest

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_get_professors(client):
    response = client.get('/api/professors')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    if response.json:
        sample = response.json[0]
        assert 'name' in sample
        assert 'email' in sample
        assert 'office_hours' in sample

def test_empty_db_response(client):
    response = client.get('/api/professors')
    assert response.status_code == 200
    assert isinstance(response.json, list)
