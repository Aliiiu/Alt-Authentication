const http = require('http');

const getUserDetails = (req, res) => {
	const { username, password } = req.headers;
	if (!username || !password) {
		res.statusCode = 400;
		res.end('Please enter a username or password');
		return;
	}

	if (username !== 'Aliu' || password !== '1234') {
		res.statusCode = 401;
		res.end('Enter a valid username or password');
		return;
	}

	return { username, password };
};

const getBodyFromStream = (req) => {
	return new Promise((resolve, reject) => {
		const data = [];
		req.on('data', (chunk) => {
			data.push(chunk);
		});

		req.on('end', () => {
			const body = Buffer.concat(data).toString();

			if (body) {
				resolve(JSON.parse(body));
				return;
			}

			resolve({});
		});

		req.on('error', (error) => {
			reject(error);
		});
	});
};

const server = http.createServer();

server.on('request', async (req, res) => {
	const { username, password } = getUserDetails(req, res);
	console.log({ username, password });

	if (username && password) {
		try {
			const body = await getBodyFromStream(req);
			console.log({ body });
			if (req.method === 'GET' && req.url === '/books') {
				res.write('This is the list of all available books');
			} else if (req.method === 'PUT' && req.url === '/books') {
				res.write('Book successfully updated');
			} else if (req.method === 'POST' && req.url === '/books') {
				res.write('Book successfully added');
			} else if (req.method === 'PATCH' && req.url === '/books') {
				res.write('Book successfully updated');
			} else if (req.method === 'DELETE' && req.url === '/books') {
				res.write('Book successfully deleted');
			} else if (req.method === 'GET' && req.url === '/author') {
				res.write('Here is the list of available authors');
			} else if (req.method === 'POST' && req.url === '/author') {
				res.write('Author added successfully.');
			} else if (req.method === 'PUT' && req.url === '/author') {
				res.write('Author details updated successfully.');
			} else if (req.method === 'PATCH' && req.url === '/author') {
				res.write('Author details updated successfully.');
			} else if (req.method === 'DELETE' && req.url === '/author') {
				res.write('Author details updated successfully.');
			} else {
				res.write('Route not found, check url');
			}
		} catch (error) {}
	}

	res.end();
});

server.listen(8900, null, null, () => {
	console.log('Server running on port 8900');
});
