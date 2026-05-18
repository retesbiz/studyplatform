CREATE DATABASE IF NOT EXISTS studynest CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE studynest;

CREATE TABLE IF NOT EXISTS users (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  first_name     VARCHAR(100) NOT NULL,
  last_name      VARCHAR(100) NOT NULL DEFAULT '',
  email          VARCHAR(255) NOT NULL UNIQUE,
  password       VARCHAR(255)          DEFAULT NULL,
  avatar         VARCHAR(10)  NOT NULL DEFAULT '🎓',
  bio            TEXT,
  university     VARCHAR(255),
  field          VARCHAR(100),
  referral       VARCHAR(100),
  oauth_provider VARCHAR(20)           DEFAULT NULL,
  oauth_id       VARCHAR(255)          DEFAULT NULL,
  role           ENUM('student','admin') NOT NULL DEFAULT 'student',
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_oauth (oauth_provider, oauth_id)
);

CREATE TABLE IF NOT EXISTS courses (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  subject     VARCHAR(100) NOT NULL,
  description TEXT,
  icon        VARCHAR(10)  NOT NULL DEFAULT '📚',
  color_class VARCHAR(5)   NOT NULL DEFAULT 'c1',
  modules     INT          NOT NULL DEFAULT 0,
  duration    VARCHAR(50),
  level       ENUM('Beginner','Intermediate','Advanced') NOT NULL DEFAULT 'Beginner',
  rating      DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  students    INT          NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  course_id   INT NOT NULL,
  progress    INT NOT NULL DEFAULT 0,
  completed   TINYINT(1) NOT NULL DEFAULT 0,
  enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_enrollment (user_id, course_id),
  FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  title      VARCHAR(255) NOT NULL DEFAULT 'Untitled Note',
  content    MEDIUMTEXT,
  subject    VARCHAR(100) NOT NULL DEFAULT '',
  tags       VARCHAR(500) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quizzes (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  subject      VARCHAR(100) NOT NULL,
  description  TEXT,
  difficulty   ENUM('Easy','Medium','Hard') NOT NULL DEFAULT 'Medium',
  duration_min INT NOT NULL DEFAULT 15,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id        INT NOT NULL,
  question       TEXT NOT NULL,
  option_a       VARCHAR(500) NOT NULL,
  option_b       VARCHAR(500) NOT NULL,
  option_c       VARCHAR(500) NOT NULL,
  option_d       VARCHAR(500) NOT NULL,
  correct_answer CHAR(1) NOT NULL,
  explanation    TEXT,
  sort_order     INT NOT NULL DEFAULT 0,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT NOT NULL,
  quiz_id      INT NOT NULL,
  score        INT NOT NULL DEFAULT 0,
  total        INT NOT NULL DEFAULT 0,
  time_taken   INT NOT NULL DEFAULT 0,
  completed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)   ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- ── Seed: Courses ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO courses (id, title, subject, description, icon, color_class, modules, duration, level, rating, students) VALUES
(1, 'Introduction to Cryptography', 'Cybersecurity', 'Learn the fundamentals of encryption, hashing, and secure communication protocols.', '🔐', 'c1', 12, '8 hrs', 'Beginner',    4.9, 3200),
(2, 'Web Application Security',     'Cybersecurity', 'Explore OWASP Top 10 vulnerabilities, XSS, SQL injection, and secure coding practices.', '🛡️', 'c2', 15, '10 hrs', 'Intermediate', 4.8, 2800),
(3, 'Advanced SQL & Databases',     'Databases',     'Master complex queries, indexing, transactions, stored procedures, and database design.', '🗄️', 'c3', 10, '6 hrs',  'Intermediate', 4.7, 4100),
(4, 'Machine Learning Fundamentals','Data Science',  'Understand supervised and unsupervised learning, neural networks, and model evaluation.', '🤖', 'c4', 18, '14 hrs', 'Intermediate', 4.8, 5600),
(5, 'Full Stack Web Development',   'Web Dev',       'Build complete web applications with React, Node.js, databases, and deployment.', '🌐', 'c5', 24, '20 hrs', 'Beginner',    4.9, 7200),
(6, 'Network Security Essentials',  'Cybersecurity', 'Cover firewalls, VPNs, intrusion detection, and network hardening techniques.', '🔒', 'c6', 8,  '5 hrs',  'Beginner',    4.6, 1900),
(7, 'Python for Data Science',      'Data Science',  'Use Python, pandas, numpy, and matplotlib for real-world data analysis.', '🐍', 'c1', 14, '10 hrs', 'Beginner',    4.7, 6100),
(8, 'Cloud Computing & AWS',        'DevOps',        'Deploy and manage applications on AWS using EC2, S3, Lambda, and more.', '☁️', 'c2', 16, '12 hrs', 'Intermediate', 4.5, 3400),
(9, 'React & Modern JavaScript',    'Web Dev',       'Build modern UIs with React, hooks, state management, and REST API integration.', '⚛️', 'c3', 20, '16 hrs', 'Intermediate', 4.9, 8900);

-- ── Seed: Quizzes ─────────────────────────────────────────────────────────────
INSERT IGNORE INTO quizzes (id, title, subject, description, difficulty, duration_min) VALUES
(1, 'Cryptography Basics',        'Cybersecurity', 'Test your knowledge of encryption algorithms and cryptographic principles.', 'Easy',   10),
(2, 'SQL Query Challenge',        'Databases',     'Challenge yourself with complex SQL queries and database design questions.', 'Medium', 15),
(3, 'Web Security OWASP Top 10',  'Cybersecurity', 'How well do you know the most critical web application security risks?', 'Hard',   20),
(4, 'Machine Learning Concepts',  'Data Science',  'Assess your understanding of ML algorithms, bias-variance tradeoff, and model selection.', 'Medium', 15);

INSERT IGNORE INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
-- Quiz 1: Cryptography
(1,'What does AES stand for?','Advanced Encryption Standard','Applied Encryption System','Automated Encryption Software','Advanced Encoding Standard','A','AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used worldwide.',1),
(1,'Which hashing algorithm produces a 256-bit hash?','MD5','SHA-1','SHA-256','SHA-512','C','SHA-256 produces a 256-bit (32-byte) hash value, commonly used in digital signatures and certificates.',2),
(1,'What is the key length of AES-128?','64 bits','128 bits','192 bits','256 bits','B','AES-128 uses a 128-bit key, offering strong security for most applications.',3),
(1,'Which is an asymmetric encryption algorithm?','AES','DES','RSA','Blowfish','C','RSA is an asymmetric algorithm using a public/private key pair.',4),
(1,'What does a digital signature verify?','Encryption strength','Identity and integrity','Password complexity','Network speed','B','Digital signatures verify the authenticity of the sender and integrity of the message.',5),
-- Quiz 2: SQL
(2,'Which SQL clause filters grouped results?','WHERE','HAVING','GROUP BY','ORDER BY','B','HAVING filters results after GROUP BY, while WHERE filters before grouping.',1),
(2,'What does INNER JOIN return?','All rows from left table','All rows from right table','Only matching rows from both tables','All rows from both tables','C','INNER JOIN returns only rows where the join condition is met in both tables.',2),
(2,'Which keyword removes duplicate rows in SELECT?','UNIQUE','DISTINCT','REMOVE','FILTER','B','SELECT DISTINCT eliminates duplicate rows from the result set.',3),
(2,'What is a PRIMARY KEY?','A foreign reference','A unique non-null identifier','An indexed column','A default value','B','A PRIMARY KEY uniquely identifies each record and cannot be NULL.',4),
(2,'Which function counts non-NULL values?','SUM()','COUNT()','AVG()','MAX()','B','COUNT() counts non-NULL values in a column when a column name is specified.',5),
-- Quiz 3: Web Security
(3,'What is SQL Injection?','A database design pattern','Inserting malicious SQL into inputs','A type of network attack','An SQL performance technique','B','SQL injection inserts malicious SQL code through user input to manipulate the database.',1),
(3,'What does XSS stand for?','Extra Style Sheet','Cross-Site Scripting','Cross-Server Security','XML Style Script','B','XSS (Cross-Site Scripting) injects malicious scripts into web pages viewed by other users.',2),
(3,'Which HTTP header prevents clickjacking?','Content-Type','X-Frame-Options','Accept-Encoding','Authorization','B','X-Frame-Options prevents your page from being embedded in iframes on other sites.',3),
(3,'What is CSRF?','A type of SQL attack','Cross-Site Request Forgery','Content Security Response Framework','Client-Side Request Filter','B','CSRF tricks users into submitting requests they did not intend, exploiting their authenticated session.',4),
(3,'Which is the safest way to store passwords?','Plain text','Base64 encoded','Hashed with bcrypt','MD5 hashed','C','bcrypt is a password-hashing function designed to be slow and resist brute-force attacks.',5),
-- Quiz 4: ML
(4,'What is overfitting?','Model performs well on all data','Model memorises training data, fails on new data','Model has too few parameters','Model trains too slowly','B','Overfitting occurs when a model learns noise from training data and fails to generalise.',1),
(4,'Which algorithm is used for classification?','Linear Regression','K-Means','Logistic Regression','PCA','C','Logistic Regression predicts categorical outcomes, making it suitable for classification tasks.',2),
(4,'What does the bias-variance tradeoff mean?','Speed vs accuracy','Underfitting vs overfitting balance','Training vs test split','Precision vs recall','B','High bias = underfitting; high variance = overfitting. The tradeoff is finding the right model complexity.',3),
(4,'What is a confusion matrix used for?','Visualising neural networks','Evaluating classification performance','Hyperparameter tuning','Data normalisation','B','A confusion matrix shows true/false positives and negatives, summarising classification results.',4),
(4,'Which technique reduces overfitting?','Adding more features','Removing training data','Regularisation','Increasing model size','C','Regularisation (L1/L2) penalises large weights, reducing overfitting by constraining model complexity.',5);
