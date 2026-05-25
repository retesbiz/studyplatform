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
