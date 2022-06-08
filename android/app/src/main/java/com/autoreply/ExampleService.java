package com.autoreply;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
 
import androidx.core.app.NotificationCompat;
import android.app.NotificationManager;
import android.app.NotificationChannel;

import android.os.Build;
import com.facebook.react.HeadlessJsTaskService;

public class ExampleService extends Service {

   private static final int SERVICE_NOTIFICATION_ID = 100001;
   private static final String CHANNEL_ID = "EXAMPLE";

   private Handler handler = new Handler();
   private Runnable runnableCode = new Runnable() { 

      @Override
      public void run() {         
         Context context = getApplicationContext();
         Intent myIntent = new Intent(context, ExampleEventService.class); //call ExampleEventService
         context.startService(myIntent);
         HeadlessJsTaskService.acquireWakeLockNow(context);
         handler.postDelayed(this, 300); // 5 Min
      }

   };

   private void createNotificationChannel() {
      // Create the NotificationChannel, but only on API 26+ because
      // the NotificationChannel class is new and not in the support library
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
         int importance = NotificationManager.IMPORTANCE_DEFAULT;
         NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "HEARTBEAT", importance);
         channel.setDescription("CHANEL DESCRIPTION");
         NotificationManager notificationManager = getSystemService(NotificationManager.class);
         notificationManager.createNotificationChannel(channel);
      }
    }

   @Override
   public IBinder onBind(Intent intent) {
      return null;
   }

   @Override
   public void onCreate() {
      super.onCreate();
   }

   @Override
   public void onDestroy() {
      super.onDestroy();
      this.handler.removeCallbacks(this.runnableCode);
   }

   @Override
   public int onStartCommand(Intent intent, int flags, int startId) {
       this.handler.post(this.runnableCode);
      // The following code will turn it into a Foreground background process (Status bar notification)
      Intent notificationIntent = new Intent(this, MainActivity.class);
      PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
      Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
              .setContentTitle("Heartbeat service")
              .setContentText("Running...")
              .setSmallIcon(R.mipmap.ic_launcher)
              .setContentIntent(contentIntent)
              .setOngoing(true)
              .build();
      startForeground(SERVICE_NOTIFICATION_ID, notification);
      return START_STICKY_COMPATIBILITY;
   }
}