
---

### 📄 `delete.md`
```markdown
# Delete Operation

```python
from bookshelf.models import Book

# Retrieve the book
book = Book.objects.get(title="Nineteen Eighty-Four")

# Delete it
book.delete()

print(Book.objects.all())  # Expected output: <QuerySet []>
