package zzvcom.util;

import java.io.IOException;
import java.util.Calendar;
import java.util.Random;

public class RCode {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		for(int i = 0; i < 100; i++)
		;
	}
	
    public static String getRCode() {
    	Calendar CD = Calendar.getInstance();
    	int YY = CD.get(Calendar.YEAR);
    	String time = String.valueOf(YY) ;
    	Random random = new Random();
    	int MM = CD.get(Calendar.MONTH) + 1;
    	if(MM < 10)
    		time = time + "0" + String.valueOf(MM);
    	else
    		time = time + String.valueOf(MM);
    	int DD = CD.get(Calendar.DATE);
    	
    	if(DD < 10)
    		time = time + "0" + String.valueOf(DD);
    	else
    		time = time +String.valueOf(DD);
    	int HH = CD.get(Calendar.HOUR_OF_DAY);
    	if(HH < 10)
    		time = time + "0" + String.valueOf(HH);
    	else
        	time = time +String.valueOf(HH);
    	
    	int NN = CD.get(Calendar.MINUTE);
    	if(NN < 10)
    		time = time + "0" + String.valueOf(NN);
        else
        	time = time +  String.valueOf(NN);
    	int SS = CD.get(Calendar.SECOND);
    	if(SS < 10)
    		time = time + "0" + String.valueOf(SS);
    	else
    		time = time + String.valueOf(SS);
    	int MIL = CD.get(Calendar.MILLISECOND);

    	String zero = "";
    	for( int i = 0; i < 3 - String.valueOf(MIL).length(); i++) {
    		zero = zero + "0";
    	}
    	int rand = random.nextInt(9999-1000) + 1000;
    	int rand1 = random.nextInt(9999-1000) + 1000;
    	int rand2 = random.nextInt(9999-1000) + 1000;
    	time = time + zero + String.valueOf(MIL)+String.valueOf(rand) + String.valueOf(rand1) + String.valueOf(rand2);
    	return time;
    }
    public static void setPathOrFilePopedom(String rsPath)
    {
    	if(System.getProperty("os.name").toUpperCase().indexOf("WINDOWS")!=-1)
    	{
    	     //is windows
    	}else 
    	{
    	     try
			{
    	    	 java.lang.Process process =Runtime.getRuntime().exec("chmod -R 777 " + rsPath);
    	    	 process.destroy();
                 process = null;
			} catch (IOException e)
			{
				e.printStackTrace();
			}
    	 }
    

    }
}
