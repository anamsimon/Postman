package com.plugin.GCM;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.CallbackContext;
import com.google.android.gcm.*;


/**
 * @author awysocki
 *
 */

public class PushPlugin extends CordovaPlugin {

  public static final String ME="PushPlugin";

  public static final String REGISTER="register";
  public static final String UNREGISTER="unregister";
  public static final String EXIT="exit";

  public static CordovaWebView gwebView;
  private static String gECB;
  private static String gSenderID;

  @Override
  public boolean execute(String action, JSONArray data, CallbackContext callbackContext)
  {

    boolean result = false;

    Log.v(ME + ":execute", "action=" + action);

    if (REGISTER.equals(action)) {

      Log.v(ME + ":execute", "data=" + data.toString());


      try {

        JSONObject jo= new JSONObject(data.toString().substring(1, data.toString().length()-1));

        gwebView = this.webView;

        Log.v(ME + ":execute", "jo=" + jo.toString());

        gECB = (String)jo.get("ecb");
        gSenderID = (String)jo.get("senderID");

        Log.v(ME + ":execute", "ECB="+gECB+" senderID="+gSenderID );

        GCMRegistrar.register(this.cordova.getActivity(), gSenderID);


        Log.v(ME + ":execute", "GCMRegistrar.register called ");

        result = true;
      }
      catch (JSONException e) {
		Log.e(ME, "Got JSON Exception " + e.getMessage());
        result = false;
      }
      
      // if a notification was touched while we were completely exited, process it now
      try
      {
    	  BufferedReader inputReader = new BufferedReader(new InputStreamReader(this.cordova.getActivity().getApplicationContext().openFileInput("cached_payload")));
    	  String inputString;
    	  StringBuffer stringBuffer = new StringBuffer();                
    	  while ((inputString = inputReader.readLine()) != null)
    	  {
    		  stringBuffer.append(inputString);
    	  }

    	  // surface the cached payload
    	  JSONObject jsonObj = new JSONObject(stringBuffer.toString());
    	  sendJavascript(jsonObj);
    	  this.cordova.getActivity().getApplicationContext().getFileStreamPath("cached_payload").delete();
      }
      catch (FileNotFoundException fnf)
      {
    	  Log.e("REGISTER", fnf.getMessage());
      }
      catch (IOException io)
      {
    	  io.printStackTrace();
      }
      catch (JSONException j)
      {
    	  j.printStackTrace();
      }      
      
      PushHandlerActivity.EXITED = false;
    }
    else if (UNREGISTER.equals(action)) {

      GCMRegistrar.unregister(this.cordova.getActivity());
      
      Log.v(ME + ":" + UNREGISTER, "GCMRegistrar.unregister called ");
      result = true;
    }
    else
    {
      result = false;
      Log.e(ME, "Invalid action : "+action);
    }

    return result;
  }


  public static void sendJavascript( JSONObject _json )
  {
	String _d =  "javascript:"+gECB+"(" + _json.toString() + ")";
	Log.v(ME + ":sendJavascript", _d);

	if (gECB != null ) {
		gwebView.sendJavascript( _d );
	}
  }


	public void onDestroy()
	{
		super.onDestroy();

    	// let the service know we are exiting so it can cache the next notification payload.
		PushHandlerActivity.EXITED = true;
        GCMRegistrar.onDestroy(cordova.getActivity());
	}
}
