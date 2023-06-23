// Listener pour le signup
document.querySelector('#register').addEventListener('click', () => {
    const user = {
        name: document.querySelector('#registerName').value,
        email: document.querySelector('#registerEmail').value,
        password: document.querySelector('#registerPassword').value,
    };
    fetch('https://weatherapp-backend-five.vercel.app/users/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
    .then(rawRes => rawRes.json())
    .then(data => {
        // Si le user n'existe pas, on le créé et on redirect
        if(data.result) window.location.assign('./index.html');
        // Sinon on console.log
        else console.log(data);
    });
});

// Listener pour le signin
document.querySelector('#connection').addEventListener('click', () => {
    const user = {
        email: document.querySelector('#connectionEmail').value,
        password: document.querySelector('#connectionPassword').value,
    }
    fetch('https://weatherapp-backend-five.vercel.app/users/signin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
    .then(rawRes => rawRes.json())
    .then(data => {
        // Si le user a renseigné le bon mail et password on redirect
        if(data.result) window.location.assign('./index.html');
        // Sinon on console.log
        else console.log(data);
    });
});