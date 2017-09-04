import base64
import rsa
import binascii

def get_encrypted_pw(password, nonce, servertime, pub_key):

    rsa_e = 65537

    pw_string = str(servertime) + '\t' + str(nonce) + '\n' + str(password)

    key = rsa.PublicKey(int(pub_key, 16), rsa_e)

    pw_encrypted = rsa.encrypt(pw_string, key)

    passwd = binascii.b2a_hex(pw_encrypted)

    return passwd


