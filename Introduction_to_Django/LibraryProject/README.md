# 📚 LibraryProject (Django)

This is a simple **Django project** that demonstrates **CRUD operations** (Create, Retrieve, Update, Delete) on a `Book` model.  

---

## 🚀 Features
- Django project: `LibraryProject`
- Django app: `bookshelf`
- Model: `Book` with fields:
  - `title` (string)
  - `author` (string)
  - `publication_year` (integer)
- CRUD operations performed:
  - **Create** → Add new books
  - **Retrieve** → View stored books
  - **Update** → Modify book details
  - **Delete** → Remove a book
- Admin interface for managing books
- Documentation in separate `.md` files:
  - `create.md`
  - `retrieve.md`
  - `update.md`
  - `delete.md`

---

## 📂 Project Structure
LibraryProject/
│── LibraryProject/ # Main project settings
│── bookshelf/ # App with Book model
│── db.sqlite3 # SQLite database
│── manage.py # Django management script
│── create.md # Documentation for CREATE
│── retrieve.md # Documentation for RETRIEVE
│── update.md # Documentation for UPDATE
│── delete.md # Documentation for DELETE

yaml
Copy code

---

## ⚙️ How to Run

1. Clone/download the project  
2. Navigate into the folder  
   ```bash
   cd LibraryProject
Run the server

bash
Copy code
python manage.py runserver
Open your browser and go to:
👉 http://127.0.0.1:8000/admin/

📝 Example CRUD
Create → Add 1984 by George Orwell (1949)

Retrieve → Fetch book details

Update → Change title to Nineteen Eighty-Four

Delete → Remove the book from the database

👨‍💻 Author
Project by Bevan 

yaml
Copy code

---

Do you want me to also include **screenshots** of your Django Admin & CRUD operatio