import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;


// import com.alibaba.fastjson.JSON;

public class Sound {
  public static void main(String[] args) {
    try{
      String appsecert = "54A3A434C941F299C5D6E43D6E07B685CDBCC31B";          							//应用appsecret
      Map<String,Object> data = new HashMap<String,Object>();					//待签名数据，请参照签名生成流程生成
      data.put("appkey", "B8B99EFB6A2C3EAEAA0E");
      data.put("method", "push");
      data.put("devicesn", "1086019600001");
      data.put("message", "1000");
      data.put("push_template", "2");
      data.put("timestamp", "20200915130000");
      data.put("nonce", "thisisatest");

      String sign = generateSignature(data, appsecert, "HMAC-SHA256");        //生成数据签名
      System.out.println("sign = " + sign);
    }catch(Exception e){
      e.printStackTrace();
    }
  }


  public static String generateSignature(final Map<String,Object> data, String appsecret, String signType) // 签名生成方法
    throws Exception {
    Set keySet = data.keySet();
    String[] keyArray = (String[]) keySet.toArray(new String[keySet.size()]);
    Arrays.sort(keyArray);

    StringBuilder sb = new StringBuilder();
    for (String k : keyArray) {
      if (k.equals("sign")) {
        continue;
      }

      if (data.get(k) == null || "null".equals(data.get(k))) { 				// 参数值为空，则不参与签名
        data.remove(k);
        continue;
      }

      Object value = data.get(k);
      if (value instanceof Integer) {
        value = sb.append(k).append("=").append(value).append("&");
      } else {
        if (String.valueOf(value).trim().length() > 0) {
          sb.append(k).append("=").append(String.valueOf(value).trim()).append("&");
        }
      }
    }

    String sbr = sb.substring(0, sb.length() - 1);
    if ("MD5".equals(signType)) {
      java.security.MessageDigest md = MessageDigest.getInstance("MD5");
      byte[] array = md.digest(sbr.getBytes("UTF-8"));
      return Base64.getUrlEncoder().encodeToString(array);					// 16进制base64形式
    } else if ("HMAC-SHA256".equals(signType)) {
      Mac sha256_HMAC = Mac.getInstance("HmacSHA256");

      SecretKeySpec secret_key = new SecretKeySpec(appsecret.getBytes("UTF-8"), "HmacSHA256");
      sha256_HMAC.init(secret_key);

      byte[] array = sha256_HMAC.doFinal(sbr.getBytes());
      return Base64.getUrlEncoder().encodeToString(array); 					// 16进制base64形式
    }
    return null;
  }
}
