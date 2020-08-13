package zzvcom.util.secret;

import java.security.Key;
import java.security.spec.AlgorithmParameterSpec;
import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import sun.misc.BASE64Decoder; 
import sun.misc.BASE64Encoder;

public class DESBase64 {
	private static final String key_ = "apabikey"; 
    private static final byte [] DESkey = key_.getBytes();//设置密钥，略�?
    private static final String DESIV_ = "ISO10126"; 
    private static final byte [] DESIV = DESIV_.getBytes();//设置密钥，略�?
    static AlgorithmParameterSpec iv = null;// 加密算法的参数接口，IvParameterSpec是它的一个实�?
	private static Key key = null;

	public DESBase64() throws Exception {
		DESKeySpec keySpec = new DESKeySpec(DESkey);// 设置密钥参数
		iv = new IvParameterSpec(DESIV);// 设置向量
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");// 获得密钥工厂
		key = keyFactory.generateSecret(keySpec);// 得到密钥对象
	}

	public String encode(String data) throws Exception {
		Cipher enCipher = Cipher.getInstance("DES/ECB/PKCS5Padding");// 得到加密对象Cipher
		enCipher.init(Cipher.ENCRYPT_MODE, key);// 设置工作模式为加密模式，给出密钥和向�?
		byte[] pasByte = enCipher.doFinal(data.getBytes("utf-8"));
		BASE64Encoder base64Encoder = new BASE64Encoder();
		return base64Encoder.encode(pasByte);
	}

	public static void main(String[] args) throws Exception {
		DESBase64 tools = new DESBase64();
		System.out.println("加密:" + tools.encode("testing1$apabi$2011041812:20"));
	}
}
