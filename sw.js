// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado correctamente:', registration);
            })
            .catch(error => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.jpg') || event.request.url.endsWith('.jpeg') || event.request.url.endsWith('.png')) {
        event.respondWith(
            fetch('/NFL.png')
        );
    }
});

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin === 'http://jsonplaceholder.typicode.com') {
        if (requestUrl.pathname.includes('/todos')) {
            event.respondWith(fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                            .then(data => {
                                data.forEach(todo => {
                                    // Publicar ID de pendientes con un símbolo especial
                                    if (todo.hasOwnProperty('id')) {
                                        const specialSymbol = '*';
                                        todo.id = todo.id + specialSymbol;
                                    }
                                });
                                return new Response(JSON.stringify(data), {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                            });
                    } else {
                        return response;
                    }
                })
                .catch(error => {
                    console.error('Error al procesar la respuesta:', error);
                    return new Response(null, {
                        status: 500,
                        statusText: 'Internal Server Error'
                    });
                }));
        }
    }
});

const url = "http://jsonplaceholder.typicode.com/todos";

// Función para mostrar todos los pendientes (solo IDs)
function showAllIDs() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const ids = data.map(todo => todo.id);
            document.getElementById('output').innerText = ids.join('\n');
        });
}

// Función para mostrar todos los pendientes (IDs y Titles)
function showAllIDsAndTitles() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const idTitles = data.map(todo => `${todo.id}: ${todo.title}`);
            document.getElementById('output').innerText = idTitles.join('\n');
        });
}

// Función para mostrar los pendientes sin resolver (ID y Title)
function showUncompletedTasks() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const uncompletedTasks = data.filter(todo => !todo.completed)
                                            .map(todo => `${todo.id}: ${todo.title}`);
            document.getElementById('output').innerText = uncompletedTasks.join('\n');
        });
}

// Función para mostrar los pendientes resueltos (ID y Title)
function showCompletedTasks() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const completedTasks = data.filter(todo => todo.completed)
                                          .map(todo => `${todo.id}: ${todo.title}`);
            document.getElementById('output').innerText = completedTasks.join('\n');
        });
}

// Función para mostrar todos los pendientes (IDs y userID)
function showIDsAndUserIDs() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const idUserIDs = data.map(todo => `${todo.id}: ${todo.userId}`);
            document.getElementById('output').innerText = idUserIDs.join('\n');
        });
}

// Función para mostrar los pendientes resueltos con UserIDs (ID y userID)
function showCompletedTasksWithUserIDs() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const completedTasksWithUserIDs = data.filter(todo => todo.completed)
                                                    .map(todo => `${todo.id}: ${todo.userId}`);
            document.getElementById('output').innerText = completedTasksWithUserIDs.join('\n');
        });
}

// Función para mostrar los pendientes sin resolver con UserIDs (ID y userID)
function showUncompletedTasksWithUserIDs() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const uncompletedTasksWithUserIDs = data.filter(todo => !todo.completed)
                                                      .map(todo => `${todo.id}: ${todo.userId}`);
            document.getElementById('output').innerText = uncompletedTasksWithUserIDs.join('\n');
        });
}


function handleOptionChange() {
    const selectedOption = document.getElementById('options').value;
    switch (selectedOption) {
        case 'showAllIDs':
            showAllIDs();
            break;
        case 'showAllIDsAndTitles':
            showAllIDsAndTitles();
            break;
        case 'showUncompletedTasks':
            showUncompletedTasks();
            break;
        case 'showCompletedTasks':
            showCompletedTasks();
            break;
        case 'showIDsAndUserIDs':
            showIDsAndUserIDs();
            break;
        case 'showCompletedTasksWithUserIDs':
            showCompletedTasksWithUserIDs();
            break;
        case 'showUncompletedTasksWithUserIDs':
            showUncompletedTasksWithUserIDs();
            break;
        default:
            console.error('Opción no válida');
    }
}