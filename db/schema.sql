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
(1, 'Cryptography Basics',              'Cybersecurity', 'Test your knowledge of encryption algorithms and cryptographic principles.',                'Easy',   15),
(2, 'SQL Query Challenge',              'Databases',     'Challenge yourself with complex SQL queries and database design questions.',                'Medium', 20),
(3, 'Web Security OWASP Top 10',        'Cybersecurity', 'How well do you know the most critical web application security risks?',                   'Hard',   25),
(4, 'Machine Learning Concepts',        'Data Science',  'Assess your understanding of ML algorithms, bias-variance tradeoff, and model selection.', 'Medium', 20),
(5, 'Network Security Fundamentals',    'Cybersecurity', 'Test your knowledge of firewalls, VPNs, IDS/IPS, and network attack techniques.',          'Medium', 20),
(6, 'Python for Data Science',          'Data Science',  'Assess your skills in NumPy, Pandas, Matplotlib, and scikit-learn workflows.',             'Medium', 20),
(7, 'Cloud Computing & AWS',            'DevOps',        'Test your understanding of cloud concepts, core AWS services, and cloud security.',        'Medium', 20),
(8, 'Full Stack Web Development',       'Web Dev',       'Cover REST APIs, Node.js, Express, SQL, JWT, and HTTP fundamentals.',                      'Medium', 20),
(9, 'React & Modern JavaScript',        'Web Dev',       'Test your knowledge of React hooks, the virtual DOM, ES6+ features, and state.',           'Medium', 20);

INSERT IGNORE INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, sort_order) VALUES
-- Quiz 1: Cryptography (10 questions)
(1,'What does AES stand for?','Advanced Encryption Standard','Applied Encryption System','Automated Encryption Software','Advanced Encoding Standard','A','AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used worldwide.',1),
(1,'Which hashing algorithm produces a 256-bit hash?','MD5','SHA-1','SHA-256','SHA-512','C','SHA-256 produces a 256-bit (32-byte) hash value, commonly used in digital signatures and certificates.',2),
(1,'What is the key length of AES-128?','64 bits','128 bits','192 bits','256 bits','B','AES-128 uses a 128-bit key, offering strong security for most applications.',3),
(1,'Which is an asymmetric encryption algorithm?','AES','DES','RSA','Blowfish','C','RSA is an asymmetric algorithm using a public/private key pair.',4),
(1,'What does a digital signature verify?','Encryption strength','Identity and integrity','Password complexity','Network speed','B','Digital signatures verify the authenticity of the sender and integrity of the message.',5),
(1,'What does Perfect Forward Secrecy (PFS) guarantee?','Past session keys cannot be recovered even if the long-term private key is later compromised','Encrypted sessions are stored permanently on the server','Symmetric keys are the same for every session','The server private key rotates every 24 hours','A','PFS uses ephemeral (short-lived) key pairs per session. Even if the long-term private key is stolen, past sessions cannot be decrypted because those ephemeral keys are gone.',6),
(1,'Which AES mode provides both encryption AND authentication in a single operation?','ECB','CBC','CTR','GCM','D','GCM (Galois/Counter Mode) is an AEAD mode — it encrypts the data and produces an authentication tag in one pass, detecting any tampering.',7),
(1,'What is a rainbow table attack?','A brute-force attack on wireless networks','Using precomputed hash-to-password mappings to crack unsalted password hashes','An attack exploiting weak IV reuse in AES-CBC','A technique to intercept TLS handshakes','B','Rainbow tables are precomputed tables of password→hash pairs. They crack unsalted hashes instantly. Adding a unique random salt per password defeats this attack entirely.',8),
(1,'Which signature algorithm is deterministic (safe even with a bad random number generator)?','ECDSA','RSA-PKCS1 v1.5','EdDSA (Ed25519)','DSA','C','Ed25519 (EdDSA) derives its per-signature nonce deterministically from the private key and message, so a faulty RNG cannot leak the private key. ECDSA failed catastrophically on the PS3 due to a constant nonce.',9),
(1,'What is Kerckhoffs''s principle?','The key must be kept secret, but the algorithm can be public','Both the key and the algorithm must be kept secret','The plaintext must never exceed the key length','Encryption algorithms must be approved by a government authority','A','Kerckhoffs stated that a cryptosystem should be secure even if everything about it except the key is public. Modern algorithms like AES and RSA are fully open, yet secure because the security rests on the key alone.',10),
-- Quiz 2: SQL (10 questions)
(2,'Which SQL clause filters grouped results?','WHERE','HAVING','GROUP BY','ORDER BY','B','HAVING filters results after GROUP BY, while WHERE filters before grouping.',1),
(2,'What does INNER JOIN return?','All rows from left table','All rows from right table','Only matching rows from both tables','All rows from both tables','C','INNER JOIN returns only rows where the join condition is met in both tables.',2),
(2,'Which keyword removes duplicate rows in SELECT?','UNIQUE','DISTINCT','REMOVE','FILTER','B','SELECT DISTINCT eliminates duplicate rows from the result set.',3),
(2,'What is a PRIMARY KEY?','A foreign reference','A unique non-null identifier','An indexed column','A default value','B','A PRIMARY KEY uniquely identifies each record and cannot be NULL.',4),
(2,'Which function counts non-NULL values?','SUM()','COUNT()','AVG()','MAX()','B','COUNT() counts non-NULL values in a column when a column name is specified.',5),
(2,'What is a deadlock in a database?','A query that takes too long to execute','Two transactions each waiting for a lock held by the other, creating a circular wait','A table with no primary key','An index that covers too many columns','B','A deadlock occurs when Transaction A holds a lock that Transaction B needs, while B holds a lock A needs. The database detects this and kills one transaction to break the cycle.',6),
(2,'What does EXPLAIN do in SQL?','Runs a query and explains the result in plain English','Shows the query execution plan chosen by the database planner','Adds comments to a stored procedure','Validates the SQL syntax without executing the query','B','EXPLAIN shows how the database plans to execute a query — which indexes it will use, join order, and estimated row counts. Essential for identifying slow full table scans.',7),
(2,'What is a covering index?','An index that spans the entire table','An index that includes all columns required by a query, so the table itself does not need to be read','A composite index on foreign key columns','An index automatically created by the database','B','A covering index satisfies a query entirely from the index structure, avoiding a second lookup in the actual table. This dramatically speeds up read-heavy queries.',8),
(2,'Which SQL window function assigns a unique sequential integer to each row within a partition?','RANK()','DENSE_RANK()','ROW_NUMBER()','NTILE()','C','ROW_NUMBER() assigns 1, 2, 3, ... to each row within a partition with no gaps or ties. RANK() and DENSE_RANK() handle tied values differently.',9),
(2,'What is the key difference between DELETE and TRUNCATE?','DELETE removes the table; TRUNCATE removes rows','TRUNCATE is faster, removes all rows without logging individual deletions; DELETE logs each row and supports WHERE','DELETE is DDL; TRUNCATE is DML','There is no difference','B','TRUNCATE is a DDL operation that deallocates data pages — very fast for clearing a table but cannot be rolled back in most databases and does not fire row-level triggers. DELETE is DML, supports WHERE, and logs each row.',10),
-- Quiz 3: Web Security (10 questions)
(3,'What is SQL Injection?','A database design pattern','Inserting malicious SQL into inputs','A type of network attack','An SQL performance technique','B','SQL injection inserts malicious SQL code through user input to manipulate the database.',1),
(3,'What does XSS stand for?','Extra Style Sheet','Cross-Site Scripting','Cross-Server Security','XML Style Script','B','XSS (Cross-Site Scripting) injects malicious scripts into web pages viewed by other users.',2),
(3,'Which HTTP header prevents clickjacking?','Content-Type','X-Frame-Options','Accept-Encoding','Authorization','B','X-Frame-Options prevents your page from being embedded in iframes on other sites.',3),
(3,'What is CSRF?','A type of SQL attack','Cross-Site Request Forgery','Content Security Response Framework','Client-Side Request Filter','B','CSRF tricks users into submitting requests they did not intend, exploiting their authenticated session.',4),
(3,'Which is the safest way to store passwords?','Plain text','Base64 encoded','Hashed with bcrypt','MD5 hashed','C','bcrypt is a password-hashing function designed to be slow and resist brute-force attacks.',5),
(3,'What does HSTS (HTTP Strict Transport Security) do?','Encrypts HTTP request bodies automatically','Forces the browser to use HTTPS for a domain for a defined period, even if HTTP is typed','Adds authentication headers to every HTTP request','Blocks third-party cookies','B','HSTS tells the browser: always connect to this domain over HTTPS. This defeats SSL stripping attacks where an attacker silently downgrades HTTPS to HTTP.',6),
(3,'What is SSRF (Server-Side Request Forgery)?','A stored XSS attack that targets the server','An attack where the server is tricked into making HTTP requests to internal or unintended external targets','A SQL injection variant that works on NoSQL databases','A CSRF variant targeting API servers','B','In SSRF, an attacker supplies a URL that the server fetches on their behalf — often targeting internal services like the AWS metadata endpoint, internal APIs, or databases not exposed to the internet.',7),
(3,'Which JWT algorithm should NEVER be accepted by a server?','HS256','RS256','ES256','none','D','The "none" algorithm means no signature — the token is unsigned. If a server accepts alg:none, an attacker can forge any token by simply removing the signature. Always validate and whitelist accepted algorithms.',8),
(3,'What is the purpose of a Content Security Policy (CSP) header?','To enforce HTTPS for all resources','To whitelist which sources scripts, styles, and other resources may be loaded from, blocking injected scripts','To prevent SQL injection attacks','To rate-limit API requests','B','CSP tells the browser which origins are trusted to serve scripts, styles, fonts, etc. An XSS payload injected into your page cannot run if its origin is not in the CSP whitelist.',9),
(3,'What is Broken Object Level Authorisation (BOLA)?','Failing to hash passwords correctly','Allowing users to access other users'' resources by simply changing an object ID in a request','Storing JWT secrets in plaintext','A misconfigured CORS policy','B','BOLA (OWASP API Security #1) occurs when an API endpoint uses user-supplied IDs without verifying the requesting user owns that object. The fix: always verify ownership server-side.',10),
-- Quiz 4: Machine Learning (10 questions)
(4,'What is overfitting?','Model performs well on all data','Model memorises training data, fails on new data','Model has too few parameters','Model trains too slowly','B','Overfitting occurs when a model learns noise from training data and fails to generalise.',1),
(4,'Which algorithm is used for classification?','Linear Regression','K-Means','Logistic Regression','PCA','C','Logistic Regression predicts categorical outcomes, making it suitable for classification tasks.',2),
(4,'What does the bias-variance tradeoff mean?','Speed vs accuracy','Underfitting vs overfitting balance','Training vs test split','Precision vs recall','B','High bias = underfitting; high variance = overfitting. The tradeoff is finding the right model complexity.',3),
(4,'What is a confusion matrix used for?','Visualising neural networks','Evaluating classification performance','Hyperparameter tuning','Data normalisation','B','A confusion matrix shows true/false positives and negatives, summarising classification results.',4),
(4,'Which technique reduces overfitting?','Adding more features','Removing training data','Regularisation','Increasing model size','C','Regularisation (L1/L2) penalises large weights, reducing overfitting by constraining model complexity.',5),
(4,'What is the purpose of k-fold cross-validation?','To split the dataset into k equal training sets','To train k different models and pick the best','To produce a more reliable performance estimate by training and evaluating on k different data splits','To reduce the number of features to k','C','k-fold CV splits data into k folds, trains on k-1, tests on the remaining fold, and repeats k times. Averaging the k scores gives a more reliable estimate than a single train/test split.',6),
(4,'What does PCA (Principal Component Analysis) do?','Classifies data into principal groups','Reduces dimensionality by projecting data onto the directions of greatest variance','Clusters data points using centroids','Increases the number of features to improve accuracy','B','PCA transforms features into uncorrelated components ordered by variance explained. The top k components capture most information with fewer dimensions, reducing noise and training time.',7),
(4,'What is gradient descent?','A method of selecting the steepest features for a model','An iterative optimisation algorithm that adjusts model weights in the direction that reduces the loss function','A technique for normalising gradient values in neural networks','A cross-validation strategy for deep learning','B','Gradient descent computes the gradient of the loss with respect to each weight, then moves each weight a small step in the opposite direction, iteratively minimising the loss.',8),
(4,'What does the ROC-AUC score measure?','The accuracy of a regression model','How quickly a model trains','A classifier''s ability to distinguish between positive and negative classes across all decision thresholds','The ratio of precision to recall','C','The ROC curve plots True Positive Rate vs False Positive Rate at every threshold. AUC summarises this as a single number: 1.0 = perfect, 0.5 = random.',9),
(4,'What is the difference between bagging and boosting?','Bagging uses deep trees; boosting uses shallow stumps','Bagging trains models in parallel on random subsets to reduce variance; boosting trains sequentially to correct previous errors, reducing bias','Bagging is for classification only; boosting is for regression only','They are the same technique with different names','B','Bagging (Random Forest) trains many models independently — reduces variance. Boosting (XGBoost) trains each model to correct residual errors of the ensemble so far — reduces bias.',10),
-- Quiz 5: Network Security (10 questions)
(5,'At which OSI layer does TLS operate?','Layer 2 (Data Link)','Layer 3 (Network)','Layer 4-5 (Transport/Session)','Layer 7 (Application)','C','TLS sits between the Transport layer (TCP) and the Application layer — it provides a secure channel for application protocols like HTTP, SMTP, and FTP.',1),
(5,'What does a stateful firewall track that a stateless packet filter does not?','Source IP addresses','MAC addresses','TCP connection state','Port numbers','C','A stateful firewall maintains a connection table tracking whether each packet is part of an established TCP session, blocking unsolicited inbound packets not part of an existing connection.',2),
(5,'What is ARP spoofing?','Injecting false DNS records into a resolver cache','Sending fake ARP replies to associate the attacker''s MAC with a legitimate IP, enabling a man-in-the-middle attack','Flooding a switch with MAC addresses to disable MAC learning','Redirecting HTTP traffic to a rogue server','B','ARP has no authentication. An attacker can broadcast fake ARP replies poisoning the ARP caches of other hosts, redirecting their traffic through the attacker''s machine.',3),
(5,'What is a DMZ (Demilitarised Zone) in network architecture?','A VLAN reserved for wireless devices','A network segment between the internet and the internal network that hosts public-facing servers','An encrypted tunnel between two office locations','A firewall rule that blocks all inbound traffic','B','A DMZ places web servers and other public-facing services on a separate segment. If one is compromised, the attacker is isolated from the internal corporate network.',4),
(5,'What is the primary function of an IDS?','Blocks malicious traffic in real time','Monitors and alerts on suspicious network activity or host behaviour','Manages SSL certificates for HTTPS','Encrypts traffic between network segments','B','An IDS monitors network traffic or host logs for suspicious patterns and generates alerts. An IPS goes further and can actively block detected threats.',5),
(5,'What is DNS cache poisoning?','Overloading a DNS server with too many queries','Injecting forged DNS records into a resolver''s cache so domain names resolve to attacker-controlled IPs','Encrypting DNS queries to prevent eavesdropping','Registering a domain similar to a legitimate one','B','DNS has no authentication by default. An attacker can race to respond to a DNS query with a forged answer, poisoning the resolver''s cache and redirecting users to a malicious server.',6),
(5,'What security improvement does WPA3 provide over WPA2?','Longer SSID names','Simultaneous Authentication of Equals (SAE) replacing the PSK handshake, preventing offline dictionary attacks','Support for more simultaneous clients','Faster throughput via 802.11ax','B','WPA2 PSK 4-way handshake can be captured and subjected to offline brute-force attacks. WPA3''s SAE is interactive and zero-knowledge — captured handshakes cannot be cracked offline.',7),
(5,'What is the purpose of network segmentation?','To increase bandwidth between network segments','To divide a network into zones so that a compromise in one zone cannot easily spread to others','To route traffic more efficiently between VLANs','To hide internal IP addresses using NAT','B','Segmentation limits the blast radius of a breach. Critical systems like databases and industrial controls should be on isolated segments with strict inter-segment firewall rules.',8),
(5,'What does a SIEM system do?','Scans code for vulnerabilities before deployment','Aggregates and correlates logs from across the infrastructure to detect threats and support incident response','Encrypts log files to prevent tampering','Blocks intrusion attempts in real time','B','A SIEM (e.g., Splunk, Microsoft Sentinel) collects logs from firewalls, IDS, servers, and apps. Security teams write detection rules and run threat hunting queries against centralised data.',9),
(5,'What is VPN split tunnelling?','A VPN that encrypts only the header, not the payload','A configuration where only traffic to specific destinations routes through the VPN while other traffic uses the normal internet connection','Using two VPN tunnels simultaneously for redundancy','Splitting a site-to-site VPN into two half-tunnels','B','Split tunnelling routes only corporate traffic through the VPN while internet traffic goes directly out. This reduces VPN load but means internet traffic bypasses corporate security controls.',10),
-- Quiz 6: Python for Data Science (10 questions)
(6,'Which Python library provides the ndarray for fast numerical computing?','Pandas','Matplotlib','NumPy','SciPy','C','NumPy provides the ndarray — a fast, memory-efficient multi-dimensional array implemented in C. It is the foundation of virtually every Python data science library.',1),
(6,'What does the Pandas groupby() operation do?','Sorts a DataFrame by one or more columns','Splits a DataFrame into groups, applies an aggregation function to each group, and combines the results','Joins two DataFrames on a common column','Removes duplicate rows from a DataFrame','B','groupby() implements split-apply-combine: split rows into groups by column value, apply a function (sum, mean, count), and combine into a new DataFrame.',2),
(6,'What is data leakage in machine learning?','Training data accidentally deleted during preprocessing','Accidentally including future or target information during training, producing inflated performance metrics','Sensitive data being logged to a public server','Features with missing values causing errors during training','B','Data leakage occurs when information from the test set influences training — e.g., scaling the entire dataset before the train/test split. Always fit preprocessors on training data only.',3),
(6,'What is feature scaling, and why is it important?','Reducing the number of features using PCA','Normalising feature ranges so no feature dominates the model due to its larger numerical magnitude','Selecting only the most correlated features for training','Converting categorical features to numerical ones','B','Algorithms like k-NN, SVM, and gradient descent are sensitive to feature magnitudes. Standardisation (z-score) or min-max normalisation ensure all features contribute fairly.',4),
(6,'What does NumPy broadcasting allow?','Sending NumPy arrays over a network socket','Performing arithmetic on arrays of different shapes without explicit loops, by automatically expanding smaller arrays','Distributing computation across multiple CPU cores','Converting Python lists to NumPy arrays','B','Broadcasting allows, e.g., adding a (3,) row vector to every row of a (100, 3) matrix without a Python for-loop. The operation runs in optimised C.',5),
(6,'What is the purpose of a train/test split?','To reduce training time by using less data','To evaluate how well a model generalises to unseen data by holding out a portion never seen during training','To balance classes in an imbalanced dataset','To create two copies of the data for backup','B','If you evaluate on the same data you trained on, the model appears perfect even if it just memorised training data. The held-out test set simulates new unseen data.',6),
(6,'Which chart type is most appropriate for visualising the distribution of a single numerical variable?','Bar chart','Scatter plot','Histogram','Line chart','C','A histogram bins continuous values into ranges and counts how many observations fall in each bin, showing the shape (normal, skewed, bimodal) of the distribution.',7),
(6,'What does the Pandas .fillna() method do?','Removes rows with missing values','Fills missing (NaN) values with a specified value or strategy','Renames columns with null names','Replaces infinite values with NaN','B','NaN is Pandas'' representation of missing data. .fillna(value) replaces all NaN cells with a constant, mean, median, or forward/backward fill.',8),
(6,'What does vectorisation mean in the context of NumPy?','Converting string columns to numerical vectors','Replacing Python for-loops with array operations that execute in optimised C, orders of magnitude faster','Representing sparse matrices as dense vectors','Normalising data to unit vectors','B','Pure Python loops process one element at a time. NumPy vectorised operations process entire arrays in compiled C code — often 100-1000x faster for numerical tasks.',9),
(6,'What is the scikit-learn Pipeline object used for?','Running multiple ML models in parallel','Chaining preprocessing steps and a model into a single object to prevent data leakage during cross-validation','Downloading datasets from the internet','Visualising the model training process','B','A Pipeline ensures fit() is called only on training data and transform() is applied consistently, preventing leakage of test set statistics into training.',10),
-- Quiz 7: Cloud Computing & AWS (10 questions)
(7,'What does IAM stand for in AWS?','Internet Access Management','Identity and Access Management — controls who can do what in your AWS account','Instance Allocation Monitor','Integrated Application Manager','B','Every API call in AWS is authorised by IAM. You create users, groups, and roles with attached policies that grant or deny specific permissions on specific resources.',1),
(7,'What is the principle of least privilege in cloud security?','Giving all developers admin access for productivity','Granting only the minimum permissions required for a task — nothing more','Using the cheapest AWS instance types','Keeping all data in one region for simplicity','B','The most common cause of cloud data breaches is over-privileged IAM entities. Least privilege limits blast radius — a compromised credential can only access what it needed.',2),
(7,'What AWS service provides scalable, durable object storage?','EBS (Elastic Block Store)','RDS (Relational Database Service)','S3 (Simple Storage Service)','EFS (Elastic File System)','C','S3 stores objects in buckets. It is designed for 99.999999999% durability, scales to exabytes, and is used for static websites, backups, data lakes, and application file storage.',3),
(7,'What does an AWS Security Group do?','Scans EC2 instances for malware','Acts as a stateful virtual firewall controlling inbound and outbound traffic to EC2 instances','Groups IAM users for permission management','Monitors AWS costs and sends budget alerts','B','Security Groups are stateful — inbound rules allow traffic, and return traffic is automatically allowed. All traffic is denied by default until you add an allow rule.',4),
(7,'What is AWS Lambda?','A serverless compute service that runs code in response to events without you provisioning servers','A managed Kubernetes service','A NoSQL database','A content delivery network','A','Lambda runs your function only when triggered, scales from zero to thousands of concurrent executions automatically, and charges per 100ms of execution time.',5),
(7,'What is the difference between a public subnet and private subnet in a VPC?','Public subnets are faster; private subnets are more secure','Public subnets have a route to an Internet Gateway and can have public IPs; private subnets use a NAT Gateway for outbound traffic','Public subnets run web servers; private subnets run databases by convention only','There is no functional difference','B','Resources in a public subnet can receive inbound internet traffic. Private subnet resources are not directly reachable from the internet — they initiate outbound connections via NAT Gateway.',6),
(7,'What does Multi-AZ deployment provide in AWS RDS?','Lower cost by spreading load','Automatic failover to a synchronous standby in a second Availability Zone if the primary fails','Read scaling through replicas','Automated database schema migrations','B','Multi-AZ maintains a synchronous replica in a different AZ. If the primary fails, RDS automatically fails over to the standby — typically within 1-2 minutes with no data loss.',7),
(7,'What is an AMI (Amazon Machine Image)?','An auto-scaling policy for EC2','A template containing the OS, software configuration, and data used to launch EC2 instances','An IAM permission policy for ML workloads','A monitoring agent installed on EC2 instances','B','AMIs are blueprints for EC2 instances. Create a custom AMI from a configured instance and use it to launch identical copies — essential for auto-scaling and consistent deployments.',8),
(7,'What is the shared responsibility model in cloud computing?','The cloud provider is responsible for all security','The customer is responsible for all security','The cloud provider secures the infrastructure; the customer is responsible for security of what runs on it','Security responsibilities are negotiated case by case','C','AWS secures the physical infrastructure, hypervisor, and managed service internals. You are responsible for OS patching, IAM, network settings, application security, and data encryption.',9),
(7,'What is auto-scaling in AWS?','Automatically upgrading EC2 instance types','Automatically adding or removing EC2 instances based on demand metrics to maintain performance and reduce cost','Automatically applying OS patches to EC2','Automatically backing up RDS databases','B','Auto Scaling Groups monitor CloudWatch metrics (CPU utilisation, request count). When demand rises, new instances launch from an AMI. When it drops, excess instances terminate.',10),
-- Quiz 8: Full Stack Web Development (10 questions)
(8,'What HTTP method is conventionally used to fully replace a resource?','POST','PATCH','PUT','DELETE','C','PUT replaces the entire resource with the supplied body. PATCH updates only the specified fields. POST creates a new resource.',1),
(8,'What is a middleware function in Express.js?','A function that compresses the final HTML response','A function with (req, res, next) that can inspect or modify the request, send a response, or call next() to pass control to the next handler','A helper library for database queries','A route handler for the root path','B','Middleware runs in a pipeline. Common examples: body-parser (parses JSON), cors(), authentication checks, logging. Calling next() passes control; not calling it ends the pipeline.',2),
(8,'What are the three parts of a JWT (JSON Web Token)?','Header (algorithm), Payload (claims like user ID), and Signature (verifies integrity)','Salt, hash, and version','Host, port, and credentials','Header, data, and expiry','A','JWTs are Base64-encoded JSON: header.payload.signature. The server verifies the signature cryptographically — no database lookup needed.',3),
(8,'Why is bcrypt preferred over SHA-256 for password storage?','bcrypt compresses passwords; SHA-256 encrypts them','bcrypt is deliberately slow and salt-generating — SHA-256 is too fast, allowing billions of guesses per second','bcrypt is reversible for password recovery; SHA-256 is not','There is no meaningful difference','B','Password hashing must be slow by design. bcrypt''s cost factor makes each hash take ~100ms, limiting an attacker to ~10 guesses/second. It also generates a unique salt automatically.',4),
(8,'What does CORS (Cross-Origin Resource Sharing) control?','Which HTTP methods a server supports','Which cross-origin domains are allowed to make requests to an API via browser JavaScript','How compressed responses are encoded','Which cookies are sent with every request','B','Browsers enforce the Same-Origin Policy. The server opts in to cross-origin requests by sending Access-Control-Allow-Origin headers listing trusted origins.',5),
(8,'What is the difference between authentication and authorisation?','They are the same concept with different names','Authentication verifies WHO you are (login); authorisation verifies WHAT you are allowed to do (permissions)','Authentication is for APIs; authorisation is for web pages','Authentication uses passwords; authorisation uses tokens','B','You must authenticate before you can be authorised. Checking if a user is logged in is auth; checking if they own the resource they are accessing is authz.',6),
(8,'What is a database connection pool?','A backup copy of the database','A cache of reusable database connections that avoids the overhead of opening a new TCP connection per request','A query result cache','A pool of read replicas for load balancing','B','Opening a new DB connection is expensive (~20-100ms). A pool keeps connections open and reuses them across requests, drastically improving throughput.',7),
(8,'Which HTTP status code should a REST API return when a resource is successfully created?','200 OK','201 Created','204 No Content','202 Accepted','B','201 Created signals that the POST request succeeded and a new resource was created. The response body typically includes the created object.',8),
(8,'Why should secrets be stored in environment variables, not source code?','Environment variables are faster to read','Secrets committed to git persist in history forever and are exposed to anyone with repo access; env vars keep them out of version control','Environment variables are encrypted by default','Source code cannot store strings longer than 255 characters','B','Committing secrets to git is one of the most common security incidents. Even in a private repo, secrets persist in git history. Use dotenv locally and the hosting platform''s config in production.',9),
(8,'What is the N+1 query problem?','Running N queries to create a single record across N tables','Fetching a list of N records and then running a separate database query for each one, totalling N+1 queries instead of 1','Having more database indexes than table columns','A query that returns N+1 rows due to a faulty JOIN','B','Example: fetch 100 users (1 query), then for each user fetch their posts (100 queries) = 101 queries. Fix with a single JOIN or ORM eager loading.',10),
-- Quiz 9: React & Modern JavaScript (10 questions)
(9,'What is JSX in React?','A JavaScript XML parser','A syntax extension that lets you write HTML-like code inside JavaScript, compiled to React.createElement() calls','A CSS-in-JS library','A JSON serialisation format for components','B','JSX is syntactic sugar. <div className="card">Hello</div> compiles to React.createElement("div", {className:"card"}, "Hello"). Babel/Vite transpiles JSX before it runs in the browser.',1),
(9,'What does the useEffect hook do?','Creates a new state variable','Runs a side effect after the component renders, with an optional cleanup function — replaces componentDidMount and componentDidUpdate','Memoises a function reference between renders','Creates a context provider','B','useEffect runs after every render by default. The dependency array controls when it re-runs. Return a cleanup function to cancel subscriptions or timers on unmount.',2),
(9,'What is the virtual DOM in React?','A DOM stored in a database','An in-memory JavaScript representation of the UI that React uses to calculate the minimum set of real DOM updates needed','A hidden iframe used for rendering','A server-side copy of the DOM for SSR','B','When state changes, React re-renders into a new virtual DOM tree, diffs it against the previous one, and applies only the changed operations to the actual DOM.',3),
(9,'What does useState return?','The current state value only','An array of [currentStateValue, setterFunction] — the setter triggers a re-render when called with a new value','A mutable ref object','A Promise that resolves to the state value','B','const [count, setCount] = useState(0). Calling setCount(1) tells React the state changed, triggering a re-render. Direct mutation (count = 1) does NOT trigger re-render.',4),
(9,'What is a closure in JavaScript?','A syntax for immediately invoked functions','A function that retains access to variables from its outer scope even after that outer function has returned','A method for closing WebSocket connections','A design pattern for encapsulating class methods','B','Closures are fundamental to JS: event handlers, React hooks, module patterns all rely on them. They enable data encapsulation and are why useState works correctly across renders.',5),
(9,'What does the JavaScript spread operator (...) do?','Defines rest parameters in function signatures only','Expands an iterable (array/object) into individual elements — enables shallow copying and merging without mutation','Converts a string to a character array','Creates a generator function','B','const newArr = [...arr1, ...arr2] merges arrays. const newObj = {...obj, key: val} shallow-copies and overrides a key. Used heavily in React to update state immutably.',6),
(9,'What is the JavaScript event loop?','A built-in loop for handling DOM click events','The mechanism allowing single-threaded JS to handle async operations by moving completed callbacks from the task queue to the call stack when it is empty','A loop that runs every frame for animations','A Node.js-specific feature not present in browsers','B','JS is single-threaded. When you fetch() data, the browser handles I/O separately. The callback sits in the task queue and runs only when the call stack is empty — hence async operations never block the UI.',7),
(9,'What is React Context used for?','Managing component-level local state','Sharing state across multiple components in a tree without passing props through every intermediate level (prop drilling)','Fetching data from an API','Replacing all useState hooks in a large application','B','Context provides a way to pass values (theme, auth user, locale) to deeply nested components without explicit prop passing at every level.',8),
(9,'What is destructuring assignment in JavaScript?','Removing properties from an object permanently','A syntax for extracting values from arrays or properties from objects into distinct variables in a single statement','Converting a class instance to a plain object','A method for deep-cloning objects','B','const {name, age} = user extracts object properties. const [first, second] = arr extracts array items. Used everywhere in React: const [state, setState] = useState().',9),
(9,'What problem does async/await solve compared to raw Promises?','It makes JavaScript multi-threaded','It makes asynchronous code read like synchronous code, eliminating nested .then() chains while still being non-blocking','It eliminates the need for error handling','It speeds up network requests','B','async/await is syntactic sugar over Promises. await pauses the async function until the Promise resolves without blocking the thread. try/catch handles rejections naturally.',10);
