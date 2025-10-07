const BASE_URL = 'http://localhost:7000/api';

// --- BOOKS --- //

const booksList = document.getElementById('booksList');
const loadBooksBtn = document.getElementById('loadBooksBtn');
let booksVisible = false;

loadBooksBtn.addEventListener('click', async () => {
  if (booksVisible) {
    booksList.innerHTML = '';
    loadBooksBtn.textContent = 'Load All Books';
    booksVisible = false;
  } else {
    const res = await fetch(`${BASE_URL}/books`);
    const data = await res.json();

    booksList.innerHTML = '';
    if (data.length === 0) {
      booksList.innerHTML = `<li>No books found</li>`;
    } else {
      data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `Title: ${book.title}, Author: ${book.author}, Start: ${
          book.startDate ? new Date(book.startDate).toLocaleDateString() : 'N/A'
        }`;
        li.dataset.id = book._id;
        li.style.cursor = 'pointer';

        li.addEventListener('click', () => showEditBookUI(li, book));

        booksList.appendChild(li);
      });
    }
    loadBooksBtn.textContent = 'Hide All Books';
    booksVisible = true;
  }
});

function showEditBookUI(li, book) {
  li.innerHTML = '';

  const infoSpan = document.createElement('span');
  infoSpan.textContent = `Title: ${book.title}, Author: ${book.author}, Start: ${
    book.startDate ? new Date(book.startDate).toLocaleDateString() : 'N/A'
  }, End: `;

  li.appendChild(infoSpan);

  if (!book.endDate) {
    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.value = '';
    endDateInput.addEventListener('click', e => e.stopPropagation());
    li.appendChild(endDateInput);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save End Date';
    saveBtn.style.marginLeft = '8px';
    saveBtn.addEventListener('click', e => {
      e.stopPropagation();
      saveEndDate(book, endDateInput.value, li);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Book';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#e57373';
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      deleteBook(book, li);
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.marginLeft = '10px';
    cancelBtn.addEventListener('click', e => {
      e.stopPropagation();
      li.textContent = `Title: ${book.title}, Author: ${book.author}, Start: ${
        book.startDate ? new Date(book.startDate).toLocaleDateString() : 'N/A'
      }`;
    });

    li.appendChild(saveBtn);
    li.appendChild(deleteBtn);
    li.appendChild(cancelBtn);
  } else {
    const endDateSpan = document.createElement('span');
    const date = new Date(book.endDate);
    endDateSpan.textContent = date.toLocaleDateString();
    endDateSpan.style.fontWeight = '600';
    endDateSpan.style.marginLeft = '8px';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Book';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#e57373';
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      deleteBook(book, li);
    });

    li.appendChild(endDateSpan);
    li.appendChild(deleteBtn);
  }
}

async function saveEndDate(book, newEndDate, li) {
  if (!newEndDate) {
    alert('Please enter an end date.');
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/books/${book._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endDate: newEndDate }),
    });
    if (res.ok) {
      alert('End date updated!');
      book.endDate = newEndDate;
      li.textContent = `Title: ${book.title}, Author: ${book.author}, Start: ${
        book.startDate ? new Date(book.startDate).toLocaleDateString() : 'N/A'
      }`;
    } else {
      alert('Failed to update end date.');
    }
  } catch (err) {
    alert('Error updating end date: ' + err);
  }
}

async function deleteBook(book, li) {
  if (!confirm(`Delete book: ${book.title}?`)) return;
  try {
    const res = await fetch(`${BASE_URL}/books/${book._id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Book deleted!');
      li.remove();
    } else {
      alert('Failed to delete book.');
    }
  } catch (err) {
    alert('Error deleting book: ' + err);
  }
}

document.getElementById('addBookForm').addEventListener('submit', async e => {
  e.preventDefault();
  const book = {
    title: document.getElementById('bookTitle').value,
    author: document.getElementById('bookAuthor').value,
    startDate: document.getElementById('bookStartDate').value || null,
  };

  try {
    const res = await fetch(`${BASE_URL}/books/one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (res.ok) {
      alert('Book added!');
      e.target.reset();
      if (booksVisible) loadBooksBtn.click();
    } else {
      alert('Failed to add book.');
    }
  } catch (err) {
    alert('Error adding book: ' + err);
  }
});

// --- DRAMAS --- //

const dramasList = document.getElementById('dramasList');
const loadDramasBtn = document.getElementById('loadDramasBtn');
let dramasVisible = false;

loadDramasBtn.addEventListener('click', async () => {
  if (dramasVisible) {
    dramasList.innerHTML = '';
    loadDramasBtn.textContent = 'Load All Dramas';
    dramasVisible = false;
  } else {
    const res = await fetch(`${BASE_URL}/drama`);
    const data = await res.json();

    dramasList.innerHTML = '';
    if (data.length === 0) {
      dramasList.innerHTML = `<li>No dramas found</li>`;
    } else {
      data.forEach(drama => {
        const li = document.createElement('li');
        li.textContent = `Name: ${drama.name}, Start: ${
          drama.startDate ? new Date(drama.startDate).toLocaleDateString() : 'N/A'
        }`;
        li.dataset.id = drama._id;
        li.style.cursor = 'pointer';

        li.addEventListener('click', () => showEditDramaUI(li, drama));

        dramasList.appendChild(li);
      });
    }
    loadDramasBtn.textContent = 'Hide All Dramas';
    dramasVisible = true;
  }
});

function showEditDramaUI(li, drama) {
  li.innerHTML = '';

  const infoSpan = document.createElement('span');
  infoSpan.textContent = `Name: ${drama.name}, Start: ${
    drama.startDate ? new Date(drama.startDate).toLocaleDateString() : 'N/A'
  }, End: `;

  li.appendChild(infoSpan);

  if (!drama.endDate) {
    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.value = '';
    endDateInput.addEventListener('click', e => e.stopPropagation());
    li.appendChild(endDateInput);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save End Date';
    saveBtn.style.marginLeft = '8px';
    saveBtn.addEventListener('click', e => {
      e.stopPropagation();
      saveDramaEndDate(drama, endDateInput.value, li);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Drama';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#e57373';
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      deleteDrama(drama, li);
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.marginLeft = '10px';
    cancelBtn.addEventListener('click', e => {
      e.stopPropagation();
      li.textContent = `Name: ${drama.name}, Start: ${
        drama.startDate ? new Date(drama.startDate).toLocaleDateString() : 'N/A'
      }`;
    });

    li.appendChild(saveBtn);
    li.appendChild(deleteBtn);
    li.appendChild(cancelBtn);
  } else {
    const endDateSpan = document.createElement('span');
    const date = new Date(drama.endDate);
    endDateSpan.textContent = date.toLocaleDateString();
    endDateSpan.style.fontWeight = '600';
    endDateSpan.style.marginLeft = '8px';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Drama';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.backgroundColor = '#e57373';
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      deleteDrama(drama, li);
    });

    li.appendChild(endDateSpan);
    li.appendChild(deleteBtn);
  }
}

async function saveDramaEndDate(drama, newEndDate, li) {
  if (!newEndDate) {
    alert('Please enter an end date.');
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/drama/${drama._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endDate: newEndDate }),
    });
    if (res.ok) {
      alert('End date updated!');
      drama.endDate = newEndDate;
      li.textContent = `Name: ${drama.name}, Start: ${
        drama.startDate ? new Date(drama.startDate).toLocaleDateString() : 'N/A'
      }`;
    } else {
      alert('Failed to update drama.');
    }
  } catch (err) {
    alert('Error updating drama: ' + err);
  }
}

async function deleteDrama(drama, li) {
  if (!confirm(`Delete drama: ${drama.name}?`)) return;
  try {
    const res = await fetch(`${BASE_URL}/drama/${drama._id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Drama deleted!');
      li.remove();
    } else {
      alert('Failed to delete drama.');
    }
  } catch (err) {
    alert('Error deleting drama: ' + err);
  }
}

document.getElementById('addDramaForm').addEventListener('submit', async e => {
  e.preventDefault();

  const drama = {
    name: document.getElementById('dramaName').value,
    startDate: document.getElementById('dramaStartDate').value || null,
  };

  try {
    const res = await fetch(`${BASE_URL}/drama/one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drama),
    });

    if (res.ok) {
      alert('Drama added!');
      e.target.reset();
      if (dramasVisible) loadDramasBtn.click();
    } else {
      alert('Failed to add drama.');
    }
  } catch (error) {
    alert('Error adding drama: ' + error);
  }
});
