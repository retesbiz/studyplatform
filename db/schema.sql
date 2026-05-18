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

-- ── Discussions ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS discussions (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  title       VARCHAR(255) NOT NULL,
  body        TEXT NOT NULL,
  category    VARCHAR(100) NOT NULL DEFAULT 'General',
  reply_count INT NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS discussion_replies (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  discussion_id INT NOT NULL,
  user_id       INT NOT NULL,
  body          TEXT NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)       REFERENCES users(id)       ON DELETE CASCADE
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

-- ── Course Modules ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS course_modules (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  course_id   INT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  topics      TEXT,
  duration    VARCHAR(30) NOT NULL DEFAULT '30 min',
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

INSERT IGNORE INTO course_modules (id, course_id, sort_order, title, description, topics, duration) VALUES
-- Course 1: Introduction to Cryptography
(1,  1,1,'What is Cryptography?','Explore the history and goals of cryptography — confidentiality, integrity, and authentication.','History of cryptography,CIA triad goals,Classical ciphers,Modern use cases,Symmetric vs asymmetric overview','40 min'),
(2,  1,2,'Symmetric Encryption','Understand block and stream ciphers, and how AES secures data at rest and in transit.','AES algorithm,DES and 3DES,Block vs stream ciphers,ECB vs CBC modes,Padding schemes','45 min'),
(3,  1,3,'Asymmetric Encryption','Learn how public/private key pairs work and why RSA and ECC power modern security.','RSA algorithm,Key generation,Encryption and decryption,Elliptic Curve Cryptography,Key sizes and security','45 min'),
(4,  1,4,'Hash Functions','Discover how hash functions ensure data integrity and why MD5 is no longer safe.','MD5 and SHA-1 weaknesses,SHA-256 and SHA-3,Collision resistance,Preimage resistance,Use in certificates','40 min'),
(5,  1,5,'Digital Signatures & PKI','Understand how digital signatures prove authenticity and how PKI manages trust at scale.','Signing and verification,RSA-PSS and ECDSA,X.509 certificates,Certificate Authorities,Certificate chains','50 min'),
(6,  1,6,'TLS/SSL & Applied Cryptography','See how TLS combines symmetric, asymmetric, and hash algorithms to secure HTTPS connections.','TLS 1.2 vs TLS 1.3 handshake,Cipher suites,Perfect Forward Secrecy,Certificate validation,Common mistakes','45 min'),
-- Course 2: Web Application Security
(7,  2,1,'OWASP Top 10 Overview','Survey the ten most critical web application security risks and understand the threat landscape.','OWASP Top 10 list,Risk scoring methodology,Real-world breach examples,Security mindset,Threat modelling','40 min'),
(8,  2,2,'SQL Injection','Learn how attackers manipulate SQL queries through user input and how to stop them completely.','Classic SQLi payloads,Blind and time-based SQLi,Parameterised queries,ORM protection,Database hardening','50 min'),
(9,  2,3,'Cross-Site Scripting (XSS)','Understand reflected, stored, and DOM-based XSS and how Content Security Policy defends against them.','Reflected vs stored vs DOM XSS,Cookie theft,CSP headers,Output encoding,HttpOnly and Secure flags','50 min'),
(10, 2,4,'CSRF & Broken Authentication','Examine forged cross-site requests and the authentication flaws that expose user accounts.','CSRF tokens,SameSite cookies,Session fixation,Credential stuffing,Multi-factor authentication','45 min'),
(11, 2,5,'HTTP Security Headers','Configure server headers that harden your application against common browser-based attacks.','X-Frame-Options,Content-Security-Policy,HSTS,X-Content-Type-Options,Referrer-Policy','40 min'),
(12, 2,6,'API Security & Secure SDLC','Protect REST APIs and integrate security practices throughout the development lifecycle.','JWT security pitfalls,Rate limiting,CORS configuration,Security code reviews,Penetration testing basics','55 min'),
-- Course 3: Advanced SQL & Databases
(13, 3,1,'Query Optimisation','Understand how the query planner works and write SQL that executes efficiently at scale.','EXPLAIN and EXPLAIN ANALYZE,Index scans vs full-table scans,Query cost estimation,Covering indexes,N+1 problem','45 min'),
(14, 3,2,'Joins Deep Dive','Master all join types including self-joins and lateral joins for complex relational queries.','INNER LEFT RIGHT FULL OUTER joins,CROSS JOIN,Self-join patterns,LATERAL joins,Join order optimisation','45 min'),
(15, 3,3,'Window Functions','Use OVER(), PARTITION BY, and ranking functions to perform analytics directly in SQL.','ROW_NUMBER RANK DENSE_RANK,LAG and LEAD,Running totals with SUM OVER,NTILE and percentiles,Analytics queries','50 min'),
(16, 3,4,'Transactions & ACID','Guarantee data consistency with transactions and understand isolation levels for concurrency.','ACID properties,BEGIN COMMIT ROLLBACK,Isolation levels,Deadlock detection,Optimistic vs pessimistic locking','50 min'),
(17, 3,5,'Indexes & Performance Tuning','Design the right indexes for your workload and avoid performance degradation.','B-Tree vs Hash indexes,Composite indexes,Partial indexes,Index maintenance,Slow query log analysis','45 min'),
(18, 3,6,'Database Design & Normalisation','Apply normalisation rules to eliminate redundancy and design schemas that scale cleanly.','1NF 2NF 3NF BCNF,Denormalisation trade-offs,ER diagrams,Stored procedures,Database migrations','40 min'),
-- Course 4: Machine Learning Fundamentals
(19, 4,1,'Introduction to ML','Understand what machine learning is, the types of learning, and real-world applications.','Supervised vs unsupervised vs reinforcement,ML workflow,Data splits,Bias in datasets,Choosing an algorithm','40 min'),
(20, 4,2,'Data Preprocessing','Clean, transform, and prepare raw data so models can learn from it effectively.','Handling missing values,Feature scaling,Encoding categoricals,Train/val/test split,Data leakage prevention','50 min'),
(21, 4,3,'Regression Algorithms','Predict continuous values using linear, polynomial, and regularised regression models.','Linear regression,Gradient descent,Ridge and Lasso,Polynomial features,R-squared and RMSE metrics','55 min'),
(22, 4,4,'Classification Algorithms','Classify data into categories using logistic regression, decision trees, SVMs, and k-NN.','Logistic regression,Decision trees,Support Vector Machines,K-Nearest Neighbours,Precision recall F1-score','55 min'),
(23, 4,5,'Ensemble Methods','Combine multiple models to achieve better predictions than any single model alone.','Bagging and boosting,Random forests,Gradient Boosting and XGBoost,Stacking,Voting classifiers','50 min'),
(24, 4,6,'Neural Networks Basics','Build your first neural network, understand backpropagation, and explore activation functions.','Perceptrons and layers,Activation functions,Backpropagation,Epochs and batches,Overfitting and regularisation','60 min'),
-- Course 5: Full Stack Web Development
(25, 5,1,'HTML5 & Semantic Markup','Write clean, accessible HTML5 with semantic elements and proper document structure.','Semantic tags,Forms and validation,Accessibility (ARIA),Meta tags and SEO,HTML5 APIs','35 min'),
(26, 5,2,'CSS3 & Responsive Design','Style pages with Flexbox, Grid, and media queries for all screen sizes.','Flexbox layout,CSS Grid,Media queries,CSS variables,Animations and transitions,Mobile-first design','45 min'),
(27, 5,3,'JavaScript Essentials','Cover core JS — closures, prototypes, the event loop, and modern ES6+ syntax.','ES6+ syntax,Closures and scope,Promises and async/await,Event loop,Modules (import/export)','60 min'),
(28, 5,4,'Node.js & Express.js','Build a backend server with routing, middleware, and REST API design using Express.','Node.js event model,Express routing,Middleware chain,Error handling,REST API conventions','60 min'),
(29, 5,5,'MySQL & Authentication','Persist data in MySQL and secure your API with JWT-based auth and bcrypt passwords.','MySQL schema design,CRUD with mysql2,Password hashing with bcrypt,JWT sign and verify,Auth middleware','60 min'),
(30, 5,6,'React & Deployment','Build interactive UIs with React hooks and deploy your full stack app to the cloud.','React components and JSX,useState and useEffect,Fetching APIs,React Router,Railway deployment,CI/CD basics','70 min'),
-- Course 6: Network Security Essentials
(31, 6,1,'OSI & TCP/IP Models','Understand how data travels across networks and where security controls apply at each layer.','OSI 7 layers,TCP/IP stack,Encapsulation,Common protocols per layer,Packet analysis with Wireshark','40 min'),
(32, 6,2,'Firewalls & Packet Filtering','Configure and understand stateful firewalls, packet filters, and next-gen firewall features.','Stateless vs stateful firewalls,iptables basics,Access Control Lists,NAT,DMZ architecture','40 min'),
(33, 6,3,'VPNs & Encrypted Tunnels','Set up secure tunnels and understand VPN protocols like IPSec and WireGuard.','VPN types (site-to-site and remote access),IPSec and IKEv2,OpenVPN,WireGuard,Split tunnelling','40 min'),
(34, 6,4,'Intrusion Detection & Prevention','Deploy IDS/IPS systems that monitor traffic and block attacks in real time.','Signature vs anomaly detection,Snort rules,Network vs host-based IDS,False positives,SIEM basics','40 min'),
(35, 6,5,'Wireless & DNS Security','Secure Wi-Fi networks and protect DNS from poisoning and hijacking attacks.','WPA2 and WPA3,Evil twin attacks,DNSSEC,DNS-over-HTTPS,Common wireless attacks (deauth KRACK)','35 min'),
-- Course 7: Python for Data Science
(36, 7,1,'Python Foundations','Set up your environment and master Python syntax, data types, and control flow.','Lists dicts sets tuples,Comprehensions,Functions and lambdas,File I/O,Virtual environments and pip','40 min'),
(37, 7,2,'NumPy Arrays','Perform fast numerical computations with arrays, broadcasting, and linear algebra.','ndarray creation,Indexing and slicing,Broadcasting,Vectorised operations,Linear algebra with linalg','45 min'),
(38, 7,3,'Pandas DataFrames','Load, clean, and transform tabular data using pandas — the workhorse of data science.','DataFrame and Series,read_csv and read_excel,Filtering and groupby,merge and join,apply and map','55 min'),
(39, 7,4,'Data Visualisation','Tell stories with data using Matplotlib and Seaborn charts from bar plots to heatmaps.','Matplotlib anatomy,Line and bar charts,Seaborn statistical plots,Subplots,Exporting figures','45 min'),
(40, 7,5,'Exploratory Data Analysis','Systematically explore a dataset to understand distributions, correlations, and outliers.','Descriptive statistics,Correlation matrices,Outlier detection (IQR Z-score),Missing data analysis,EDA checklist','50 min'),
(41, 7,6,'Intro to Scikit-learn','Train, evaluate, and tune machine learning models using the scikit-learn library.','Train/test split,Pipelines,LinearRegression and LogisticRegression,Cross-validation,Confusion matrix and ROC','60 min'),
-- Course 8: Cloud Computing & AWS
(42, 8,1,'Cloud Concepts & IAM','Understand cloud deployment models and control access with IAM roles and policies.','IaaS vs PaaS vs SaaS,AWS global infrastructure,IAM users roles policies,Least privilege,MFA and access keys','40 min'),
(43, 8,2,'EC2 & Networking (VPC)','Launch virtual machines on EC2 and isolate them inside a custom Virtual Private Cloud.','EC2 instance types,Security groups,Key pairs and SSH,VPC subnets,Internet Gateway and NAT Gateway','55 min'),
(44, 8,3,'S3 & Storage Services','Store objects at unlimited scale with S3 and understand the AWS storage ecosystem.','S3 buckets and objects,Storage classes,Lifecycle policies,Static website hosting,EBS and EFS comparison','45 min'),
(45, 8,4,'RDS & Managed Databases','Deploy and manage relational databases on AWS without managing the underlying server.','RDS engines (MySQL Postgres),Multi-AZ and read replicas,Automated backups,Parameter groups,Aurora basics','45 min'),
(46, 8,5,'Lambda & Serverless','Build event-driven functions that scale to zero and integrate with other AWS services.','Lambda function anatomy,Triggers and event sources,Cold starts,API Gateway integration,Step Functions','50 min'),
(47, 8,6,'Deployment & Cost Optimisation','Use Elastic Beanstalk and CloudFormation for IaC and keep your AWS bill under control.','Elastic Beanstalk,CloudFormation templates,AWS Cost Explorer,Reserved vs spot instances,Trusted Advisor','50 min'),
-- Course 9: React & Modern JavaScript
(48, 9,1,'Modern JavaScript (ES6+)','Master the JS features that React and modern frameworks are built on.','Arrow functions,Destructuring,Spread and rest,Modules,Optional chaining,Promises and async/await','50 min'),
(49, 9,2,'React Fundamentals','Build your first React components using JSX and understand how React renders the DOM.','JSX syntax,Functional components,Props,Conditional rendering,Lists and keys,Component composition','55 min'),
(50, 9,3,'React Hooks Deep Dive','Use useState, useEffect, useRef, and custom hooks to manage state and side effects cleanly.','useState patterns,useEffect and cleanup,useRef,useMemo and useCallback,Custom hooks,Rules of Hooks','60 min'),
(51, 9,4,'Routing & Data Fetching','Build multi-page React apps with React Router and fetch data from REST APIs.','React Router v6,Dynamic routes,useNavigate and useParams,fetch and axios,Loading and error states','55 min'),
(52, 9,5,'State Management','Scale your application state with Context API and Redux Toolkit.','Context API,useReducer,Redux Toolkit (createSlice),RTK Query,Local vs global state decisions','60 min'),
(53, 9,6,'Testing & Deployment','Write unit and integration tests and deploy your React app to production.','React Testing Library,jest.fn and mocks,Snapshot tests,Vite build optimisation,Deploying to Netlify and Railway','55 min');

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
