import csv
import requests

DATABASE_URL = "http://localhost:3000"
GAZDA_ENDPOINT = "/gazda"
HAZIALLATOK_ENDPOINT = "/haziallatok"

GAZDA_CSV_PATH = "Gazda.csv"
HAZIALLATOK_CSV_PATH = "HaziAllatok.csv"

def read_csv_file(csv_path):
    data = []
    with open(csv_path, newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        for row in reader:
            data.append(row)
    return data

def upload_data_to_database(data, endpoint):
    url = f"{DATABASE_URL}{endpoint}"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200 or response.status_code == 201:
        print(f"Data uploaded successfully to {endpoint}.")
    else:
        print(f"Failed to upload data to {endpoint}. Status code: {response.status_code}")

def main():
    gazda_data = read_csv_file(GAZDA_CSV_PATH)
    haziallatok_data = read_csv_file(HAZIALLATOK_CSV_PATH)

    upload_data_to_database(gazda_data, GAZDA_ENDPOINT)
    upload_data_to_database(haziallatok_data, HAZIALLATOK_ENDPOINT)

if __name__ == "__main__":
    main()
