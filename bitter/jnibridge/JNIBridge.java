package bitter.jnibridge;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JNIBridge
{
  static native void delete(long paramLong);

  static void disableInterfaceProxy(Object paramObject)
  {
    ((a)Proxy.getInvocationHandler(paramObject)).a();
  }

  static native Object invoke(long paramLong, Class paramClass, Method paramMethod, Object[] paramArrayOfObject);

  static Object newInterfaceProxy(long paramLong, Class[] paramArrayOfClass)
  {
    return Proxy.newProxyInstance(JNIBridge.class.getClassLoader(), paramArrayOfClass, new a(paramLong));
  }

  private static final class a
    implements InvocationHandler
  {
    private Object a = new Object[0];
    private long b;

    public a(long paramLong)
    {
      this.b = paramLong;
    }

    public final void a()
    {
      synchronized (this.a)
      {
        this.b = 0L;
        return;
      }
    }

    public final void finalize()
    {
      synchronized (this.a)
      {
        if (this.b == 0L)
          return;
        JNIBridge.delete(this.b);
        return;
      }
    }

    public final Object invoke(Object paramObject, Method paramMethod, Object[] paramArrayOfObject)
    {
      synchronized (this.a)
      {
        if (this.b == 0L)
          return null;
        Object localObject3 = JNIBridge.invoke(this.b, paramMethod.getDeclaringClass(), paramMethod, paramArrayOfObject);
        return localObject3;
      }
    }
  }
}

/* Location:           C:\apk\dex2jar-0.0.9.15\dex2jar-0.0.9.15\classes_dex2jarNor.jar
 * Qualified Name:     bitter.jnibridge.JNIBridge
 * JD-Core Version:    0.6.0
 */