<h1 style="text-align: center; color: #1db954;">🎧 Spotify Clone RESTful API 🎶</h1>

<h2 style="color: #1db954;">🚀 Description</h2>
<p>This project is a RESTful API clone of Spotify, built using <strong>NestJS</strong> and <strong>Microservices architecture</strong> with <strong>multiple databases</strong>. It provides functionality to manage <strong>users</strong>, <strong>playlists</strong>, <strong>songs</strong>, <strong>albums</strong>, <strong>artists</strong>, and more features commonly found in music streaming platforms like Spotify.</p>

<h2 style="color: #1db954;">✨ Features</h2>
<ul>
  <li>🎤 <strong>User authentication</strong> with <strong>JWT</strong></li>
  <li>🎵 <strong>Manage playlists, songs, albums, artists</strong>, etc.</li>
  <li>🔄 <strong>CRUD operations</strong> for all elements (users, playlists, songs)</li>
  <li>🏗️ Multiple <strong>microservices</strong> to handle different functionalities (e.g., user management, song catalog, playlist service)</li>
  <li>🛠️ Integration with <strong>multiple databases</strong> for scalability</li>
  <li>🔒 <strong>API rate limiting</strong> and security features</li>
  <li>🚀 <strong>Scalable architecture</strong> for easy future extensions</li>
</ul>

<h2 style="color: #1db954;">💻 Technologies Used</h2>
<ul>
  <li><strong>NestJS</strong> – Framework for building efficient, scalable Node.js server-side applications</li>
  <li><strong>Microservices</strong> – Using microservice architecture for better scalability and separation of concerns</li>
  <li><strong>JWT</strong> – For secure user authentication</li>
  <li><strong>TypeORM/Prisma</strong> – For interacting with databases</li>
  <li><strong>PostgreSQL/MySQL</strong> – Databases for storing user, song, and playlist data</li>
  <li><strong>RabbitMQ</strong> – For asynchronous communication between microservices</li>
  <li><strong>Docker</strong> – For containerizing the services</li>
  <li><strong>AWS S3</strong> – For storing song media files </li>
  <li><strong>Elasticsearch</strong> – For full-text search and analytics on song data</li>
  <li><strong>Postman</strong> – For API testing and documentation</li>
  <li><strong>TablePlus</strong> – For managing and querying databases with a user-friendly interface</li>
</ul>

<h1 style="color: red;">⚠️ NOTE</h1>
<h1><p>🚨 For security reasons, please contact me via email (see the Contact section) to get information about environment variables for AWS S3 (for song media file management) and ELK (for Elasticsearch – SearchService).</p></h1>
<h1><p>🚧 The <strong>Frontend</strong> is currently under development, so please ignore the FE folder in this repository.</p></h1>

<h2 style="color: #1db954;">🛠️ Installation</h2>
<p><strong>Prerequisites</strong><br>
Before you begin, make sure you have the following installed:</p>

<ol>
  <li>Node.js (version 20.17.0 or higher)</li>
  <li>yarn/npm or any package manager (I suggest using yarn)</li>
  <li>Docker (for containerizing services)</li>
  <li>PostgreSQL/MySQL (or any databases you're using)</li>
  <li>RabbitMQ (for inter-service communication)</li>
  <li>Elasticsearch (for search capabilities)</li>
  <li>TablePlus (for database management)</li>
</ol>

<h3>1. Clone the repository:</h3>
<pre><code>git clone https://github.com/PeterLuu2701/spotify.git</code></pre>

<h3>2. Install dependencies for each microservice:</h3>
<p>Navigate to each service folder and install dependencies:</p>
<pre><code>cd auth-service && yarn install</code></pre>
<pre><code>cd ../playlist-service && yarn install</code></pre>
<pre><code>cd ../song-service && yarn install</code></pre>

<h3>3. Import SQL files and Postman collection</h3>
<p>Import the provided SQL files and Postman collection into <strong>TablePlus</strong> (or your preferred database management platform) and <strong>Postman</strong> for testing the API.</p>

<h3>4. Start the containers</h3>
<p>To bring up the Docker containers in the background, run:</p>
<pre><code>docker-compose up -d</code></pre>

<h3>5. Enjoy the source!</h3>
<p>🎉 Once everything is up and running, explore the project, contribute, and have fun! 🚀</p>

<h2 style="color: #1db954;">📧 Contact</h2>
<p><strong>Author:</strong> Peter & Duy</p>
<p><strong>Email:</strong> <a href="mailto:longluuduchoanglong@gmail.com">longluuduchoanglong@gmail.com</a></p>
<p><strong>GitHub:</strong> <a href="https://github.com/PeterLuu2701">PeterLuu2701</a></p>

<h2 style="color: #1db954;">💡 Contributing</h2>
<p>We welcome contributions! If you have ideas or want to improve the project, feel free to fork it, create a feature branch, and submit a pull request.</p>

<p style="text-align: center;">🎶 Enjoy building with Spotify Clone API! 🎧</p>
