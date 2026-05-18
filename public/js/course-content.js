/* Study content for each course module, keyed by module ID */
const COURSE_CONTENT = {
  // ── Course 1: Introduction to Cryptography ────────────────────────────
  1: `<p>Cryptography is the science of securing information by transforming it into an unreadable format using mathematical algorithms. It has existed for thousands of years — from Caesar's letter-substitution cipher to today's AES encryption securing billions of internet transactions every second.</p>
<p>Modern cryptography rests on three core goals known as the CIA triad: <strong>Confidentiality</strong> ensures only authorised parties can read the data; <strong>Integrity</strong> ensures data has not been tampered with in transit; and <strong>Authentication</strong> verifies that communicating parties are who they claim to be.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Plaintext:</strong> The original readable data before encryption.</li>
<li><strong>Ciphertext:</strong> The scrambled, unreadable output after encryption.</li>
<li><strong>Key:</strong> A secret value that controls the encryption and decryption process.</li>
<li><strong>Kerckhoffs's principle:</strong> A system should be secure even if everything about it, except the key, is public.</li>
</ul>`,

  2: `<p>Symmetric encryption uses a single secret key for both encrypting and decrypting data. It is fast and efficient, making it ideal for encrypting large volumes of data such as files, databases, and network streams. The entire security of the system depends on keeping that one key secret.</p>
<p>AES (Advanced Encryption Standard) is the gold standard — adopted by the US government in 2001 and used worldwide. AES operates on 128-bit blocks and supports 128, 192, or 256-bit keys. The mode of operation matters greatly: ECB mode is insecure because identical plaintext blocks produce identical ciphertext, while GCM mode provides both encryption and authentication.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>AES:</strong> The most widely used symmetric cipher, replacing the older DES standard.</li>
<li><strong>Block cipher:</strong> Encrypts data in fixed-size chunks (128-bit blocks for AES).</li>
<li><strong>Stream cipher:</strong> Encrypts data one bit or byte at a time (e.g. ChaCha20).</li>
<li><strong>GCM mode:</strong> Recommended — provides encryption plus authentication in one step.</li>
</ul>`,

  3: `<p>Asymmetric encryption uses two mathematically linked keys: a public key that anyone can see, and a private key kept secret by its owner. Data encrypted with the public key can only be decrypted with the private key. This solves the key distribution problem of symmetric cryptography — you can share your public key openly without risk.</p>
<p>RSA relies on the mathematical difficulty of factoring large prime numbers. Elliptic Curve Cryptography (ECC) achieves equivalent security with much smaller keys — a 256-bit ECC key is as strong as a 3072-bit RSA key — making it ideal for mobile devices and modern TLS certificates.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Public key:</strong> Freely shareable; used to encrypt data or verify a signature.</li>
<li><strong>Private key:</strong> Never shared; used to decrypt data or create a signature.</li>
<li><strong>RSA:</strong> Based on integer factorisation; widely used but requires large keys.</li>
<li><strong>ECC:</strong> Elliptic Curve Cryptography — smaller keys, faster operations, same security level.</li>
</ul>`,

  4: `<p>A cryptographic hash function takes an input of any size and produces a fixed-size output called a digest. Hash functions are one-way — you cannot reverse them to recover the original input. Even a single character change in the input produces a completely different hash, a property called the avalanche effect.</p>
<p>MD5 and SHA-1 are now broken — researchers have found collisions (two different inputs producing the same hash). For any new system, use SHA-256 or SHA-3. Hashes are used everywhere: verifying file downloads, storing passwords, digital signatures, and powering blockchain integrity checks.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Digest:</strong> The fixed-size hash output (e.g. SHA-256 always outputs 256 bits).</li>
<li><strong>Collision:</strong> Two different inputs producing the same hash — catastrophic for security.</li>
<li><strong>Avalanche effect:</strong> A tiny change in input causes a drastic change in the hash output.</li>
<li><strong>Salting:</strong> Adding random data before hashing to defeat rainbow table attacks on passwords.</li>
</ul>`,

  5: `<p>A digital signature lets you prove that a message or document came from you and was not altered. You hash the document, then encrypt that hash with your private key — the result is the signature. Anyone with your public key can decrypt and verify it matches the document's hash.</p>
<p>Public Key Infrastructure (PKI) is the system of Certificate Authorities (CAs) that bind public keys to real-world identities. When your browser shows a padlock on HTTPS, it verified the server's X.509 certificate was signed by a CA your OS trusts. Certificate chains allow trust to flow from a small number of root CAs to millions of websites.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Digital signature:</strong> A hash of a document encrypted with the sender's private key.</li>
<li><strong>X.509:</strong> The standard certificate format used in HTTPS and email security.</li>
<li><strong>Certificate Authority (CA):</strong> A trusted organisation that vouches for a public key's owner.</li>
<li><strong>Certificate chain:</strong> A hierarchy from a root CA down to the end-entity certificate.</li>
</ul>`,

  6: `<p>TLS (Transport Layer Security) is the protocol behind every HTTPS connection. It uses asymmetric cryptography to securely exchange a session key, then switches to fast symmetric encryption for the actual data. A MAC (Message Authentication Code) detects any tampering in transit. TLS 1.3 streamlined this process to a single round trip, making it faster and more secure than ever.</p>
<p>The biggest applied cryptography mistakes are not algorithm weaknesses but implementation errors: hardcoding keys, using ECB mode, storing passwords with MD5, and skipping certificate validation. Always use battle-tested libraries (OpenSSL, libsodium) rather than writing your own cryptographic code.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>TLS handshake:</strong> The negotiation process where client and server agree on keys and algorithms.</li>
<li><strong>Cipher suite:</strong> A named combination of key exchange, encryption, and MAC algorithms.</li>
<li><strong>Perfect Forward Secrecy:</strong> Ensures past sessions stay safe even if the long-term key is later compromised.</li>
<li><strong>HSTS:</strong> HTTP Strict Transport Security — forces browsers to always use HTTPS for a domain.</li>
</ul>`,

  // ── Course 2: Web Application Security ───────────────────────────────
  7: `<p>The OWASP Top 10 is a regularly updated list of the most critical web application security risks, compiled by security experts worldwide. Understanding these risks is the first step to building secure applications — the list shapes security standards, penetration testing methodologies, and compliance frameworks globally.</p>
<p>Each risk is scored by its likelihood of exploitation, the prevalence of the vulnerability, and the potential business impact. Developers who understand the Top 10 write more secure code from the start, reducing the cost of security fixes dramatically — vulnerabilities caught in development cost 100x less to fix than those found in production.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>OWASP:</strong> Open Web Application Security Project — a non-profit that produces free security resources.</li>
<li><strong>Threat modelling:</strong> Systematically identifying what could go wrong in your application before building it.</li>
<li><strong>Attack surface:</strong> Every point where an attacker could try to enter or extract data.</li>
<li><strong>Security by design:</strong> Building security in from the start rather than bolting it on later.</li>
</ul>`,

  8: `<p>SQL injection occurs when an attacker inserts malicious SQL code into an input field that is concatenated into a database query. A login form that builds <code>SELECT * FROM users WHERE email='INPUT'</code> can be exploited by entering <code>' OR '1'='1</code> to bypass authentication entirely and access any account.</p>
<p>The fix is simple and absolute: always use parameterised queries (prepared statements). The database driver sends the query and data separately, making it impossible for user input to be interpreted as SQL. ORMs like Sequelize and TypeORM use parameterised queries by default — only raw query methods require explicit care.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Parameterised query:</strong> Query and data are sent separately — user input is never interpreted as SQL.</li>
<li><strong>Blind SQLi:</strong> The attacker cannot see query results but infers data from true/false responses.</li>
<li><strong>Time-based SQLi:</strong> Uses database sleep functions to infer data when no output is visible.</li>
<li><strong>Principle of least privilege:</strong> The DB user your app connects with should only have the permissions it needs.</li>
</ul>`,

  9: `<p>Cross-Site Scripting (XSS) allows an attacker to inject malicious JavaScript into a web page viewed by other users. Stored XSS saves the payload in the database (e.g. a comment field) — every user who views that page runs the attacker's code. Reflected XSS embeds the payload in a URL that a victim is tricked into clicking.</p>
<p>XSS can steal session cookies, redirect users to phishing pages, capture keystrokes, or completely rewrite the page content. The primary defence is output encoding — never insert untrusted data into HTML without escaping it. Content Security Policy (CSP) provides a second layer by blocking inline scripts and restricting which domains can serve JavaScript.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Stored XSS:</strong> Payload is persisted in the database and served to all visitors of a page.</li>
<li><strong>Reflected XSS:</strong> Payload is embedded in a URL and reflected back in the server response.</li>
<li><strong>Output encoding:</strong> Escaping characters like &lt; &gt; &amp; so they render as text, not HTML.</li>
<li><strong>HttpOnly cookie flag:</strong> Prevents JavaScript from reading the session cookie, limiting XSS impact.</li>
</ul>`,

  10: `<p>Cross-Site Request Forgery (CSRF) tricks an authenticated user's browser into sending a request to your application without their knowledge. Because the browser automatically attaches cookies, the server cannot distinguish a legitimate request from a forged one. A malicious site can silently transfer money, change an email address, or delete data on behalf of the logged-in user.</p>
<p>Broken authentication covers a wide range of flaws: weak passwords, missing account lockout, session tokens that never expire, and credentials stored in plain text. Multi-factor authentication (MFA) is the single most effective control — even if a password is stolen, the attacker still cannot log in without the second factor.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>CSRF token:</strong> A secret, random value embedded in forms and verified server-side on submission.</li>
<li><strong>SameSite cookie:</strong> Set to Strict or Lax to prevent cookies from being sent on cross-site requests.</li>
<li><strong>Session fixation:</strong> Regenerate the session ID on login to prevent an attacker from pre-setting a known ID.</li>
<li><strong>Credential stuffing:</strong> Using leaked username/password pairs from other breaches to attack your site.</li>
</ul>`,

  11: `<p>HTTP response headers are one of the cheapest security wins available — a few lines of server configuration can defend against clickjacking, MIME-type sniffing, protocol downgrade attacks, and information leakage. Most of these headers cost nothing in performance and take minutes to configure.</p>
<p>Content Security Policy (CSP) is the most powerful but also the most complex header. A strict CSP whitelists exactly which domains can serve scripts, styles, images, and fonts for your page. Any injected script that does not come from an approved source is blocked by the browser, adding a strong defence-in-depth layer on top of output encoding.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>X-Frame-Options: DENY:</strong> Prevents your page from being embedded in an iframe — stops clickjacking.</li>
<li><strong>HSTS:</strong> Forces all future connections to use HTTPS for a defined period (max-age).</li>
<li><strong>X-Content-Type-Options: nosniff:</strong> Prevents browsers from guessing a response's MIME type.</li>
<li><strong>Referrer-Policy:</strong> Controls how much URL information is sent when navigating away from your site.</li>
</ul>`,

  12: `<p>REST APIs are frequent attack targets because they are often publicly accessible and handle sensitive data. Common API vulnerabilities include broken object-level authorisation (accessing other users' data by changing an ID), missing rate limiting (brute-force and enumeration), and verbose error messages that reveal internal details to attackers.</p>
<p>Integrating security into the Software Development Lifecycle (SDLC) means threat modelling during design, static analysis during development, code review before merge, and penetration testing before release. Security is not a phase — it is a practice applied continuously at every stage of development.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>BOLA (Broken Object Level Auth):</strong> Failing to verify the requester owns the resource they are accessing.</li>
<li><strong>Rate limiting:</strong> Restricting how many requests a client can make in a time window.</li>
<li><strong>JWT pitfalls:</strong> Never use <code>alg: none</code>; always verify the signature; keep tokens short-lived.</li>
<li><strong>Penetration testing:</strong> Authorised simulated attacks to find vulnerabilities before real attackers do.</li>
</ul>`,

  // ── Course 3: Advanced SQL & Databases ───────────────────────────────
  13: `<p>The database query planner decides how to execute your SQL — whether to use an index, which table to scan first, and how to join tables. Understanding the planner lets you write queries that run in milliseconds instead of minutes. The EXPLAIN command reveals the execution plan the database chose and exactly where time is being spent.</p>
<p>The N+1 query problem is the most common performance killer in web apps: fetching a list of 100 users and then running a separate query for each user's posts results in 101 queries instead of 1. Always fetch related data in a single JOIN query or use eager loading in your ORM.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>EXPLAIN:</strong> Shows the query execution plan — look for full table scans on large tables.</li>
<li><strong>Index scan:</strong> The database walks the index to find matching rows — fast on high-cardinality columns.</li>
<li><strong>Full table scan:</strong> Every row is read — acceptable for small tables, catastrophic for large ones.</li>
<li><strong>Covering index:</strong> An index that contains all columns needed by a query, avoiding the table entirely.</li>
</ul>`,

  14: `<p>SQL joins combine rows from two or more tables based on a related column. INNER JOIN returns only rows with a match in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right (with NULLs where there is no match). Choosing the wrong join type is a very common source of incorrect query results.</p>
<p>Self-joins allow you to join a table to itself — useful for hierarchical data like employee/manager relationships or finding pairs within the same table. The join order chosen by the query planner significantly affects performance; on large tables, always verify the plan with EXPLAIN and add indexes where needed.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>INNER JOIN:</strong> Returns only rows where the join condition matches in both tables.</li>
<li><strong>LEFT JOIN:</strong> All rows from the left table; NULL for columns from the right where there is no match.</li>
<li><strong>FULL OUTER JOIN:</strong> All rows from both tables with NULLs where either side has no match.</li>
<li><strong>Self-join:</strong> A table joined to itself using aliases — great for hierarchical or comparative queries.</li>
</ul>`,

  15: `<p>Window functions perform calculations across a set of rows related to the current row without collapsing them into a single output row. Unlike GROUP BY aggregations, you keep every row and gain the ability to see rankings, running totals, moving averages, and comparisons to previous rows — all in a single query.</p>
<p>The OVER() clause defines the window. PARTITION BY divides rows into groups (like GROUP BY but without collapsing). ORDER BY within OVER defines the order for cumulative calculations. ROW_NUMBER(), RANK(), LAG(), and LEAD() are the most frequently used window functions in data analysis and reporting queries.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>OVER():</strong> Defines the window (set of rows) the function operates on.</li>
<li><strong>PARTITION BY:</strong> Divides rows into groups within the window without collapsing them.</li>
<li><strong>LAG / LEAD:</strong> Access the value from the previous or next row in the window.</li>
<li><strong>ROW_NUMBER():</strong> Assigns a unique sequential number to each row within the partition.</li>
</ul>`,

  16: `<p>A transaction is a group of SQL statements that either all succeed or all fail together — there is no partial success. This is critical for financial operations: transferring money requires debiting one account AND crediting another. If either step fails, the entire transaction rolls back so you never end up in an inconsistent state.</p>
<p>ACID stands for Atomicity (all or nothing), Consistency (data always valid), Isolation (concurrent transactions do not interfere), and Durability (committed data survives crashes). Isolation levels trade performance for safety — READ UNCOMMITTED is fastest but allows dirty reads; SERIALIZABLE is safest but has the highest contention.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>ACID:</strong> Atomicity, Consistency, Isolation, Durability — the four guarantees of a reliable transaction.</li>
<li><strong>ROLLBACK:</strong> Undoes all changes made in the current transaction.</li>
<li><strong>Deadlock:</strong> Two transactions each waiting for a lock held by the other — the DB detects and kills one.</li>
<li><strong>Isolation level:</strong> Controls how visible one transaction's uncommitted changes are to others.</li>
</ul>`,

  17: `<p>Indexes are data structures (usually B-Trees) that allow the database to find rows without scanning every record. Without an index on a WHERE clause column, the database reads every row — a full table scan that grows linearly with data size. A well-placed index can turn a 10-second query into one that completes in milliseconds.</p>
<p>Indexes have a cost: they consume disk space and slow down INSERT, UPDATE, and DELETE operations because the index must also be updated. Over-indexing is as harmful as under-indexing. Composite indexes (multiple columns) are powerful but only help queries that use the leftmost columns of the index first.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>B-Tree index:</strong> The default index type — efficient for equality, range, and ORDER BY queries.</li>
<li><strong>Composite index:</strong> An index on multiple columns; most effective when the query filters on leading columns.</li>
<li><strong>Cardinality:</strong> The number of unique values in a column — high cardinality makes indexes most effective.</li>
<li><strong>Slow query log:</strong> A database feature that records queries exceeding a time threshold for later analysis.</li>
</ul>`,

  18: `<p>Database normalisation is the process of organising a schema to reduce data redundancy and improve data integrity. The normal forms (1NF through BCNF) provide a step-by-step framework: each table should represent one entity, every non-key attribute should depend on the whole key, and there should be no transitive dependencies.</p>
<p>Denormalisation (intentionally introducing some redundancy) is sometimes the right trade-off for read-heavy systems where the cost of joins outweighs the storage overhead. Understanding both normalised and denormalised designs allows you to make informed decisions about when to prioritise consistency versus query performance.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>1NF:</strong> Each column holds atomic values; no repeating groups.</li>
<li><strong>2NF:</strong> Every non-key attribute depends on the entire primary key, not just part of it.</li>
<li><strong>3NF:</strong> No transitive dependencies — non-key attributes depend only on the key.</li>
<li><strong>Foreign key:</strong> A column that references the primary key of another table, enforcing referential integrity.</li>
</ul>`,

  // ── Course 4: Machine Learning Fundamentals ───────────────────────────
  19: `<p>Machine learning is a branch of artificial intelligence where systems learn patterns from data rather than following explicit rules. Instead of programming every decision, you show the algorithm thousands of examples and it learns the underlying pattern. This approach has revolutionised image recognition, language translation, fraud detection, and medical diagnosis.</p>
<p>The three main types of learning are supervised (you provide labelled examples), unsupervised (the algorithm finds hidden patterns without labels), and reinforcement (an agent learns by receiving rewards and penalties). Choosing the right type depends on what data you have and what problem you are solving.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Supervised learning:</strong> Training on labelled examples to predict an output (e.g. spam or not spam).</li>
<li><strong>Unsupervised learning:</strong> Finding hidden structure in unlabelled data (e.g. customer segments).</li>
<li><strong>Training set:</strong> The data used to fit the model's parameters.</li>
<li><strong>Test set:</strong> Held-out data used to evaluate how well the model generalises to unseen examples.</li>
</ul>`,

  20: `<p>Real-world data is messy — missing values, inconsistent formats, outliers, and incorrect entries are the norm. Data preprocessing transforms raw data into a clean format that machine learning algorithms can learn from effectively. Studies consistently show that 80% of a data scientist's time is spent cleaning and preparing data.</p>
<p>Feature scaling ensures that no single feature dominates the model simply because it has a larger numerical range. Standardisation (zero mean, unit variance) and min-max normalisation are the two main approaches. Encoding categorical variables (like "red", "blue", "green") into numbers is also essential since most ML algorithms require numerical input.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Imputation:</strong> Filling in missing values using the mean, median, or a predicted value.</li>
<li><strong>Standardisation:</strong> Scaling features to have zero mean and unit variance (Z-score scaling).</li>
<li><strong>One-hot encoding:</strong> Converting a categorical variable into binary columns (one per category).</li>
<li><strong>Data leakage:</strong> Accidentally using future or target information during training — inflates performance metrics.</li>
</ul>`,

  21: `<p>Linear regression predicts a continuous numerical output by fitting a straight line (or hyperplane in multiple dimensions) through the training data. The algorithm minimises the Mean Squared Error between predicted and actual values by adjusting the model's weights using gradient descent — an iterative process of taking small steps in the direction that reduces error.</p>
<p>Regularisation (Ridge/L2 and Lasso/L1) adds a penalty term to the loss function to prevent the model from fitting noise in the training data. Ridge shrinks all weights towards zero; Lasso can shrink some weights all the way to zero, effectively performing feature selection. Both help the model generalise better to new data.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Gradient descent:</strong> An optimisation algorithm that iteratively moves weights in the direction of steepest loss reduction.</li>
<li><strong>MSE (Mean Squared Error):</strong> The average squared difference between predictions and actual values.</li>
<li><strong>R² score:</strong> Proportion of variance in the target explained by the model; 1.0 is perfect, 0 is no better than the mean.</li>
<li><strong>Ridge / Lasso:</strong> Regularisation techniques that penalise large weights to reduce overfitting.</li>
</ul>`,

  22: `<p>Classification predicts which category a data point belongs to. Logistic regression (despite the name) is a classification algorithm that outputs probabilities between 0 and 1. Decision trees split data on the feature that best separates classes at each node, creating an interpretable flowchart of decisions that is easy to visualise and explain.</p>
<p>Support Vector Machines (SVMs) find the hyperplane that maximises the margin between classes — the widest possible gap between the nearest data points on each side. K-Nearest Neighbours (k-NN) classifies a new point by majority vote of its k closest neighbours in the training set. Both are effective for different types of data distributions.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Decision boundary:</strong> The line or surface the model uses to separate different classes.</li>
<li><strong>Precision:</strong> Of all predicted positives, how many were actually positive?</li>
<li><strong>Recall:</strong> Of all actual positives, how many did the model correctly identify?</li>
<li><strong>F1-score:</strong> The harmonic mean of precision and recall — useful when classes are imbalanced.</li>
</ul>`,

  23: `<p>Ensemble methods combine predictions from multiple models to produce a result better than any single model. The intuition is similar to asking a crowd of experts — their collective judgment tends to be more accurate and more robust than relying on any one person. Bagging reduces variance by training multiple models on random subsets of data; boosting reduces bias by training each model to correct the errors of the previous one.</p>
<p>Random Forest trains many decision trees on random subsets of features and data, then averages their predictions. Gradient Boosting (and its optimised variants XGBoost, LightGBM) builds trees sequentially, each one fitting the residual errors of the previous ensemble. Gradient boosting consistently wins structured-data competitions on Kaggle.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Bagging:</strong> Training models on bootstrapped (random with replacement) subsets — reduces variance.</li>
<li><strong>Boosting:</strong> Sequential training where each model focuses on correcting the previous model's errors.</li>
<li><strong>Random Forest:</strong> An ensemble of decision trees with random feature selection at each split.</li>
<li><strong>XGBoost:</strong> An optimised gradient boosting library known for speed and accuracy on tabular data.</li>
</ul>`,

  24: `<p>A neural network is a system of interconnected nodes (neurons) organised in layers. The input layer receives features; hidden layers learn increasingly abstract representations; the output layer produces predictions. Each connection has a weight — training adjusts these weights using backpropagation to minimise prediction error across thousands of examples.</p>
<p>Activation functions (ReLU, sigmoid, softmax) introduce non-linearity, allowing networks to learn complex patterns that linear models cannot. Deep learning refers to networks with many hidden layers. Without regularisation techniques like dropout and early stopping, deep networks easily memorise training data and fail to generalise — this is overfitting.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Backpropagation:</strong> Computing gradients layer by layer to update weights and reduce loss.</li>
<li><strong>ReLU:</strong> Rectified Linear Unit activation — outputs zero for negative inputs, the input itself otherwise.</li>
<li><strong>Epoch:</strong> One complete pass through the entire training dataset.</li>
<li><strong>Dropout:</strong> Randomly disabling neurons during training to prevent co-adaptation and overfitting.</li>
</ul>`,

  // ── Course 5: Full Stack Web Development ─────────────────────────────
  25: `<p>HTML5 is the markup language that structures every web page. Semantic elements like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> describe the meaning of content rather than just its appearance. This benefits accessibility tools (screen readers) and search engines that parse your page structure to understand its content.</p>
<p>Web accessibility means building sites that work for everyone, including users with disabilities. Using proper heading hierarchy (<code>h1</code> to <code>h6</code>), alt text on images, labels on form fields, and sufficient colour contrast are foundational requirements. The WCAG 2.1 guidelines provide the international standard for accessible web content.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Semantic HTML:</strong> Using tags that convey meaning (<code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>) rather than generic <code>&lt;div&gt;</code> tags.</li>
<li><strong>ARIA attributes:</strong> Provide accessibility information to assistive technologies when HTML semantics are not enough.</li>
<li><strong>Viewport meta tag:</strong> <code>&lt;meta name="viewport"&gt;</code> ensures correct rendering on mobile devices.</li>
<li><strong>LocalStorage API:</strong> Stores key-value pairs in the browser that persist across sessions.</li>
</ul>`,

  26: `<p>CSS Flexbox and Grid are the two modern layout systems. Flexbox excels at one-dimensional layouts — aligning items in a row or column. Grid handles two-dimensional layouts — rows and columns simultaneously. Together they replace the old float-based and table-based layouts that were fragile and hard to maintain.</p>
<p>Responsive design means your layout adapts gracefully to any screen size — from a 320px phone to a 4K monitor. Mobile-first design starts with the smallest screen styles and uses <code>min-width</code> media queries to add complexity for larger screens. CSS custom properties (variables) make maintaining a consistent design system across a large codebase much easier.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Flexbox:</strong> One-dimensional layout; use for rows or columns of items.</li>
<li><strong>CSS Grid:</strong> Two-dimensional layout; use for full page layouts and complex component grids.</li>
<li><strong>Media query:</strong> Applies CSS rules conditionally based on screen width, height, or device type.</li>
<li><strong>CSS variables:</strong> <code>--primary-color: #3d6b1e</code> — reusable values that make global changes easy.</li>
</ul>`,

  27: `<p>JavaScript is the only programming language that runs natively in the browser, making it essential for any web developer. Understanding the event loop is critical: JavaScript is single-threaded, so asynchronous operations (fetching data, reading files) use callbacks, Promises, or async/await to avoid blocking the UI while waiting.</p>
<p>ES6+ introduced features that transformed how JavaScript is written: arrow functions, destructuring, template literals, modules, spread/rest operators, and async/await. Closures — functions that remember the scope they were created in — are the foundation of many JavaScript patterns including event handlers, factory functions, and module patterns.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Event loop:</strong> How JavaScript handles async operations without blocking — the call stack, task queue, and microtask queue.</li>
<li><strong>Closure:</strong> A function that captures and remembers variables from its surrounding scope.</li>
<li><strong>Promise:</strong> An object representing a value that will be available in the future (pending, fulfilled, or rejected).</li>
<li><strong>async/await:</strong> Syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.</li>
</ul>`,

  28: `<p>Node.js lets you run JavaScript on the server, using the same language for both front and back end. Express.js is a minimal web framework that provides routing and middleware on top of Node's HTTP module. Middleware functions are the backbone of Express — they intercept requests, process them (logging, parsing, authentication), and pass them to the next handler.</p>
<p>REST API design uses HTTP methods and status codes semantically: GET retrieves, POST creates, PUT/PATCH updates, DELETE removes. A well-designed API is predictable and consistent — resources are nouns in the URL path, verbs live in the HTTP method, and responses use standard status codes (200, 201, 400, 401, 404, 500).</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Middleware:</strong> A function that receives (req, res, next) and can modify the request, send a response, or call next().</li>
<li><strong>Route handler:</strong> A function mapped to a specific HTTP method and URL path.</li>
<li><strong>Environment variables:</strong> Configuration values (DB credentials, API keys) stored outside the codebase in .env files.</li>
<li><strong>Express Router:</strong> Organises routes into separate files for a cleaner, modular project structure.</li>
</ul>`,

  29: `<p>MySQL is a relational database that stores data in tables with rows and columns. The <code>mysql2</code> npm package provides a Promise-based connection pool — a pool keeps several connections open and reuses them, avoiding the overhead of opening a new connection for every request. Always use parameterised queries to prevent SQL injection.</p>
<p>JWT (JSON Web Token) is a compact, self-contained token for transmitting authentication data. After login, the server signs a token containing the user's ID and role using a secret key. The client stores this token and sends it with every subsequent request. The server verifies the signature — no database lookup needed — making JWTs stateless and scalable.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Connection pool:</strong> A cache of reusable database connections — avoids the overhead of new connections per request.</li>
<li><strong>bcrypt:</strong> A slow, salt-generating password hashing function designed to be resistant to brute-force attacks.</li>
<li><strong>JWT:</strong> Three base64-encoded parts: header (algorithm), payload (claims), signature (verification).</li>
<li><strong>Auth middleware:</strong> Verifies the JWT on protected routes before the handler function runs.</li>
</ul>`,

  30: `<p>React is a JavaScript library for building user interfaces from reusable components. Each component is a function that takes props (input data) and returns JSX (HTML-like syntax that compiles to JavaScript). When state changes, React efficiently re-renders only the affected parts of the DOM using its virtual DOM diffing algorithm.</p>
<p>Deployment is the process of making your application accessible on the internet. Services like Railway, Render, and Vercel connect to your GitHub repository and automatically build and deploy on every push. Environment variables on the hosting platform replace your local .env file, keeping secrets out of version control.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Component:</strong> A reusable, self-contained piece of UI — a function that returns JSX.</li>
<li><strong>Props:</strong> Read-only data passed from a parent component to a child.</li>
<li><strong>Virtual DOM:</strong> React's in-memory representation of the UI — used to calculate the minimum DOM updates needed.</li>
<li><strong>CI/CD:</strong> Continuous Integration / Continuous Deployment — automatically test and deploy on every code push.</li>
</ul>`,

  // ── Course 6: Network Security Essentials ────────────────────────────
  31: `<p>The OSI model divides network communication into 7 abstract layers, from physical cables (Layer 1) up to application protocols like HTTP (Layer 7). Understanding which layer a security control operates at helps you choose the right tool — a firewall operates at Layer 3/4, TLS at Layer 4/5, and a WAF at Layer 7. The TCP/IP model is a practical 4-layer version used in the real internet.</p>
<p>Wireshark is the industry-standard packet analyser. It captures raw network traffic and lets you inspect every packet at every layer. Mastering Wireshark is essential for network troubleshooting, security analysis, and understanding exactly how protocols work in practice.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>OSI model:</strong> 7-layer conceptual framework for network communication (Physical → Application).</li>
<li><strong>TCP/IP:</strong> The actual protocol suite the internet runs on, with 4 layers.</li>
<li><strong>Packet:</strong> A unit of data transmitted over a network, containing a header (addressing) and payload (content).</li>
<li><strong>Port:</strong> A number (0–65535) that identifies a specific process or service on a host.</li>
</ul>`,

  32: `<p>A firewall inspects network traffic and enforces rules about what is allowed and what is blocked. Stateless packet filters examine individual packets in isolation based on source IP, destination IP, and port. Stateful firewalls track the state of connections — they know whether a packet is part of an established TCP session, enabling smarter filtering decisions.</p>
<p>A DMZ (Demilitarised Zone) is a network segment that sits between the public internet and the internal private network. Public-facing servers (web, email) live in the DMZ — they are accessible to the internet but isolated from the sensitive internal network. This limits the damage if a public server is compromised.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Stateful inspection:</strong> Tracks TCP connection state to allow only legitimate response packets.</li>
<li><strong>ACL (Access Control List):</strong> An ordered list of rules specifying which traffic to permit or deny.</li>
<li><strong>NAT (Network Address Translation):</strong> Maps private internal IPs to a public IP, hiding internal structure.</li>
<li><strong>DMZ:</strong> A network zone between internet and internal network hosting public-facing services.</li>
</ul>`,

  33: `<p>A VPN (Virtual Private Network) creates an encrypted tunnel over the public internet, allowing remote users or offices to communicate as if they were on the same private network. This protects data from eavesdropping on untrusted networks (public Wi-Fi) and allows secure remote access to corporate resources.</p>
<p>WireGuard is a modern VPN protocol praised for its simplicity (around 4,000 lines of code vs 400,000 for OpenVPN), performance, and strong cryptography. IPSec is the traditional enterprise standard, commonly used for site-to-site VPNs between office locations. Split tunnelling allows only specific traffic to go through the VPN while the rest uses the regular internet connection.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Site-to-site VPN:</strong> Connects two entire networks (e.g. two office locations) through an encrypted tunnel.</li>
<li><strong>Remote access VPN:</strong> Connects an individual user's device to a private network over the internet.</li>
<li><strong>IPSec:</strong> A suite of protocols for authenticating and encrypting IP packets at the network layer.</li>
<li><strong>Split tunnelling:</strong> Routes only specific traffic through the VPN — reduces load and improves performance.</li>
</ul>`,

  34: `<p>An Intrusion Detection System (IDS) monitors network traffic or host activity for suspicious patterns and generates alerts. An Intrusion Prevention System (IPS) goes further — it can automatically block malicious traffic in real time. Signature-based detection matches known attack patterns; anomaly-based detection flags traffic that deviates from a learned baseline of normal behaviour.</p>
<p>A SIEM (Security Information and Event Management) platform aggregates logs from firewalls, IDS, servers, and applications into a central system where security teams can search, correlate, and alert on events across the entire infrastructure. SIEMs are the heart of a modern Security Operations Centre (SOC).</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Signature-based detection:</strong> Matches traffic against a library of known attack patterns — fast but blind to new attacks.</li>
<li><strong>Anomaly-based detection:</strong> Flags deviations from a normal baseline — catches new attacks but prone to false positives.</li>
<li><strong>False positive:</strong> A legitimate activity incorrectly flagged as malicious — too many cause alert fatigue.</li>
<li><strong>SIEM:</strong> Centralises and correlates security logs across the entire infrastructure for threat hunting and incident response.</li>
</ul>`,

  35: `<p>Wi-Fi security has evolved from the broken WEP protocol (cracked in minutes) through WPA2 (still widely used) to WPA3 (current standard). WPA2 with a strong passphrase remains secure, but WPA2-Enterprise using 802.1X authentication is significantly stronger for corporate networks. Common Wi-Fi attacks include evil twin access points, deauthentication floods, and the KRACK attack on WPA2's four-way handshake.</p>
<p>DNS (Domain Name System) translates human-readable domain names into IP addresses. DNS Spoofing (or Cache Poisoning) tricks a resolver into caching a false DNS record, redirecting users to malicious servers. DNSSEC adds digital signatures to DNS records so resolvers can verify they have not been tampered with. DNS-over-HTTPS (DoH) encrypts DNS queries to prevent eavesdropping.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>WPA3:</strong> The current Wi-Fi security standard — uses SAE (Simultaneous Authentication of Equals) replacing WPA2's PSK.</li>
<li><strong>Evil twin attack:</strong> A rogue access point with the same SSID as a legitimate network to intercept traffic.</li>
<li><strong>DNSSEC:</strong> Adds cryptographic signatures to DNS records to verify their authenticity.</li>
<li><strong>DNS-over-HTTPS (DoH):</strong> Encrypts DNS queries inside HTTPS to prevent snooping by ISPs or attackers.</li>
</ul>`,

  // ── Course 7: Python for Data Science ────────────────────────────────
  36: `<p>Python has become the dominant language for data science due to its readable syntax, vast ecosystem of libraries, and the fact that it bridges the gap between quick scripting and production-grade software. Setting up a virtual environment (venv or conda) for each project isolates its dependencies and prevents version conflicts between projects on the same machine.</p>
<p>Python's built-in data structures — lists, dictionaries, sets, and tuples — are the building blocks for all data manipulation. List comprehensions provide a concise, Pythonic way to transform and filter collections. Lambda functions create small, anonymous functions inline — useful for passing simple logic to sort() or filter() without defining a named function.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Virtual environment:</strong> An isolated Python installation for a project — keeps dependencies separate.</li>
<li><strong>List comprehension:</strong> <code>[x*2 for x in range(10) if x % 2 == 0]</code> — concise, readable list creation.</li>
<li><strong>Dictionary:</strong> A key-value mapping; O(1) average lookup time — essential for data aggregation.</li>
<li><strong>Lambda:</strong> An anonymous function — <code>lambda x: x ** 2</code> is equivalent to <code>def f(x): return x ** 2</code>.</li>
</ul>`,

  37: `<p>NumPy (Numerical Python) provides the ndarray — a fast, memory-efficient multi-dimensional array. NumPy operations are implemented in C and execute far faster than equivalent Python loops. Broadcasting allows NumPy to perform operations on arrays of different shapes without explicit loops — adding a scalar to every element, or adding a row vector to every row of a matrix.</p>
<p>Vectorisation replaces slow Python for-loops with array operations that run in C underneath. A loop that processes one million numbers in pure Python might take seconds; the equivalent NumPy vectorised operation completes in milliseconds. This performance difference is why NumPy is the foundation of virtually every Python data science library.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>ndarray:</strong> NumPy's N-dimensional array — stores elements of a single data type contiguously in memory.</li>
<li><strong>Broadcasting:</strong> Automatically expands smaller arrays to match larger ones during arithmetic operations.</li>
<li><strong>Vectorisation:</strong> Replacing Python loops with array operations — dramatically faster due to C implementation.</li>
<li><strong>np.linalg:</strong> NumPy's linear algebra module — provides matrix multiplication, determinants, and eigenvalues.</li>
</ul>`,

  38: `<p>Pandas is built on NumPy and provides two key data structures: Series (one-dimensional) and DataFrame (two-dimensional, like a spreadsheet). DataFrames can load data from CSV, Excel, SQL, JSON, and many other formats. The ability to select, filter, group, and merge data with concise syntax makes Pandas the indispensable tool for tabular data manipulation in Python.</p>
<p>GroupBy splits a DataFrame into groups based on a column's values, applies a function to each group (sum, mean, count, custom aggregations), and combines the results. Merging DataFrames works just like SQL JOINs — inner, left, right, and outer merges are all supported. The <code>apply()</code> function lets you run a custom function on each row or column.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>DataFrame:</strong> A 2D labelled data structure with columns of potentially different types.</li>
<li><strong>groupby():</strong> Split-apply-combine — group rows, apply an aggregation, combine results into a new DataFrame.</li>
<li><strong>merge():</strong> Combines two DataFrames based on common columns — equivalent to a SQL JOIN.</li>
<li><strong>NaN:</strong> "Not a Number" — Pandas' representation of missing values; use <code>dropna()</code> or <code>fillna()</code> to handle them.</li>
</ul>`,

  39: `<p>Data visualisation transforms numbers into visual insights that are immediately understandable. Matplotlib is the foundational plotting library — highly customisable but verbose. Seaborn builds on Matplotlib with a higher-level API and beautiful default styles, making statistical plots (box plots, violin plots, pair plots, heat maps) trivial to create.</p>
<p>A good visualisation communicates one clear insight. Choose your chart type based on what you are showing: bar charts for comparing categories, line charts for trends over time, scatter plots for relationships between two variables, and histograms for distributions. Always label your axes, include a title, and choose colour palettes accessible to colour-blind readers.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Figure and Axes:</strong> Matplotlib's hierarchy — a Figure is the whole image; Axes is an individual plot within it.</li>
<li><strong>Seaborn heatmap:</strong> Visualises a correlation matrix — shows which features are linearly related.</li>
<li><strong>Histogram:</strong> Shows the distribution of a single numerical variable by counting values in bins.</li>
<li><strong>Pair plot:</strong> A grid of scatter plots for every pair of features — great for quick exploratory analysis.</li>
</ul>`,

  40: `<p>Exploratory Data Analysis (EDA) is the first thing you do with any new dataset — before building models. The goal is to understand the data's structure, find anomalies, test assumptions, and generate hypotheses. EDA saves enormous time by revealing data quality issues early, before they corrupt model results and send you on a long debugging chase.</p>
<p>Outliers are data points that differ significantly from the rest. They can indicate genuine rare events (fraud, sensor failures) or data entry errors. The IQR method identifies outliers as points more than 1.5 × IQR below the first quartile or above the third quartile. Always investigate outliers before removing them — they often contain important information.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>describe():</strong> Pandas function that gives count, mean, std, min, quartiles, and max for numerical columns.</li>
<li><strong>Correlation:</strong> A value between -1 and 1 indicating the linear relationship between two variables.</li>
<li><strong>IQR (Interquartile Range):</strong> Q3 - Q1 — the middle 50% of the data; used to detect outliers.</li>
<li><strong>Skewness:</strong> Asymmetry in the distribution — a long right tail means positive skew; may require log transformation.</li>
</ul>`,

  41: `<p>Scikit-learn is Python's go-to machine learning library, providing a consistent API across dozens of algorithms. Every estimator follows the same pattern: instantiate the model, call <code>fit(X_train, y_train)</code> to train it, then call <code>predict(X_test)</code> to generate predictions. Pipelines chain preprocessing and modelling steps, preventing data leakage and simplifying cross-validation.</p>
<p>Cross-validation gives a more reliable performance estimate than a single train/test split by training and evaluating the model on multiple different splits of the data. k-fold cross-validation splits data into k equal parts, trains on k-1 folds, and tests on the remaining fold — repeating k times and averaging the scores. This reduces the risk of getting lucky or unlucky with your random split.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>fit() / predict():</strong> The universal scikit-learn interface — all models use the same method names.</li>
<li><strong>Pipeline:</strong> Chains transformers and a final estimator to prevent data leakage during cross-validation.</li>
<li><strong>k-fold cross-validation:</strong> Evaluates a model on k different splits to produce a reliable performance estimate.</li>
<li><strong>ROC-AUC:</strong> Area Under the ROC Curve — measures a classifier's ability to distinguish between classes across all thresholds.</li>
</ul>`,

  // ── Course 8: Cloud Computing & AWS ──────────────────────────────────
  42: `<p>Cloud computing delivers computing resources — servers, storage, databases, networking — over the internet on a pay-as-you-go basis. Instead of buying and maintaining physical hardware, you rent exactly the capacity you need and scale up or down in minutes. AWS (Amazon Web Services) is the market leader, running a significant portion of the internet including Netflix, Airbnb, and NASA.</p>
<p>IAM (Identity and Access Management) controls who can do what in your AWS account. Every action in AWS is an API call that must be authorised by an IAM policy. The principle of least privilege — granting only the minimum permissions needed to do a job — is the single most important security practice in cloud environments. A misconfigured IAM policy has been the root cause of many high-profile cloud data breaches.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>IaaS:</strong> Infrastructure as a Service — you manage OS and above; AWS manages hardware (e.g. EC2).</li>
<li><strong>PaaS:</strong> Platform as a Service — you manage your app; provider manages runtime and infrastructure (e.g. Heroku).</li>
<li><strong>IAM Role:</strong> A set of permissions that can be assumed by a service or user — prefer roles over access keys.</li>
<li><strong>Least privilege:</strong> Grant only the permissions required for a task — nothing more.</li>
</ul>`,

  43: `<p>EC2 (Elastic Compute Cloud) provides resizable virtual machines in the cloud. You choose the instance type (CPU, RAM, network performance), operating system, and storage. Security Groups act as virtual firewalls — they control which ports and IPs can communicate with your instance, and all traffic is denied by default until you explicitly allow it.</p>
<p>A VPC (Virtual Private Cloud) is your private, isolated section of the AWS network. Inside a VPC you create subnets in different Availability Zones for fault tolerance. Public subnets route traffic through an Internet Gateway; private subnets use a NAT Gateway to initiate outbound traffic without being directly reachable from the internet — protecting databases and internal services.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Security Group:</strong> A stateful virtual firewall for EC2 — defines allowed inbound and outbound traffic.</li>
<li><strong>AMI (Amazon Machine Image):</strong> A template containing the OS and software configuration for launching EC2 instances.</li>
<li><strong>Public subnet:</strong> A subnet with a route to the Internet Gateway — instances here can be accessed from the internet.</li>
<li><strong>NAT Gateway:</strong> Allows private-subnet instances to make outbound internet requests without being publicly accessible.</li>
</ul>`,

  44: `<p>S3 (Simple Storage Service) is AWS's object storage service — you store any file (object) in a bucket and retrieve it via a URL. S3 is highly durable (designed for 99.999999999% durability), infinitely scalable, and cheap. It powers static website hosting, data lakes, application file uploads, and serves as the backbone for many AWS services including data pipelines and machine learning workflows.</p>
<p>S3 storage classes let you balance cost and access speed. Standard is for frequently accessed data. Infrequent Access and Glacier archive tiers offer significant cost savings (up to 90% cheaper) for data accessed rarely. Lifecycle policies automatically transition objects between storage classes based on age, keeping storage costs optimised without manual management.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Bucket:</strong> A globally unique container for S3 objects — all objects live inside a bucket.</li>
<li><strong>Object:</strong> A file stored in S3, identified by its key (path-like name) within a bucket.</li>
<li><strong>Storage class:</strong> Determines durability, availability, and price — choose based on how often data is accessed.</li>
<li><strong>Pre-signed URL:</strong> A temporary URL granting time-limited access to a private S3 object — great for secure file downloads.</li>
</ul>`,

  45: `<p>RDS (Relational Database Service) lets you run MySQL, PostgreSQL, MariaDB, Oracle, or SQL Server without managing the underlying server. AWS handles patching, backups, and hardware failure. Multi-AZ deployments automatically maintain a synchronous standby replica in a second Availability Zone, providing automatic failover in case the primary instance fails.</p>
<p>Read replicas are asynchronous copies of your database that can serve read traffic — critical for read-heavy applications that would otherwise bottleneck on a single instance. Aurora is AWS's cloud-native database engine that is compatible with MySQL and PostgreSQL but offers significantly higher performance and automatic storage scaling.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Multi-AZ:</strong> Synchronous standby in a second AZ — provides automatic failover with minimal downtime.</li>
<li><strong>Read replica:</strong> Asynchronous copy of the DB for read-only queries — offloads read traffic from the primary.</li>
<li><strong>Automated backups:</strong> RDS takes daily snapshots and stores transaction logs for point-in-time recovery.</li>
<li><strong>Parameter group:</strong> A container for database engine configuration — tune memory, connections, and timeouts.</li>
</ul>`,

  46: `<p>AWS Lambda runs your code in response to events (HTTP requests, S3 uploads, database changes, scheduled triggers) without you provisioning or managing any servers. You pay only for the actual compute time used — down to the millisecond. Lambda automatically scales from zero to thousands of concurrent executions, making it ideal for unpredictable or bursty workloads.</p>
<p>Cold starts occur when Lambda needs to initialise a new execution environment — this can add 100ms–1s of latency to the first invocation. Keeping functions warm with scheduled pings, using smaller deployment packages, and writing functions in Node.js or Python (which have shorter cold starts than Java or .NET) are common optimisation strategies.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Event-driven:</strong> Lambda functions execute in response to triggers — not continuously running servers.</li>
<li><strong>Cold start:</strong> Latency added when Lambda initialises a new container for the first invocation.</li>
<li><strong>Execution role:</strong> An IAM role granting the Lambda function permissions to access other AWS services.</li>
<li><strong>API Gateway:</strong> A managed service that routes HTTP requests to Lambda functions — creates a serverless REST API.</li>
</ul>`,

  47: `<p>Elastic Beanstalk is a PaaS that automatically handles the deployment, capacity provisioning, load balancing, and monitoring of your application. You push your code and Beanstalk figures out the rest — useful for teams that want the flexibility of EC2 without the operational overhead. CloudFormation takes this further with Infrastructure as Code — you define your entire stack in a YAML or JSON template and AWS creates or updates it automatically.</p>
<p>Cloud costs can spiral quickly without active management. AWS Cost Explorer visualises spending patterns. Reserved Instances offer up to 72% discount over on-demand pricing for committed one or three-year usage. Spot Instances leverage AWS's spare capacity at up to 90% discount — ideal for fault-tolerant batch workloads that can handle interruption.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Elastic Beanstalk:</strong> Upload your app code and AWS handles the underlying infrastructure automatically.</li>
<li><strong>CloudFormation:</strong> Define all your AWS resources in a template file — infrastructure as code.</li>
<li><strong>Reserved Instance:</strong> Commit to 1 or 3 years of usage for up to 72% discount over on-demand pricing.</li>
<li><strong>Spot Instance:</strong> Unused EC2 capacity at up to 90% discount — can be interrupted with 2 minutes notice.</li>
</ul>`,

  // ── Course 9: React & Modern JavaScript ──────────────────────────────
  48: `<p>ES6 (released 2015) and subsequent versions transformed JavaScript from a scripting language into a powerful, expressive programming language. Arrow functions provide concise syntax and lexically bind <code>this</code> — eliminating one of JavaScript's most confusing quirks. Destructuring lets you extract values from objects and arrays in a single concise statement.</p>
<p>The module system (<code>import</code> / <code>export</code>) replaced the old pattern of polluting the global scope. Modules are the foundation of modern JavaScript bundlers like Vite and webpack, enabling tree-shaking (removing unused code) to keep bundle sizes small. Optional chaining (<code>?.</code>) and nullish coalescing (<code>??</code>) make defensive coding dramatically cleaner.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Arrow function:</strong> <code>const add = (a, b) => a + b</code> — shorter syntax and lexically bound <code>this</code>.</li>
<li><strong>Destructuring:</strong> <code>const { name, age } = user</code> — extract values from objects/arrays in one line.</li>
<li><strong>Optional chaining (<code>?.</code>):</strong> Access nested properties safely — returns undefined instead of throwing an error.</li>
<li><strong>Spread operator:</strong> <code>{ ...obj, newProp: val }</code> — creates a shallow copy with added or overridden properties.</li>
</ul>`,

  49: `<p>React is a library for building user interfaces from small, reusable pieces called components. Each component is a JavaScript function that returns JSX — a syntax that looks like HTML but is actually JavaScript. React maintains a virtual DOM (an in-memory copy of the real DOM) and updates only the parts of the page that actually changed, making UI updates efficient even in complex applications.</p>
<p>Props (properties) are how parent components pass data down to children — they are read-only inside the child. Lists of elements must include a <code>key</code> prop so React can track which items changed, were added, or were removed. Composition — building complex UIs from small, single-responsibility components — is the core architectural pattern in React.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>JSX:</strong> HTML-like syntax compiled to <code>React.createElement()</code> calls — not a template language, it is JavaScript.</li>
<li><strong>Props:</strong> Read-only data passed from parent to child component.</li>
<li><strong>Key prop:</strong> A unique identifier on list items that helps React efficiently update lists.</li>
<li><strong>Conditional rendering:</strong> Render different UI based on state — use <code>&&</code> for simple cases, ternary for if/else.</li>
</ul>`,

  50: `<p>Hooks are functions that let you use React features inside functional components. <code>useState</code> gives a component local state — when state changes, React re-renders the component. <code>useEffect</code> handles side effects (data fetching, subscriptions, timers) and runs after the component renders. Its cleanup function prevents memory leaks from subscriptions that outlive the component.</p>
<p>Custom hooks let you extract and reuse stateful logic across multiple components. A hook that fetches data, manages loading/error states, and returns the result can be shared between any component that needs it — without duplicating code. The rules of hooks are strict: only call hooks at the top level of a component or custom hook, never inside loops, conditions, or nested functions.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>useState:</strong> Returns <code>[value, setValue]</code> — calling <code>setValue</code> triggers a re-render with the new value.</li>
<li><strong>useEffect dependency array:</strong> Controls when the effect runs — empty <code>[]</code> means run once on mount only.</li>
<li><strong>useMemo:</strong> Memoises an expensive computed value — recalculates only when dependencies change.</li>
<li><strong>Custom hook:</strong> A function starting with "use" that calls other hooks — reusable stateful logic.</li>
</ul>`,

  51: `<p>React Router v6 enables client-side routing — navigating between pages without a full browser reload. Routes are declared with <code>&lt;Route&gt;</code> components; the URL determines which component renders. Dynamic segments (<code>/users/:id</code>) are accessed with the <code>useParams</code> hook. The <code>useNavigate</code> hook provides programmatic navigation — redirect after login, for example.</p>
<p>Fetching data from an API is a core skill in React. The <code>useEffect</code> hook fires after render, making it the right place for API calls. Always manage three states: loading (show a spinner), success (show the data), and error (show a message). React Query improves on manual data fetching by adding caching, background refetching, and automatic loading/error states.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>React Router v6:</strong> Uses <code>&lt;Routes&gt;</code> and <code>&lt;Route&gt;</code> components to map URLs to components.</li>
<li><strong>useParams:</strong> Returns URL parameters from dynamic route segments like <code>/courses/:id</code>.</li>
<li><strong>useNavigate:</strong> Programmatic navigation — call <code>navigate('/dashboard')</code> after a successful action.</li>
<li><strong>React Query:</strong> Manages server state — caching, background updates, and loading/error states out of the box.</li>
</ul>`,

  52: `<p>As applications grow, passing props through many layers of components ("prop drilling") becomes unwieldy. Context API solves this by creating a global value accessible to any component in the tree without passing it through every intermediate component. It is ideal for data that many components need — current user, theme, language preference.</p>
<p>Redux Toolkit (RTK) is the recommended way to use Redux — a predictable state container for large applications. State lives in a central store; components read from it via selectors and dispatch actions to modify it. RTK Query extends Redux Toolkit with a powerful data fetching and caching layer that eliminates much of the boilerplate of manual API integration.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Context API:</strong> Broadcasts a value to all components within a Provider without prop drilling.</li>
<li><strong>useReducer:</strong> Manages complex state transitions with a pure reducer function — like useState for complex state.</li>
<li><strong>Redux slice:</strong> An RTK concept grouping a reducer and its action creators together in one place.</li>
<li><strong>Selector:</strong> A function that reads and derives values from the Redux store — memoised with reselect for performance.</li>
</ul>`,

  53: `<p>Testing gives you confidence that your code works correctly and that future changes do not break existing features. React Testing Library (RTL) encourages testing from the user's perspective — interacting with elements by their accessible role or text rather than implementation details like CSS classes or component state. This makes tests resilient to refactoring.</p>
<p>Vite has largely replaced Create React App for new projects — it is dramatically faster in development thanks to native ES modules and only bundling what is actually imported. When deploying to production, Vite creates an optimised bundle with code splitting and tree-shaking. Platforms like Netlify and Vercel deploy React apps automatically from GitHub with zero configuration.</p>
<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>React Testing Library:</strong> Renders components in a virtual DOM and queries them the way a user would interact.</li>
<li><strong>jest.fn():</strong> Creates a mock function to verify it was called with the correct arguments.</li>
<li><strong>Code splitting:</strong> Breaks the bundle into chunks loaded on demand — improves initial page load time.</li>
<li><strong>Tree shaking:</strong> Removes unused exported code during the build — keeps the final bundle small.</li>
</ul>`,
};
