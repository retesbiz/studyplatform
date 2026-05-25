/* Rich term definitions for course module popups */
const TERM_DEFS = {

  /* ── CRYPTOGRAPHY ─────────────────────────────────────────────────────── */
  'plaintext': {
    def: 'Plaintext is the original, human-readable data before any encryption is applied. It can be text, images, binary data — anything that has not yet been scrambled by a cipher. The goal of encryption is to transform plaintext into ciphertext that is meaningless to anyone without the correct key. Protecting plaintext in memory and transit is a fundamental security concern.',
    example: 'For example, the message "Transfer £500 to Alice" is plaintext. After AES encryption with a secret key it becomes a string of seemingly random bytes that an eavesdropper cannot read.',
    tip: 'Never log or store plaintext passwords — hash them with bcrypt or Argon2 before touching the database.'
  },
  'ciphertext': {
    def: 'Ciphertext is the scrambled, unreadable output produced after a plaintext message has been encrypted with a key and algorithm. A strong cipher produces ciphertext that looks completely random and reveals nothing about the underlying plaintext, even if an attacker knows the algorithm used. The only way to recover the plaintext is to decrypt with the correct key.',
    example: 'For example, encrypting "Hello" with AES-256-GCM produces a block of random-looking bytes — no part of the word "Hello" is recognisable in the output.',
    tip: 'Ciphertext integrity must also be protected — without authentication (e.g. GCM mode), an attacker can flip bits in the ciphertext to alter the decrypted plaintext in predictable ways.'
  },
  'encryption': {
    def: 'Encryption is the process of transforming readable plaintext into unreadable ciphertext using a mathematical algorithm and a secret key. It ensures confidentiality — only parties with the correct key can recover the original data. Modern encryption relies on mathematical problems (factoring large numbers, discrete logarithms) that are computationally infeasible to solve without the key.',
    example: 'For example, HTTPS encrypts all data between your browser and a web server using TLS, so that anyone intercepting the traffic sees only meaningless ciphertext.',
    tip: 'Encryption alone does not guarantee integrity — combine it with a MAC or use an AEAD mode like AES-GCM so tampering is detected.'
  },
  'decryption': {
    def: 'Decryption is the reverse of encryption — recovering the original plaintext from ciphertext using the correct key and algorithm. In symmetric encryption the same key is used for both operations. In asymmetric encryption, what one key encrypts only the paired key can decrypt. Without the correct key, decryption produces garbage output.',
    example: 'For example, when your email client fetches an encrypted message, it decrypts the stored ciphertext using your private key to display readable text.',
    tip: 'Always verify the integrity of ciphertext before decrypting — decrypting tampered data can leak information through timing side-channels (padding oracle attacks).'
  },
  'key': {
    def: 'A cryptographic key is a secret value (a number) that controls the behaviour of an encryption or authentication algorithm. The security of a cryptosystem depends entirely on keeping the key secret — not on hiding the algorithm (Kerckhoffs Principle). Keys must be generated using a cryptographically secure random number generator and stored securely, never hardcoded in source code.',
    example: 'For example, an AES-256 key is 256 bits (32 bytes) of random data. Losing this key means permanently losing access to the encrypted data.',
    tip: 'Never hardcode keys in source code — use environment variables or a dedicated secrets manager like AWS Secrets Manager or HashiCorp Vault.'
  },
  'symmetric encryption': {
    def: 'Symmetric encryption uses a single shared secret key for both encrypting and decrypting data. It is extremely fast and efficient, making it the standard for encrypting bulk data — files, database records, and network streams. The fundamental challenge is key distribution: both parties must securely agree on the same secret key before they can communicate, which requires a separate secure channel.',
    example: 'For example, AES is a symmetric cipher. When you encrypt a file with a password, that password is derived into a symmetric key that both encrypts and decrypts the file.',
    tip: 'Use AES-256-GCM for new systems. Never use ECB mode — it leaks patterns because identical plaintext blocks produce identical ciphertext blocks.'
  },
  'asymmetric encryption': {
    def: 'Asymmetric encryption uses a mathematically linked key pair: a public key (shared freely) and a private key (never shared). Data encrypted with the public key can only be decrypted by the private key, and vice versa. This elegantly solves the key distribution problem of symmetric encryption. However, asymmetric operations are 100-1000x slower than symmetric ones, so in practice asymmetric crypto is used to exchange a symmetric session key.',
    example: 'For example, RSA asymmetric encryption is used in TLS to securely transmit an AES session key at the start of a connection. All subsequent data is encrypted symmetrically.',
    tip: 'RSA key sizes below 2048 bits are insecure — use 2048 or 4096 bits for RSA, or switch to ECC where 256-bit keys give equivalent security to 3072-bit RSA.'
  },
  'hash function': {
    def: 'A cryptographic hash function takes any input of any size and produces a fixed-size output (the hash or digest) that appears random. Hash functions are one-way — given the hash, you cannot recover the original input. They are deterministic — the same input always produces the same hash. A tiny change in input (one bit) completely changes the output (avalanche effect). Used for integrity verification, password storage, and digital signatures.',
    example: 'For example, SHA-256("Hello") always produces the same 256-bit hex digest. If a downloaded file\'s computed hash matches the published hash, the file has not been tampered with.',
    tip: 'Never use MD5 or SHA-1 for security purposes — they have known collision attacks. Use SHA-256 or SHA-3 for integrity, and bcrypt/Argon2 for password hashing.'
  },
  'digital signature': {
    def: 'A digital signature is a cryptographic mechanism that proves a message was created by a specific private key holder and has not been altered. The signer hashes the message and encrypts the hash with their private key. Anyone with the public key can verify it by decrypting the signature and comparing the hash. Digital signatures provide authentication, integrity, and non-repudiation in a single operation.',
    example: 'For example, software vendors sign their releases with a digital signature. Before installing, your OS verifies the signature against the vendor\'s public key, ensuring the installer has not been tampered with.',
    tip: 'Digital signatures authenticate the sender — they do not encrypt the message. For both confidentiality AND authentication, combine a signature with encryption.'
  },
  'caesar cipher': {
    def: 'The Caesar cipher is one of the oldest and simplest encryption techniques, named after Julius Caesar who used it around 50 BC. It works by shifting each letter of the alphabet by a fixed number of positions. For example, with a shift of 3, A becomes D, B becomes E. There are only 25 possible shifts, making it trivially broken by trying all of them (brute force) or by frequency analysis — counting which letters appear most often.',
    example: 'For example, "HELLO" with a shift of 3 becomes "KHOOR". An attacker who suspects a Caesar cipher can crack it in seconds by trying all 25 possible shifts.',
    tip: 'Never use classical ciphers for real security — they fail because they do not achieve confusion or diffusion, the two properties all modern ciphers guarantee.'
  },
  'enigma machine': {
    def: 'The Enigma machine was an electromechanical cipher device used by Nazi Germany in WWII to encrypt military communications. It used rotating mechanical rotors that substituted letters in a complex, changing pattern — each keypress advanced the rotors, making the substitution different for every letter. Despite its complexity, Enigma had a fatal flaw: a letter could never be encrypted as itself. Alan Turing and the team at Bletchley Park exploited this and other weaknesses to crack it, significantly contributing to the Allied victory.',
    example: 'For example, if Enigma encrypted "A" as "G" at one position, then "G" would decrypt to "A" — this self-inverse property, combined with known cribs (plaintext guesses), allowed codebreakers to deduce rotor settings.',
    tip: 'The lesson from Enigma: complexity in a cipher does not equal security — mathematical analysis always finds patterns if the underlying design is flawed.'
  },
  'des': {
    def: 'DES (Data Encryption Standard) was the first widely standardised symmetric cipher, published by NIST in 1977. It uses 64-bit blocks and a 56-bit key. By 1999, specialised hardware cracked DES in under 22 hours by exhausting all 2^56 possible keys. The key was simply too short for modern hardware. DES is now completely obsolete and must never be used in new systems. Triple-DES (3DES) applied DES three times but is also deprecated.',
    example: 'For example, the EFF\'s "Deep Crack" machine in 1998 broke a DES key in 56 hours; by 1999 it was down to 22 hours, making clear that DES was dead for security.',
    tip: 'Both DES and 3DES are formally deprecated by NIST. Replace any usage with AES-256 immediately.'
  },
  'aes': {
    def: 'AES (Advanced Encryption Standard) is the global standard symmetric block cipher, selected by NIST in 2001 after a five-year public competition. It operates on 128-bit blocks and supports three key sizes: 128-bit (10 rounds), 192-bit (12 rounds), and 256-bit (14 rounds). Each round applies SubBytes, ShiftRows, MixColumns, and AddRoundKey transformations, achieving strong confusion and diffusion. AES-256 is used by the US government to protect TOP SECRET information and has withstood decades of cryptanalysis.',
    example: 'For example, WhatsApp, Signal, and virtually every HTTPS connection on the internet encrypt data using AES in GCM mode.',
    tip: 'Always use AES-GCM (an AEAD mode) for new systems — it provides encryption and authentication in one step. Never use AES-ECB, which leaks patterns catastrophically.'
  },
  'rsa': {
    def: 'RSA (Rivest-Shamir-Adleman) is the most widely used asymmetric encryption algorithm, published in 1977. Its security relies on the mathematical difficulty of factoring the product of two large prime numbers. A public key (n, e) is derived from two secret primes; the private key (n, d) is kept secret. RSA is used for key exchange, digital signatures, and encrypting small amounts of data. It is computationally expensive compared to symmetric ciphers.',
    example: 'For example, when your browser connects to a bank website, RSA or ECDH is used during the TLS handshake to securely exchange an AES session key without ever transmitting it in the clear.',
    tip: 'RSA key sizes below 2048 bits are broken. Use 2048 minimum, or better yet switch to ECC (ECDSA/ECDH) for equivalent security with much smaller keys.'
  },
  'ecc': {
    def: 'Elliptic Curve Cryptography (ECC) is a form of asymmetric cryptography based on the algebraic structure of elliptic curves over finite fields. ECC achieves the same security level as RSA with dramatically smaller key sizes — a 256-bit ECC key provides equivalent security to a 3072-bit RSA key. Smaller keys mean faster operations, lower bandwidth usage, and less power consumption — ideal for mobile and IoT devices.',
    example: 'For example, TLS 1.3 uses ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) with Curve25519 for key exchange — faster and more secure than equivalent RSA.',
    tip: 'Use Curve25519 (X25519 for key exchange, Ed25519 for signatures) — it is modern, fast, and free from the concerns about NIST curves potentially having backdoors.'
  },
  'sha-256': {
    def: 'SHA-256 (Secure Hash Algorithm 256-bit) is a member of the SHA-2 family, producing a 256-bit (32-byte) hash digest. It is the most widely used cryptographic hash function today — used in TLS certificates, code signing, blockchain (Bitcoin), password storage as a component of PBKDF2/HMAC, and file integrity checks. SHA-256 is considered secure against all known attacks — no practical collision has been found.',
    example: 'For example, every Bitcoin transaction is identified by its SHA-256 hash, and each block in the blockchain contains the SHA-256 hash of the previous block, creating a tamper-evident chain.',
    tip: 'SHA-256 alone is not safe for password storage — use it inside bcrypt or Argon2, which add a salt and are deliberately slow to resist brute-force attacks.'
  },
  'md5': {
    def: 'MD5 (Message Digest 5) is a widely used but now completely broken hash function that produces a 128-bit digest. Practical collision attacks against MD5 have been known since 2004 — two different files can be crafted to produce the same MD5 hash. MD5 must never be used for security purposes. It remains acceptable only for non-security checksums like detecting accidental file corruption.',
    example: 'For example, in 2012 the Flame malware forged a Microsoft code-signing certificate by exploiting MD5 collisions, allowing it to masquerade as a legitimate Windows update.',
    tip: 'Replace any MD5 usage in security contexts immediately — use SHA-256 for integrity checks, bcrypt or Argon2 for password hashing.'
  },
  'hmac': {
    def: 'HMAC (Hash-based Message Authentication Code) combines a cryptographic hash function with a secret key to produce an authentication tag. Unlike a plain hash, an HMAC can only be verified by someone who holds the secret key, providing both integrity (data has not changed) and authenticity (it was created by the key holder). HMAC-SHA256 is widely used in API authentication, JWT signing, and secure cookie verification.',
    example: 'For example, AWS signs every API request with HMAC-SHA256 using your secret key. The server recomputes the HMAC and rejects any request whose signature does not match.',
    tip: 'Use constant-time comparison when verifying HMACs — a timing side-channel can reveal whether the comparison is getting closer to matching, allowing an attacker to guess byte by byte.'
  },
  'kerckhoffs\'s principle': {
    def: 'Kerckhoffs\'s Principle, stated by Auguste Kerckhoffs in 1883, holds that a cryptosystem should remain secure even if everything about the system — except the key — is public knowledge. Security must come from the secrecy of the key alone, not from hiding the algorithm. Modern cryptography follows this principle: AES, RSA, and SHA-256 are all public standards that anyone can inspect, yet they remain secure.',
    example: 'For example, the Enigma machine was kept secret, but once the Allies captured one and understood the algorithm, they could decrypt all traffic. AES being public does not help attackers without the key.',
    tip: 'Security through obscurity always fails eventually — algorithms get leaked or reverse-engineered. Trust only in mathematically proven security, not in secrecy of design.'
  },
  'confidentiality': {
    def: 'Confidentiality is the property that ensures information is accessible only to authorised parties. It is the first pillar of the CIA Triad. Encryption is the primary technical mechanism for achieving confidentiality — transforming data so that anyone without the key sees only meaningless ciphertext. Access controls, need-to-know policies, and data classification also contribute to confidentiality.',
    example: 'For example, end-to-end encryption in Signal ensures confidentiality — even Signal\'s own servers cannot read your messages because they only ever see encrypted ciphertext.',
    tip: 'Confidentiality without integrity is dangerous — an attacker who cannot read your data may still be able to modify it in harmful ways without detection.'
  },
  'integrity': {
    def: 'Integrity is the assurance that data has not been altered, either accidentally or maliciously, between creation and receipt. Cryptographic hash functions and MACs are the technical tools for integrity. If a file\'s SHA-256 hash matches its published value, you know the file is identical to the original. TLS uses a MAC on every message to detect any tampering in transit.',
    example: 'For example, when you download software, the developer provides a SHA-256 checksum. You compute the hash of your downloaded file — if they match, no corruption or tampering occurred.',
    tip: 'Integrity protection must cover the entire message including headers — partial integrity leaves attackers able to manipulate the unprotected parts.'
  },
  'authentication': {
    def: 'Authentication in cryptography is the assurance that a message or entity is genuinely what it claims to be. It answers the question: "Who really sent this?" Digital signatures, certificates, and MACs provide cryptographic authentication. Multi-factor authentication (MFA) combines something you know, have, and are for stronger identity verification.',
    example: 'For example, when your browser connects to your bank, the server\'s TLS certificate — signed by a trusted Certificate Authority — authenticates that the server is genuinely your bank and not an impostor.',
    tip: 'Authentication and confidentiality are separate properties. Encryption hides data; authentication proves identity. You almost always need both — an encrypted message from an unverified sender is not trustworthy.'
  },
  'non-repudiation': {
    def: 'Non-repudiation is the cryptographic property that prevents a party from denying that they sent or received a message. Digital signatures achieve this: only the private key holder could have produced a valid signature, so they cannot later claim they did not sign it. Non-repudiation is essential in legal contracts, financial transactions, and audit logs where accountability is required.',
    example: 'For example, DocuSign uses digital signatures so that once you sign a contract electronically, you cannot later dispute having signed it — the signature is cryptographically bound to your private key.',
    tip: 'Non-repudiation requires careful key management — if a private key is stolen, an attacker can forge signatures in your name. Hardware security modules (HSMs) protect private keys from extraction.'
  },
  'cia triad': {
    def: 'The CIA Triad is the foundational model of information security, comprising three core objectives: Confidentiality (only authorised parties can read data), Integrity (data has not been altered), and Availability (systems are accessible when needed). Security controls are evaluated against how well they protect these three properties. A real attack typically violates at least one pillar.',
    example: 'For example, a ransomware attack violates Availability (you cannot access your files) and Integrity (files are encrypted/destroyed). A data breach primarily violates Confidentiality.',
    tip: 'Some frameworks add Non-repudiation as a fourth property. Consider all four when designing comprehensive security controls.'
  },
  'confusion': {
    def: 'Confusion is a property of a strong cipher that ensures the relationship between the key and the ciphertext is as complex as possible — changing a single bit of the key should affect many bits of the ciphertext in an unpredictable way. Confusion is primarily achieved by substitution (S-boxes in AES). Without confusion, statistical analysis of the ciphertext can reveal information about the key.',
    example: 'For example, AES achieves confusion through its SubBytes step, which replaces each byte with a value from a non-linear S-box lookup table, breaking simple patterns.',
    tip: 'Confusion and diffusion together (both required by Shannon\'s theorem) are what make modern ciphers resistant to statistical attacks.'
  },
  'diffusion': {
    def: 'Diffusion is a property of a strong cipher that spreads the influence of each plaintext bit across many bits of the ciphertext — ideally, flipping one plaintext bit changes approximately half of all ciphertext bits (the avalanche effect). Diffusion is primarily achieved by permutation. It makes statistical attacks on the plaintext infeasible because any pattern in the input is spread across the entire output.',
    example: 'For example, AES achieves diffusion through its ShiftRows and MixColumns steps. Changing one byte of the input affects every byte of the output within two rounds.',
    tip: 'A cipher with good diffusion ensures that identical blocks of plaintext produce different ciphertext blocks when even one bit of the key changes.'
  },
  'frequency analysis': {
    def: 'Frequency analysis is a cryptanalysis technique that exploits the statistical distribution of letters in natural language to break substitution ciphers. In English text, the letter E appears about 13% of the time, T about 9%, A about 8%, and so on. By counting which ciphertext characters appear most often and mapping them to the expected letter frequencies, an attacker can decode the cipher without knowing the key.',
    example: 'For example, if the most common character in a ciphertext is "X", a frequency analyst guesses X maps to E. They then use common bigrams (TH, HE, IN) to decode more letters, quickly unravelling the entire message.',
    tip: 'Frequency analysis is completely defeated by modern ciphers like AES, which produce output that is statistically indistinguishable from random data regardless of the input.'
  },
  'block cipher': {
    def: 'A block cipher encrypts data in fixed-size chunks called blocks. AES operates on 128-bit (16-byte) blocks. Each block is independently passed through multiple rounds of transformation. If a message is longer than one block, a mode of operation (ECB, CBC, CTR, GCM) is used to handle the multiple blocks securely. Block ciphers are the foundation of most symmetric encryption systems.',
    example: 'For example, encrypting a 1KB file with AES-128 breaks it into 64 blocks of 16 bytes each and encrypts them according to the chosen mode of operation.',
    tip: 'Never use ECB mode (the simplest block cipher mode) — it encrypts identical plaintext blocks to identical ciphertext blocks, revealing data patterns.'
  },
  'stream cipher': {
    def: 'A stream cipher generates a pseudorandom keystream and XORs it with the plaintext one bit or byte at a time. Stream ciphers are faster than block ciphers in software and simpler to implement in hardware with limited resources. The critical rule: never reuse the same key and nonce combination. XORing two ciphertexts encrypted with the same keystream reveals the XOR of the two plaintexts, completely compromising both.',
    example: 'For example, ChaCha20 is a stream cipher used in TLS 1.3 and WireGuard. It generates a keystream from a 256-bit key and 96-bit nonce, then XORs it byte-by-byte with the plaintext.',
    tip: 'The "reused nonce" vulnerability is catastrophic for stream ciphers — always use a fresh random nonce for each message and prefer AEAD modes that detect tampering.'
  },
  'gcm mode': {
    def: 'GCM (Galois/Counter Mode) is an authenticated encryption mode (AEAD) that combines CTR mode encryption with a Galois field polynomial authentication tag. It provides confidentiality, integrity, and authenticity in a single efficient operation. The 128-bit authentication tag detects any tampering with the ciphertext. GCM is parallelisable, fast with hardware acceleration, and is the recommended choice for new systems. It is used in TLS 1.3.',
    example: 'For example, AES-256-GCM encrypts a message and produces both the ciphertext and a 16-byte authentication tag. Any modification to the ciphertext in transit causes tag verification to fail at the receiver.',
    tip: 'Never reuse a nonce/IV with the same key in GCM mode — nonce reuse completely breaks both confidentiality and the authentication tag, an even worse failure than in other modes.'
  },
  'cbc mode': {
    def: 'CBC (Cipher Block Chaining) is a block cipher mode where each plaintext block is XORed with the previous ciphertext block before encryption, creating a chain of dependencies. It requires a random Initialisation Vector (IV) for the first block. CBC is sequential (cannot parallelise encryption), requires PKCS#7 padding, and has been vulnerable to padding oracle attacks (POODLE, BEAST). It is considered legacy and should not be used in new systems.',
    example: 'For example, the POODLE attack in 2014 exploited a padding oracle in CBC mode to decrypt HTTPS cookies, forcing the retirement of SSL 3.0 which relied on CBC.',
    tip: 'Replace any CBC usage with AES-GCM. If you must use CBC, ensure padding is validated in constant time to prevent padding oracle attacks.'
  },
  'ecb mode': {
    def: 'ECB (Electronic Codebook) is the simplest and most dangerous block cipher mode. Each block of plaintext is encrypted independently with the same key. This means identical plaintext blocks produce identical ciphertext blocks, catastrophically revealing patterns in the data. The famous "ECB Penguin" demonstration shows that encrypting a bitmap image with ECB preserves the visual outline of the original image.',
    example: 'For example, encrypting a database of user records with ECB mode means every user with the same password block will have the same ciphertext, making it trivial to identify accounts with common passwords.',
    tip: 'ECB mode must never be used. There is no legitimate use case for ECB in a security context — always use GCM, CBC, or CTR mode at minimum.'
  },
  'iv': {
    def: 'An Initialisation Vector (IV) or nonce (number used once) is a random value used alongside the key to ensure that encrypting the same plaintext twice produces different ciphertext. The IV does not need to be secret — it is typically transmitted alongside the ciphertext — but it must be unique (and in some modes, unpredictable) for each encryption operation with the same key. Reusing an IV with the same key is a critical vulnerability.',
    example: 'For example, in AES-GCM, a 96-bit random nonce is generated for each message. The receiver needs this nonce (sent alongside the ciphertext) to decrypt — but an eavesdropper learns nothing useful from seeing the nonce.',
    tip: 'Generate IVs with a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) — os.urandom() in Python, crypto.randomBytes() in Node.js. Never use a counter or timestamp as an IV.'
  },
  'forward secrecy': {
    def: 'Forward secrecy (Perfect Forward Secrecy, PFS) ensures that past session keys cannot be compromised even if the server\'s long-term private key is later stolen. It is achieved by generating a fresh ephemeral key pair for every session (ECDHE). Without forward secrecy, an attacker who records encrypted traffic today and later obtains the private key can decrypt all of it retroactively.',
    example: 'For example, if a server\'s RSA private key is stolen, static RSA key exchange allows decryption of all previously recorded TLS traffic. ECDHE prevents this — each session used a throwaway key that no longer exists.',
    tip: 'Ensure your TLS configuration prioritises ECDHE cipher suites and disables any static RSA key exchange suites to guarantee forward secrecy for all sessions.'
  },
  'tls': {
    def: 'TLS (Transport Layer Security) is the cryptographic protocol that secures communication over the internet — it is what makes HTTPS work. TLS provides confidentiality (AES encryption), integrity (HMAC or AEAD), and authentication (certificates) in a single protocol. TLS 1.3 (2018) removed all weak ciphers, mandates forward secrecy via ECDHE, and reduces the handshake to one round trip. TLS 1.0 and 1.1 are deprecated and disabled in modern browsers.',
    example: 'For example, when you visit https://example.com, TLS encrypts all data between your browser and the server, so an ISP or attacker on the network cannot read or modify it.',
    tip: 'Always enforce TLS 1.2 minimum and prefer TLS 1.3. Use HSTS to prevent SSL stripping attacks that downgrade HTTPS connections to plain HTTP.'
  },
  'certificate authority': {
    def: 'A Certificate Authority (CA) is a trusted organisation that issues digital certificates, vouching for the identity of website owners and organisations. When a CA signs a certificate, it is asserting that they have verified the identity of the certificate holder. Browsers and operating systems ship with a list of pre-trusted root CAs. If you trust the root CA, you transitively trust certificates it signed.',
    example: 'For example, Let\'s Encrypt is a free, automated CA that issues SSL certificates for websites. Your browser trusts Let\'s Encrypt because its root certificate is in your OS trust store.',
    tip: 'Certificate Transparency (CT) logs require CAs to publicly log every certificate they issue — this allows detection of mis-issued or rogue certificates within hours.'
  },
  'bcrypt': {
    def: 'bcrypt is a password hashing function designed in 1999 specifically for secure password storage. Unlike general-purpose hash functions, bcrypt is intentionally slow and includes a cost factor (work factor) that can be increased over time as hardware improves. It automatically generates and stores a random salt to prevent rainbow table attacks. bcrypt is widely considered the minimum acceptable standard for password hashing.',
    example: 'For example, bcrypt with a cost factor of 12 takes about 250ms to hash a password on modern hardware — trivial for a single login, but makes brute-forcing billions of passwords infeasible.',
    tip: 'Use a cost factor of at least 10-12. Prefer Argon2id over bcrypt for new systems — it is the winner of the Password Hashing Competition and is more resistant to GPU attacks.'
  },
  'argon2': {
    def: 'Argon2 is the winner of the 2015 Password Hashing Competition and is the recommended algorithm for hashing passwords. It is designed to be memory-hard (requiring large amounts of RAM), which defeats GPU and ASIC-based brute-force attacks. Three variants exist: Argon2i (side-channel resistant), Argon2d (fastest, GPU resistant), and Argon2id (the recommended hybrid combining both). It has configurable time cost, memory cost, and parallelism.',
    example: 'For example, Django uses Argon2 as its recommended password hasher. An attacker who steals the database still faces a computationally expensive task to crack each individual password.',
    tip: 'Argon2id with memory=64MB, iterations=3 is a good starting configuration for web applications. Increase memory cost as server hardware improves over time.'
  },
  'rainbow table': {
    def: 'A rainbow table is a precomputed lookup table mapping common passwords to their hash values, used to quickly crack stolen password hashes. Instead of hashing each guess at attack time, the attacker precomputes millions of hashes offline and stores them. Looking up a stolen hash in the table instantly reveals the password. Salting defeats rainbow tables entirely — a unique random salt means a separate table would be needed for every user.',
    example: 'For example, an attacker who steals a database of unsalted MD5 password hashes can crack the majority in seconds using a rainbow table downloaded freely from the internet.',
    tip: 'Salting completely defeats rainbow tables. Always use bcrypt or Argon2 — they salt automatically. Never implement your own password hashing scheme.'
  },

  /* ── WEB SECURITY ─────────────────────────────────────────────────────── */
  'sql injection': {
    def: 'SQL injection (SQLi) is a code injection attack where malicious SQL code is inserted into an input field that is concatenated directly into a database query. Because the database cannot distinguish injected SQL from legitimate query structure, the attacker can bypass authentication, read arbitrary data, modify records, and in some configurations execute OS commands. SQLi is consistently one of the top web vulnerabilities and has caused some of the largest data breaches in history.',
    example: 'For example, a login query built as `"SELECT * FROM users WHERE email=\'" + input + "\'"` can be exploited by entering `\' OR \'1\'=\'1` as the email, making the query return all users and bypassing authentication.',
    tip: 'Always use parameterised queries (prepared statements) — they completely prevent SQLi by separating code from data. Input validation and WAFs are supplementary controls, not replacements.'
  },
  'xss': {
    def: 'Cross-Site Scripting (XSS) is an attack where malicious JavaScript is injected into a web page viewed by other users. Stored XSS saves the payload in the database — every subsequent visitor runs the attacker\'s code. Reflected XSS embeds the payload in a URL that a victim clicks. DOM-based XSS manipulates the page client-side. XSS can steal session cookies, redirect users, log keystrokes, and perform actions on behalf of victims.',
    example: 'For example, a comment field that renders user input as raw HTML allows an attacker to post a script tag that sends every visitor\'s session cookie to an attacker-controlled server.',
    tip: 'Use textContent instead of innerHTML when inserting user data into the DOM. Implement a strict Content Security Policy (CSP) to block execution of any injected scripts.'
  },
  'csrf': {
    def: 'Cross-Site Request Forgery (CSRF) tricks an authenticated user\'s browser into sending a forged request to a web application without their knowledge. Because browsers automatically send cookies, the server cannot distinguish a legitimate request from a forged one. An attacker on a malicious page can silently transfer money, change email addresses, or perform any action the victim is authorised to do.',
    example: 'For example, a malicious page contains an image tag whose src points to a bank transfer URL. When a logged-in bank customer visits, their browser sends the transfer request with their session cookie attached.',
    tip: 'The best defences are SameSite=Strict cookies (prevents cross-origin requests from including cookies) and synchroniser CSRF tokens (a secret value in every form that the server verifies).'
  },
  'owasp top 10': {
    def: 'The OWASP Top 10 is a regularly updated list of the ten most critical web application security risks, published by the Open Web Application Security Project. It is the most widely recognised web security awareness document and influences security standards, developer training, and compliance frameworks globally. The current 2021 edition covers: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Authentication Failures, Software Integrity Failures, Logging Failures, and SSRF.',
    example: 'For example, the 2021 list moved Broken Access Control to number 1, reflecting data showing 94% of tested applications had some form of broken access control vulnerability.',
    tip: 'Use the OWASP Top 10 as a training and checklist tool. Supplement it with OWASP ASVS (Application Security Verification Standard) for a comprehensive security requirements framework.'
  },
  'parameterised query': {
    def: 'A parameterised query (prepared statement) separates SQL code from user-supplied data. The query structure is sent to the database first with placeholder symbols (? or :name), and the actual data values are sent separately. The database treats data values as literal data — never as SQL code — making SQL injection structurally impossible regardless of what the user inputs. This is the single most effective defence against SQL injection.',
    example: 'For example, `db.query("SELECT * FROM users WHERE email = ?", [userInput])` is safe regardless of what userInput contains — even `\' OR \'1\'=\'1` is treated as a literal string, not SQL.',
    tip: 'Parameterised queries are the only reliable defence against SQL injection. ORMs use them by default, but raw string concatenation in query builders can still introduce vulnerabilities.'
  },
  'csp': {
    def: 'Content Security Policy (CSP) is an HTTP response header that instructs browsers which sources of content (scripts, styles, images, fonts) are allowed to load on a page. A strict CSP prevents XSS attacks by blocking inline scripts and restricting script loading to trusted origins. It is one of the most powerful browser-enforced security controls and is considered a mandatory defence-in-depth layer for modern web applications.',
    example: 'For example, `Content-Security-Policy: default-src \'self\'; script-src \'self\' https://cdn.example.com` blocks all scripts except those from the same origin or the listed CDN.',
    tip: 'Start with a Report-Only CSP to identify violations without breaking the site, then tighten and enforce it. Avoid unsafe-inline and unsafe-eval in your policy.'
  },
  'hsts': {
    def: 'HTTP Strict Transport Security (HSTS) is a security header that instructs browsers to only connect to a domain over HTTPS, never HTTP, for a specified duration. It prevents SSL stripping attacks where a man-in-the-middle downgrades an HTTPS connection to HTTP. Once a browser has seen the HSTS header, it refuses all plain HTTP connections to that domain for the specified max-age period — even before the TLS handshake.',
    example: 'For example, `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` tells browsers to use HTTPS exclusively for one year across all subdomains.',
    tip: 'Submit your domain to the HSTS preload list at hstspreload.org so browsers enforce HTTPS even on the very first visit, before they have received the header from the server.'
  },
  'idor': {
    def: 'Insecure Direct Object Reference (IDOR) is a type of broken access control where an application uses user-controllable input (an ID, filename, or key) to access objects without verifying the requestor is authorised. An attacker changes the value to access another user\'s data. IDOR is one of the most common and impactful vulnerabilities in APIs and web applications, often enabling mass data exfiltration.',
    example: 'For example, `GET /api/invoices/1042` returns an invoice. If the server does not check that invoice 1042 belongs to the authenticated user, an attacker can enumerate IDs to access all other users\' invoices.',
    tip: 'Enforce object-level authorisation on every single request — verify that the authenticated user has permission to access the specific resource, not just that they are logged in.'
  },
  'rate limiting': {
    def: 'Rate limiting restricts how many requests a client can make to an API or endpoint within a time window. It prevents brute-force attacks (trying thousands of passwords), credential stuffing, enumeration attacks, and denial-of-service via excessive requests. Well-implemented rate limiting returns 429 Too Many Requests with a Retry-After header when the limit is exceeded.',
    example: 'For example, limiting login attempts to 5 per minute per IP address prevents an attacker from automatically trying millions of password combinations against user accounts.',
    tip: 'Apply rate limiting at the API gateway or reverse proxy level so it cannot be bypassed even if the application server is scaled horizontally.'
  },
  'cors': {
    def: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls which origins can make cross-origin HTTP requests. By default, browsers block JavaScript from making requests to a different domain (same-origin policy). CORS headers on the server explicitly permit specific origins. Overly permissive CORS (`Access-Control-Allow-Origin: *`) exposes APIs to cross-site request attacks when combined with credentials.',
    example: 'For example, a React app at app.example.com needs to call api.example.com. The API server must respond with `Access-Control-Allow-Origin: https://app.example.com` for the browser to allow the request.',
    tip: 'Never use Access-Control-Allow-Origin: * for APIs that handle authenticated requests — use a specific whitelist of allowed origins instead.'
  },
  'clickjacking': {
    def: 'Clickjacking is an attack where a malicious site embeds a target website in a transparent iframe, overlaying it over a fake UI. The victim thinks they are clicking on the fake UI, but their click lands on a button in the hidden target site, performing an unintended action. Clickjacking is prevented by the `X-Frame-Options` header or the CSP `frame-ancestors` directive, which prevent the page from being embedded in iframes.',
    example: 'For example, a malicious site overlays a transparent "Like" button from a social network over a fake "Win a prize" button. The user clicks what they think is the prize button but actually clicks the Like button.',
    tip: 'Set `X-Frame-Options: DENY` or `Content-Security-Policy: frame-ancestors \'none\'` to prevent your pages from being embedded in iframes on other origins.'
  },

  /* ── DATABASES ────────────────────────────────────────────────────────── */
  'index': {
    def: 'A database index is a data structure (typically a B-tree) that allows the database engine to find rows matching a WHERE condition without scanning every record in the table. Without an index, the database performs a full table scan — reading every row — whose cost grows linearly with data size. A well-placed index can reduce query time from minutes to milliseconds for large tables. Indexes consume storage and slow down write operations.',
    example: 'For example, a users table with 10 million rows and no index on the email column requires reading all 10 million rows to find one user. An index on email finds it in microseconds via a B-tree lookup.',
    tip: 'Add indexes on columns frequently used in WHERE, JOIN, and ORDER BY clauses. Avoid over-indexing — every write must update all indexes, creating overhead on write-heavy tables.'
  },
  'b-tree': {
    def: 'A B-tree (Balanced Tree) is the data structure underlying most database indexes. It organises keys in a sorted, self-balancing tree where all leaf nodes are at the same depth. Lookups, insertions, and deletions all take O(log n) time. B-tree indexes are ideal for range queries (BETWEEN, less-than, greater-than) and equality lookups. Most SQL databases — MySQL InnoDB, PostgreSQL, SQL Server — use B-trees for their default indexes.',
    example: 'For example, a B-tree index on a price column allows a range query (WHERE price BETWEEN 100 AND 200) to navigate directly to the 100 leaf node and scan forward to 200, reading only the relevant rows.',
    tip: 'B-tree indexes do not help with LIKE queries that start with a wildcard (LIKE \'%word\'). For full-text search use a full-text index or a dedicated search engine like Elasticsearch.'
  },
  'transaction': {
    def: 'A database transaction is a group of SQL operations treated as a single atomic unit — they either all succeed or all fail together. Transactions guarantee that the database never ends up in a partially updated, inconsistent state. They are defined by the ACID properties: Atomicity, Consistency, Isolation, and Durability. Transactions are critical for any operation involving multiple related changes, such as financial transfers.',
    example: 'For example, a bank transfer requires debiting one account AND crediting another. Wrapping both in a transaction ensures that if the credit fails, the debit is automatically rolled back — money is never lost or created.',
    tip: 'Keep transactions as short as possible — long-running transactions hold locks and cause contention in high-concurrency systems. Perform all computation outside the transaction and only put data changes inside.'
  },
  'acid': {
    def: 'ACID is the set of properties that guarantee reliable database transactions: Atomicity (all-or-nothing execution), Consistency (data moves from one valid state to another valid state), Isolation (concurrent transactions do not interfere with each other), and Durability (committed data survives crashes and restarts). These properties make relational databases trustworthy for financial, medical, and other critical data.',
    example: 'For example, PostgreSQL is fully ACID-compliant. If your server crashes mid-transaction, on restart it will roll back the incomplete transaction, ensuring no partial data is persisted.',
    tip: 'Choose your isolation level carefully — READ COMMITTED (PostgreSQL default) prevents dirty reads; SERIALIZABLE prevents all anomalies but has higher performance overhead.'
  },
  'normalisation': {
    def: 'Database normalisation is the process of organising a relational schema to reduce data redundancy and prevent update anomalies. It proceeds through normal forms: 1NF eliminates repeating groups, 2NF eliminates partial dependencies, 3NF eliminates transitive dependencies, and BCNF handles remaining edge cases. A well-normalised schema stores each fact exactly once, so updates only need to be made in one place.',
    example: 'For example, storing a customer\'s city and postcode in every order row is redundant. Normalising moves the address to a separate customers table referenced by a foreign key, so an address update is made in one place.',
    tip: 'Normalise your schema first, then deliberately denormalise specific tables where read performance is critical. Over-denormalisation leads to update anomalies where the same fact is stored inconsistently.'
  },
  'window function': {
    def: 'A SQL window function performs a calculation across a set of rows related to the current row without collapsing them into a single output row, unlike GROUP BY aggregation which loses individual rows. The window is defined by the OVER clause specifying how to partition and order rows. Common window functions include ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and running aggregates like SUM and AVG.',
    example: 'For example, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) assigns a rank to each employee within their department by salary, keeping every employee row in the result.',
    tip: 'Window functions are evaluated after WHERE and GROUP BY but before ORDER BY and LIMIT. You cannot filter on a window function result in the same query\'s WHERE clause — use a subquery or CTE.'
  },
  'join': {
    def: 'A SQL JOIN combines rows from two or more tables based on a related column. INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right (with NULLs where there is no match). RIGHT JOIN is the mirror. FULL OUTER JOIN returns all rows from both tables. Choosing the correct join type is fundamental — the wrong choice silently returns incorrect results.',
    example: 'For example, SELECT orders.id, customers.name FROM orders LEFT JOIN customers ON orders.customer_id = customers.id returns all orders including those with no matching customer (name will be NULL).',
    tip: 'An INNER JOIN on a non-indexed column causes a full table scan of both tables. Always ensure JOIN columns are indexed, especially when joining large tables.'
  },
  'deadlock': {
    def: 'A deadlock occurs when two or more transactions are each waiting for the other to release a lock, creating a circular dependency that neither can break. Transaction A holds a lock on table X and waits for table Y; Transaction B holds Y and waits for X. Most database engines automatically detect deadlocks and roll back one of the transactions (the victim) so the other can proceed.',
    example: 'For example, Transaction A locks row 1 then tries to lock row 2. Transaction B locks row 2 then tries to lock row 1. Both wait indefinitely unless the database detects the cycle and kills one transaction.',
    tip: 'Prevent deadlocks by always acquiring locks in a consistent order across all transactions, and keeping transactions short to minimise the time locks are held.'
  },
  'primary key': {
    def: 'A primary key is a column (or combination of columns) whose values uniquely identify each row in a table. Every table should have a primary key. The database enforces uniqueness and not-null constraints on the primary key and automatically creates an index on it. Using surrogate keys (auto-incremented integers or UUIDs) as primary keys is generally preferred over natural keys (email, phone number) which can change.',
    example: 'For example, an id column of type INT AUTO_INCREMENT is a common primary key — each new row gets a unique integer, and the database prevents duplicate IDs.',
    tip: 'For distributed systems where multiple servers insert rows simultaneously, use UUID v4 as primary keys to avoid collisions without coordinating auto-increment sequences across servers.'
  },
  'foreign key': {
    def: 'A foreign key is a column in one table that references the primary key of another table, establishing a relationship between the two tables. The database enforces referential integrity — you cannot insert a foreign key value that does not exist in the referenced table, and you cannot delete a referenced row without first handling the dependent rows (via CASCADE, SET NULL, or RESTRICT).',
    example: 'For example, an orders table with a customer_id column as a foreign key referencing customers.id ensures that every order is linked to a valid customer, preventing orphaned order records.',
    tip: 'Always define foreign key constraints in your schema — the database will catch data integrity violations that your application code might miss.'
  },

  /* ── MACHINE LEARNING ─────────────────────────────────────────────────── */
  'gradient descent': {
    def: 'Gradient descent is the optimisation algorithm used to train machine learning models. It iteratively adjusts model parameters (weights) in the direction that reduces the loss function. The gradient is the partial derivative of the loss with respect to each parameter — it points uphill, so gradient descent steps downhill. The learning rate controls step size: too large and it overshoots the minimum; too small and training is painfully slow.',
    example: 'For example, training a neural network involves computing the gradient of the loss across thousands of training examples, then nudging all weights slightly in the direction that reduces prediction error.',
    tip: 'Use the Adam optimiser for most neural networks — it adapts the learning rate per-parameter using running estimates of gradients and their squares, converging much faster than vanilla gradient descent.'
  },
  'overfitting': {
    def: 'Overfitting occurs when a model learns the training data too well — including its noise and random fluctuations — and fails to generalise to new unseen data. An overfit model has very low training error but high test error. It has essentially memorised the training set rather than learning the underlying patterns. Signs include a large gap between training accuracy and validation accuracy.',
    example: 'For example, a decision tree grown without depth limits can memorise every training example achieving 100% training accuracy, yet perform poorly on test data because it learned noise rather than patterns.',
    tip: 'Combat overfitting with: more training data, regularisation (L1/L2 weight penalty), dropout (neural networks), cross-validation to detect it early, and early stopping of training.'
  },
  'neural network': {
    def: 'A neural network is a machine learning model composed of layers of interconnected nodes (neurons). Data flows from the input layer through one or more hidden layers to the output layer. Each connection has a weight; the network learns by adjusting these weights using backpropagation to minimise prediction error. Deep neural networks with many hidden layers can learn extremely complex representations from raw data.',
    example: 'For example, an image classification neural network takes raw pixel values as input, learns to detect edges and shapes in early layers, and assembles these into object recognition in deeper layers.',
    tip: 'Start with a simpler model (logistic regression, random forest) before jumping to neural networks — they require much more data, tuning, and compute, and simpler models often match performance on tabular data.'
  },
  'backpropagation': {
    def: 'Backpropagation is the algorithm for training neural networks. After a forward pass computes predictions and a loss value, backpropagation applies the chain rule of calculus to compute the gradient of the loss with respect to every weight in the network, starting from the output layer and working backwards through each layer. These gradients are then used by gradient descent to update the weights.',
    example: 'For example, if a network predicts "cat" with 30% confidence when the true label is "cat", backprop assigns blame (gradient) to each layer\'s weights proportional to their contribution to the error.',
    tip: 'Vanishing gradients (gradients approaching zero in early layers) were solved by ReLU activations, batch normalisation, and residual connections (skip connections in ResNets).'
  },
  'random forest': {
    def: 'A random forest is an ensemble algorithm that builds many decision trees on random subsets of training data and features, then averages their predictions. This bagging approach reduces variance — individual trees overfit, but their average generalises well. Random forests handle high-dimensional data naturally, are robust to outliers, require minimal preprocessing, and provide feature importance scores showing which inputs matter most.',
    example: 'For example, a random forest with 500 trees for loan default prediction outperforms a single decision tree because mistakes by individual trees are cancelled out by correct predictions from the majority.',
    tip: 'Random forests are an excellent first model to try for tabular data — they rarely overfit badly, work well without feature scaling, and give interpretable feature importances.'
  },
  'linear regression': {
    def: 'Linear regression is a supervised learning algorithm that models the relationship between input features and a continuous numerical target by fitting a hyperplane. It minimises the Mean Squared Error between predictions and true values by finding optimal weights using gradient descent or a closed-form solution. It is simple, fast, and highly interpretable — each weight represents the expected change in output per unit change in that feature.',
    example: 'For example, predicting house price from size: price = 3000 * sqm + 50000. The coefficient 3000 means each additional square metre adds £3000 to the predicted price, and this relationship is directly readable from the model.',
    tip: 'Linear regression assumes a linear relationship between features and the target. For non-linear data, try polynomial features, gradient boosting, or neural networks.'
  },
  'overfitting': {
    def: 'Overfitting occurs when a machine learning model learns the training data too well — capturing noise and random fluctuations — and therefore fails to generalise to new data. The model has memorised rather than learned. It shows high training accuracy but poor test accuracy. This is the central challenge in machine learning: finding the right balance between fitting the training data and generalising.',
    example: 'For example, a polynomial regression model with degree 20 fitted to 10 training points will pass perfectly through all points yet produce wildly wrong predictions between them.',
    tip: 'Monitor the validation loss during training and stop when it begins to increase — this is early stopping, a simple and effective way to prevent overfitting.'
  },
  'cross-validation': {
    def: 'Cross-validation is a model evaluation technique that partitions data into k equal folds, trains the model k times (each time leaving one fold out as the test set), and averages the results. This gives a much more reliable estimate of generalisation performance than a single train/test split. K-fold cross-validation is the standard approach, with k=5 or k=10 being common choices.',
    example: 'For example, 5-fold cross-validation trains 5 models, each on 80% of data with a different 20% held out. The average test accuracy across all 5 folds is a robust estimate of real-world performance.',
    tip: 'For imbalanced classification, use stratified k-fold cross-validation to ensure each fold has the same class distribution as the full dataset.'
  },

  /* ── JAVASCRIPT & WEB DEV ─────────────────────────────────────────────── */
  'event loop': {
    def: 'The JavaScript event loop is the mechanism that enables asynchronous, non-blocking behaviour in a single-threaded language. JavaScript can only do one thing at a time. The event loop continuously checks the call stack and the callback queue: when the stack is empty, it moves the next callback from the queue onto the stack for execution. This allows I/O operations (network requests, timers) to happen without blocking the main thread.',
    example: 'For example, setTimeout(() => console.log("B"), 0) followed by console.log("A") prints A then B — the setTimeout callback goes to the queue even with 0ms delay and only runs after the current code finishes.',
    tip: 'Never block the event loop with synchronous heavy computation like large loops or file parsing. Use Web Workers for CPU-intensive tasks to keep the UI responsive.'
  },
  'promise': {
    def: 'A Promise is a JavaScript object representing the eventual completion or failure of an asynchronous operation. Instead of nested callbacks (callback hell), Promises provide .then() and .catch() methods for chaining asynchronous steps cleanly. A Promise is in one of three states: pending (initial), fulfilled (succeeded with a value), or rejected (failed with a reason). Promises are the foundation of async/await syntax.',
    example: 'For example, fetch("/api/data").then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err)) chains a network request, JSON parsing, and error handling cleanly.',
    tip: 'Always handle Promise rejections with .catch() or try/catch with async/await. Unhandled rejections crash Node.js processes and produce confusing silent failures in browsers.'
  },
  'async/await': {
    def: 'Async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code. An async function always returns a Promise. The await keyword pauses execution of the async function until the awaited Promise resolves, without blocking the event loop. Error handling uses standard try/catch blocks, making asynchronous code dramatically easier to read, write, and debug.',
    example: 'For example, async function getUser(id) { const res = await fetch("/api/users/" + id); return await res.json(); } reads as clearly as synchronous code but is fully non-blocking.',
    tip: 'Use Promise.all([p1, p2, p3]) when running multiple independent async operations — it runs them in parallel rather than sequentially, dramatically improving performance for concurrent fetches.'
  },
  'closure': {
    def: 'A closure is a function that retains access to variables from its enclosing scope even after the outer function has returned. The inner function "closes over" those variables, keeping them alive in memory. Closures are fundamental to JavaScript and enable factory functions, memoisation, private state simulation, and event handlers with captured context.',
    example: 'For example, function makeCounter() { let n=0; return () => ++n; } — the returned arrow function closes over n. Each call to makeCounter() creates a separate counter with its own private n variable.',
    tip: 'The classic loop closure bug (for (var i=0; i<3; i++) setTimeout(() => console.log(i)) prints 3,3,3) is solved by using let (block-scoped) instead of var, creating a new binding per iteration.'
  },
  'virtual dom': {
    def: 'The Virtual DOM is React\'s in-memory representation of the actual browser DOM. When state changes, React re-renders components to a new virtual DOM tree, then diffs it against the previous tree (reconciliation) to find the minimum set of actual DOM mutations needed. This batching and minimisation avoids expensive browser operations — direct DOM manipulation triggers layout and repaint cycles that are slow.',
    example: 'For example, if a list of 1000 items has one item\'s text changed, React\'s diffing algorithm identifies only that one text node needs updating in the real DOM, rather than re-rendering all 1000 items.',
    tip: 'Always provide stable, unique key props to list items — React uses keys during diffing to identify which items changed, moved, or were removed. Using array index as key causes bugs when items are reordered.'
  },
  'usestate': {
    def: 'useState is a React Hook that adds local state to a functional component. It returns a pair: the current state value and a setter function. Calling the setter triggers a re-render with the new state value. State updates are asynchronous and batched — reading state immediately after calling the setter returns the old value, not the new one.',
    example: 'For example, const [count, setCount] = useState(0) creates a counter. A button with onClick={() => setCount(count + 1)} increments it on click, and React re-renders the component with the updated count.',
    tip: 'When new state depends on old state, use the functional updater form: setCount(prev => prev + 1). This avoids stale closure bugs in async callbacks that capture an outdated count value.'
  },
  'useeffect': {
    def: 'useEffect is a React Hook for performing side effects in functional components — data fetching, subscriptions, DOM manipulation, and timers. It runs after every render by default. The dependency array controls when it re-runs: empty [] means only on mount, [value] means whenever value changes. The optional cleanup function prevents memory leaks by cancelling subscriptions or clearing timers when the component unmounts.',
    example: 'For example, useEffect(() => { fetchUser(id).then(setUser); }, [id]) fetches user data whenever the id prop changes, and React automatically aborts the previous fetch and starts a new one.',
    tip: 'Returning a cleanup function from useEffect is essential for subscriptions and event listeners — forgetting it causes memory leaks when components unmount and remount.'
  },
  'jsx': {
    def: 'JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup directly in JavaScript code. It is not a string or actual HTML — it is syntactic sugar that Babel compiles to React.createElement() calls. JSX makes component templates readable and co-located with their logic. JavaScript expressions are embedded using curly braces {}.',
    example: 'For example, the JSX expression <button className="btn" onClick={handleClick}>{label}</button> compiles to React.createElement("button", {className:"btn", onClick:handleClick}, label) — pure JavaScript.',
    tip: 'JSX uses className instead of class (reserved word in JS) and htmlFor instead of for. All tags must be closed — use self-closing syntax for tags without children: <input /> not <input>.'
  },
  'component': {
    def: 'A React component is a reusable, self-contained unit of UI that accepts props (inputs) and returns JSX (UI description). Components are the fundamental building blocks of React applications — the entire UI is composed of a tree of components. Functional components are the modern standard; class components are legacy. Components should follow the single responsibility principle.',
    example: 'For example, a Button component takes label, onClick, and disabled props and renders a styled button element — it can be reused anywhere in the app with different props without duplicating markup.',
    tip: 'Keep components small and focused. If a component has too many responsibilities, split it. A good rule of thumb: if a component is longer than 100 lines, consider extracting parts of it.'
  },
  'props': {
    def: 'Props (properties) are the inputs to a React component — data and functions passed from a parent component to a child. Props are read-only; a component must never modify its own props. They flow downward through the component tree (unidirectional data flow). When props change, React re-renders the component. Children content passed between opening and closing tags is accessible as props.children.',
    example: 'For example, <UserCard name="Alice" role="Admin" /> passes name and role as props to the UserCard component, which renders them. The parent controls the values.',
    tip: 'Prop drilling (passing props through many layers of intermediate components) is a sign you may need Context API or a state management solution.'
  },

  /* ── CLOUD & NETWORKING ───────────────────────────────────────────────── */
  'osi model': {
    def: 'The OSI (Open Systems Interconnection) model divides network communication into 7 abstract layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer handles a specific aspect of communication. The model is used for understanding, troubleshooting, and designing network protocols. In practice, the TCP/IP model\'s 4-layer abstraction (Network Access, Internet, Transport, Application) is what the internet actually implements.',
    example: 'For example, a firewall operates at Layer 3 (IP addresses) and Layer 4 (ports). A WAF inspects Layer 7 HTTP content. TLS operates at Layer 4-5, encrypting the transport.',
    tip: 'Use the OSI model as a diagnostic framework when troubleshooting: isolate which layer the problem is at — is there physical connectivity? Is the IP route correct? Is the port open? Is the application responding?'
  },
  'tcp': {
    def: 'TCP (Transmission Control Protocol) is the connection-oriented transport protocol providing reliable, ordered, error-checked delivery of a byte stream. Before data transfer, TCP performs a three-way handshake (SYN, SYN-ACK, ACK) to establish a connection. Lost packets are automatically retransmitted. TCP is used by HTTP, HTTPS, SMTP, SSH, and most application protocols requiring reliable delivery.',
    example: 'For example, when you load a webpage over HTTPS, your browser establishes a TCP connection to the server, and any lost packets are retransmitted automatically before the browser receives the complete response.',
    tip: 'TCP reliability comes at a latency cost. For real-time applications (video games, live video, DNS), UDP\'s lower latency often outweighs TCP\'s reliability guarantees — use UDP with application-level loss handling.'
  },
  'firewall': {
    def: 'A firewall monitors and controls network traffic based on predefined security rules. Stateless firewalls inspect individual packets in isolation based on source IP, destination IP, and port. Stateful firewalls track the state of active connections and make smarter decisions, such as allowing return traffic for established connections. Next-Generation Firewalls add deep packet inspection, application awareness, and intrusion prevention.',
    example: 'For example, a firewall rule that denies all inbound traffic to port 22 except from a specific corporate IP range restricts SSH access, dramatically reducing the attack surface.',
    tip: 'Default-deny is the correct firewall posture — block all traffic and explicitly allow only what is needed. Default-allow (permitting everything not blocked) is how breaches happen.'
  },
  'vpn': {
    def: 'A VPN (Virtual Private Network) creates an encrypted tunnel over an untrusted network (like the internet), making remote users appear to be on the same private network as the VPN server. It protects data from eavesdropping on untrusted networks and allows secure remote access to corporate resources. Modern VPN protocols include WireGuard (fast, modern, minimal), OpenVPN (open source, battle-tested), and IPSec (enterprise standard).',
    example: 'For example, a remote worker connects to their company VPN before accessing internal applications. All their traffic is encrypted and routed through the corporate network, as if they were sitting in the office.',
    tip: 'Split tunnelling routes only corporate traffic through the VPN, improving performance. But it exposes corporate resources if the user\'s device is compromised — full-tunnel VPN is more secure for sensitive environments.'
  },
  'ec2': {
    def: 'EC2 (Elastic Compute Cloud) is AWS\'s virtual machine service. You rent virtualised compute capacity on demand — choosing CPU, RAM, storage, and network performance. Key concepts include AMIs (machine images used to launch instances), instance types (t3, m5, c5 families with different CPU/RAM ratios), Security Groups (stateful virtual firewalls), and Elastic IPs (persistent public IP addresses). You pay per second of runtime.',
    example: 'For example, a startup can launch a t3.micro EC2 instance for under $10/month to run a web server, scale to m5.xlarge during peak traffic, and terminate it when not needed — no hardware investment required.',
    tip: 'Use Security Groups with least-privilege rules — only open the exact ports needed (80/443 for web, 22 for SSH from your IP only). Never open SSH (port 22) to 0.0.0.0/0.'
  },
  's3': {
    def: 'Amazon S3 (Simple Storage Service) is AWS\'s object storage service. You store files (objects) in buckets and retrieve them via URL. S3 is designed for 99.999999999% (eleven nines) durability by replicating objects across multiple facilities. It is infinitely scalable, extremely cheap, and underpins much of AWS — static website hosting, data lakes, ML training data, application uploads, and backup storage.',
    example: 'For example, Netflix stores all its video content in S3. Airbnb stores property photos in S3. A static React app can be hosted directly in an S3 bucket for nearly zero cost.',
    tip: 'S3 buckets are private by default — never make them public unless absolutely necessary. Use pre-signed URLs to grant temporary, scoped access to specific objects for authenticated users.'
  },
  'lambda': {
    def: 'AWS Lambda is a serverless compute service that runs your code in response to events without managing any servers. You upload a function; AWS handles provisioning, scaling, patching, and availability. You pay only for actual execution time in milliseconds. Lambda scales from zero to thousands of concurrent executions automatically. Cold starts (first invocation after inactivity) add roughly 100-500ms latency.',
    example: 'For example, an S3-triggered Lambda function automatically resizes uploaded images and generates thumbnails — processing millions of uploads per day without any server management or pre-scaling.',
    tip: 'Keep Lambda packages small to reduce cold start times. Use provisioned concurrency to pre-warm critical functions. Avoid global state — Lambda instances can be reused or recycled at any time.'
  },
  'cloudformation': {
    def: 'AWS CloudFormation is Infrastructure as Code (IaC) — you define your entire AWS infrastructure in a YAML or JSON template, and CloudFormation creates and manages all the actual resources. This makes infrastructure reproducible, version-controlled in Git, and reviewable. Stacks can be created, updated with change sets (showing what will change before applying), and deleted as a unit. Changes to infrastructure become code reviews.',
    example: 'For example, a CloudFormation template can provision a VPC, subnets, EC2 auto-scaling group, RDS database, and load balancer with a single `aws cloudformation deploy` command, identical across environments.',
    tip: 'Use DeletionPolicy: Retain on critical resources (databases, S3 buckets) so they are not accidentally deleted when a CloudFormation stack is torn down.'
  },
  'dns': {
    def: 'DNS (Domain Name System) is the internet\'s phonebook — it translates human-readable domain names (google.com) into IP addresses (142.250.80.46) that computers use to route traffic. DNS is a hierarchical, distributed database. When you type a URL, your browser queries a local resolver which recursively queries root servers, TLD servers, and authoritative nameservers until it gets the IP.',
    example: 'For example, typing github.com triggers a DNS lookup returning an IP address. Your browser then opens a TCP connection to that IP on port 443 for HTTPS.',
    tip: 'DNS queries are unencrypted by default — use DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) to prevent ISPs and attackers from monitoring which domains you query.'
  },

  /* ── PYTHON DATA SCIENCE ──────────────────────────────────────────────── */
  'numpy': {
    def: 'NumPy (Numerical Python) is the foundational library for numerical computing in Python. Its core object is the ndarray — a fast, memory-efficient multi-dimensional array implemented in C. NumPy operations run as compiled C code rather than interpreted Python, making them 10-100x faster than equivalent Python loops. Broadcasting allows operations on arrays of different shapes without explicit loops. Virtually all data science libraries build on NumPy arrays.',
    example: 'For example, multiplying two 1-million-element arrays with a * b in NumPy takes about 1ms; the equivalent Python for-loop takes about 500ms — a 500x speed difference.',
    tip: 'Avoid Python loops over NumPy arrays — vectorise your operations using broadcasting and built-in NumPy functions to get C-level performance.'
  },
  'pandas': {
    def: 'Pandas is Python\'s primary library for tabular data manipulation, built on NumPy. Its two key structures are DataFrame (a 2D table with labelled rows and columns) and Series (a 1D labelled array). Pandas can load CSV, Excel, SQL, JSON, and Parquet files. It provides powerful tools for filtering, grouping, merging, pivoting, reshaping, and cleaning data — making it indispensable for data analysis and preprocessing.',
    example: 'For example, df.groupby("country")["revenue"].sum().sort_values(ascending=False) groups a sales DataFrame by country and computes total revenue per country in a single readable statement.',
    tip: 'Use vectorised Pandas operations instead of df.apply() with custom Python functions — apply() falls back to Python-level iteration and is slow. Prefer built-in Pandas and NumPy methods.'
  },
  'scikit-learn': {
    def: 'Scikit-learn is Python\'s main machine learning library, providing a consistent API across dozens of algorithms. Every estimator follows the same pattern: fit() trains the model, predict() generates predictions, transform() preprocesses features. Pipelines chain preprocessing and modelling steps, preventing data leakage from the test set into training. It covers classification, regression, clustering, dimensionality reduction, and model selection.',
    example: 'For example, Pipeline([(\"scaler\", StandardScaler()), (\"clf\", LogisticRegression())]).fit(X_train, y_train).score(X_test, y_test) preprocesses and trains in one pipeline with no risk of data leakage.',
    tip: 'Always put preprocessing steps inside a Pipeline and fit only on training data. Fitting a scaler on the full dataset before the train/test split leaks test statistics into training.'
  },
  'react router': {
    def: 'React Router is the standard library for client-side routing in React applications. It matches the current URL to a component tree and renders matching components without a full page reload. Version 6 introduced simplified APIs with Routes, Route, useParams, useNavigate, and useLocation hooks. Nested routes allow shared layouts. Link and NavLink handle navigation without triggering HTTP requests.',
    example: 'For example, a Route with path="/users/:id" renders the UserProfile component when the URL matches /users/42, and useParams() inside the component returns the id value "42".',
    tip: 'Use NavLink instead of Link for navigation menus — it automatically applies an active class to the currently matching link, making active state styling trivial.'
  },
  'context api': {
    def: 'React\'s Context API provides a way to pass data through the component tree without manually passing props at every level. You create a context with createContext(), wrap a subtree with its Provider, and any descendant can access the value with useContext(). Context is ideal for global data: authentication state, theme, language preferences, and feature flags that many components need.',
    example: 'For example, an AuthContext wraps the entire app with the current user object. Any component needing the user — a navbar, profile page, admin guard — reads it with useContext(AuthContext) without receiving it as a prop.',
    tip: 'Context re-renders ALL consumers when the context value changes. For frequently changing values, split contexts by concern or memoize the context value with useMemo to avoid expensive re-renders.'
  },
  'middleware': {
    def: 'In Express.js, middleware are functions that have access to the request object, response object, and the next middleware function in the stack. They execute in sequence, each performing a specific task (logging, parsing, authentication, error handling) and either sending a response or passing control to the next middleware with next(). The entire Express request pipeline is a chain of middleware functions.',
    example: 'For example, an authentication middleware checks for a valid JWT token on every request. If valid, it attaches the user to req.user and calls next(). If invalid, it sends a 401 response without calling next().',
    tip: 'Order matters in Express middleware — register error-handling middleware (4-argument functions) last, and always call next(err) to pass errors to it rather than handling them inline.'
  },
  'rest api': {
    def: 'A REST API (Representational State Transfer) is a web API that uses HTTP methods to perform operations on resources identified by URLs. The four main operations map to HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). REST APIs are stateless — each request contains all information needed to process it. Responses typically use JSON. Well-designed REST APIs are intuitive and self-documenting.',
    example: 'For example, GET /api/users returns all users, GET /api/users/42 returns user 42, POST /api/users creates a new user, PATCH /api/users/42 updates user 42, and DELETE /api/users/42 deletes them.',
    tip: 'Use correct HTTP status codes — 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error.'
  }
};
