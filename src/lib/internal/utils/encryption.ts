import crypto from 'crypto';

export function AEWDecryption(text: string, key: Buffer) {
	try {
        const data = Buffer.from(text, 'base64');
        const iv = data.slice(0, 16); // extract the IV
        const encryptedText = data.slice(16); // extract the ciphertext

        console.log('IV:', iv);
        console.log('Encrypted text:', encryptedText);

        const decipher = crypto.createDecipheriv('aes-256-cfb', key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
