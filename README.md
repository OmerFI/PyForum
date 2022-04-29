# PyForum

PyForum is a full-stack web application made using Django on the backend and React on the frontend.

Requires `Python 3.6+` and `Nodejs`

## How to test

```bash
git clone https://github.com/OmerFI/PyForum.git
cd PyForum/frontend
npm install
npm run build
cd ../backend
pip install -r requirements.txt
python3 manage.py collectstatic
python3 manage.py migrate
python3 manage.py runserver
```